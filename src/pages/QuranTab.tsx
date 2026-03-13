import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Search, Bookmark, BookmarkCheck, Copy, Check,
  Plus, Minus, ChevronUp, X, Loader2
} from "lucide-react";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  surah: { number: number; name: string; englishName: string; numberOfAyahs: number };
}

interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

const AYAH_END_SYMBOL = "\u06DD";

const formatAyahNumber = (n: number) => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(n).split("").map(d => arabicDigits[+d]).join("");
};

const QuranTab = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem("quran-font-size");
    return saved ? parseInt(saved) : 28;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Ayah[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    const saved = localStorage.getItem("quran-bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const surahRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const ayahRefs = useRef<Map<number, HTMLSpanElement>>(new Map());
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Fetch Quran data
  useEffect(() => {
    const fetchQuran = async () => {
      try {
        const cached = sessionStorage.getItem("quran-data");
        if (cached) {
          setSurahs(JSON.parse(cached));
          setLoading(false);
          return;
        }
        const res = await fetch("https://api.alquran.cloud/v1/quran/quran-uthmani");
        if (!res.ok) throw new Error("فشل في تحميل البيانات");
        const json = await res.json();
        const data = json.data.surahs as Surah[];
        setSurahs(data);
        sessionStorage.setItem("quran-data", JSON.stringify(data));
      } catch (e: any) {
        setError(e.message || "حدث خطأ");
      } finally {
        setLoading(false);
      }
    };
    fetchQuran();
  }, []);

  // Save bookmarks
  useEffect(() => {
    localStorage.setItem("quran-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Save font size
  useEffect(() => {
    localStorage.setItem("quran-font-size", String(fontSize));
  }, [fontSize]);

  // Scroll to top button
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => setShowScrollTop(el.scrollTop > 600);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [loading]);

  // Search
  useEffect(() => {
    if (!searchQuery.trim() || surahs.length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      const q = searchQuery.trim();
      const results: Ayah[] = [];
      for (const s of surahs) {
        for (const a of s.ayahs) {
          if (a.text.includes(q)) {
            results.push(a);
            if (results.length >= 50) break;
          }
        }
        if (results.length >= 50) break;
      }
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery, surahs]);

  const scrollToSurah = useCallback((num: number) => {
    const el = surahRefs.current.get(num);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSearchQuery("");
  }, []);

  const scrollToAyah = useCallback((globalNum: number) => {
    const el = ayahRefs.current.get(globalNum);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("highlight-ayah");
      setTimeout(() => el.classList.remove("highlight-ayah"), 3000);
    }
    setSearchQuery("");
  }, []);

  const toggleBookmark = useCallback((ayahNum: number) => {
    setBookmarks(prev =>
      prev.includes(ayahNum) ? prev.filter(n => n !== ayahNum) : [...prev, ayahNum]
    );
  }, []);

  const copyAyah = useCallback(async (text: string, num: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAyah(num);
      setTimeout(() => setCopiedAyah(null), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedAyah(num);
      setTimeout(() => setCopiedAyah(null), 2000);
    }
  }, []);

  const bookmarkedAyahs = useMemo(() => {
    if (!showBookmarks || surahs.length === 0) return [];
    const all: Ayah[] = [];
    for (const s of surahs) {
      for (const a of s.ayahs) {
        if (bookmarks.includes(a.number)) all.push(a);
      }
    }
    return all;
  }, [showBookmarks, bookmarks, surahs]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g'));
    return parts.map((part, i) =>
      part === query
        ? <mark key={i} className="bg-primary/30 text-foreground rounded px-0.5">{part}</mark>
        : part
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground font-arabic">جاري تحميل القرآن الكريم...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-destructive font-arabic">{error}</p>
        <button onClick={() => window.location.reload()} className="gold-border rounded-lg px-4 py-2 bg-secondary/40 text-sm font-arabic text-foreground/80">
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] sm:h-[calc(100vh-220px)]">
      {/* Sticky toolbar */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border pb-2 space-y-2 px-1">
        {/* Row 1: Surah dropdown + font controls + bookmarks */}
        <div className="flex items-center gap-2">
          <select
            onChange={e => scrollToSurah(+e.target.value)}
            defaultValue=""
            className="flex-1 bg-secondary/60 border border-border rounded-lg px-2 py-1.5 text-sm font-arabic text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="" disabled>السورة</option>
            {surahs.map(s => (
              <option key={s.number} value={s.number}>{s.name}</option>
            ))}
          </select>

          {/* Font size */}
          <div className="flex items-center gap-1 gold-border rounded-lg px-1.5 py-1 bg-secondary/40">
            <button
              onClick={() => setFontSize(f => Math.max(18, f - 2))}
              className="p-0.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="تصغير الخط"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-muted-foreground min-w-[1.5rem] text-center">{fontSize}</span>
            <button
              onClick={() => setFontSize(f => Math.min(48, f + 2))}
              className="p-0.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="تكبير الخط"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bookmarks toggle */}
          <button
            onClick={() => setShowBookmarks(!showBookmarks)}
            className={`p-2 rounded-lg transition-colors ${showBookmarks ? 'bg-primary/20 text-primary' : 'bg-secondary/40 text-muted-foreground hover:text-foreground'}`}
            aria-label="المحفوظات"
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Row 2: Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="ابحث في القرآن الكريم..."
            className="w-full bg-secondary/60 border border-border rounded-lg pr-9 pl-3 py-2 text-sm font-arabic text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            dir="rtl"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute left-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Search results dropdown */}
        <AnimatePresence>
          {searchQuery.trim() && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-h-60 overflow-y-auto bg-card border border-border rounded-lg"
            >
              {isSearching ? (
                <div className="p-4 text-center text-muted-foreground text-sm font-arabic">جاري البحث...</div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm font-arabic">لا توجد نتائج</div>
              ) : (
                searchResults.map(a => (
                  <button
                    key={a.number}
                    onClick={() => scrollToAyah(a.number)}
                    className="w-full text-right px-3 py-2 hover:bg-secondary/60 transition-colors border-b border-border/50 last:border-0"
                  >
                    <span className="text-xs text-primary font-arabic">{a.surah.name} - آية {formatAyahNumber(a.numberInSurah)}</span>
                    <p className="text-sm font-arabic text-foreground/80 line-clamp-1 mt-0.5" style={{ fontFamily: "'Uthmanic', 'Amiri', serif" }}>
                      {highlightText(a.text, searchQuery.trim())}
                    </p>
                  </button>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bookmarks panel */}
        <AnimatePresence>
          {showBookmarks && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-h-60 overflow-y-auto bg-card border border-border rounded-lg"
            >
              {bookmarkedAyahs.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm font-arabic">لا توجد محفوظات</div>
              ) : (
                bookmarkedAyahs.map(a => (
                  <button
                    key={a.number}
                    onClick={() => { scrollToAyah(a.number); setShowBookmarks(false); }}
                    className="w-full text-right px-3 py-2 hover:bg-secondary/60 transition-colors border-b border-border/50 last:border-0"
                  >
                    <span className="text-xs text-primary font-arabic">{a.surah.name} - آية {formatAyahNumber(a.numberInSurah)}</span>
                    <p className="text-sm font-arabic text-foreground/80 line-clamp-1 mt-0.5" style={{ fontFamily: "'Uthmanic', 'Amiri', serif" }}>
                      {a.text.slice(0, 80)}...
                    </p>
                  </button>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quran content - continuous scroll */}
      <div ref={containerRef} className="flex-1 overflow-y-auto scroll-smooth px-2 sm:px-4 pt-4 pb-20">
        {surahs.map(surah => (
          <div
            key={surah.number}
            ref={el => { if (el) surahRefs.current.set(surah.number, el); }}
            className="mb-10"
            style={{ contentVisibility: "auto", containIntrinsicSize: "auto 500px" }}
          >
            {/* Surah header */}
            <div className="text-center my-6 sm:my-8">
              <div className="inline-block gold-border rounded-2xl px-6 sm:px-10 py-3 sm:py-4 bg-secondary/40 gold-glow">
                <h2 className="text-xl sm:text-2xl font-display gold-text">{surah.name}</h2>
                <p className="text-xs text-muted-foreground mt-1 font-arabic">{surah.numberOfAyahs} آيات</p>
              </div>
              {/* Bismillah - except Al-Fatiha and At-Tawbah */}
              {surah.number !== 1 && surah.number !== 9 && (
                <p
                  className="mt-4 text-foreground/90"
                  style={{ fontFamily: "'Uthmanic', 'Amiri', serif", fontSize: fontSize * 0.9 }}
                >
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                </p>
              )}
            </div>

            {/* Ayahs - inline flow */}
            <div
              className="leading-[2.2] sm:leading-[2.4] text-foreground/95 text-justify px-1 sm:px-2"
              dir="rtl"
              style={{ fontFamily: "'Uthmanic', 'Amiri', serif", fontSize }}
            >
              {surah.ayahs.map(ayah => (
                <span
                  key={ayah.number}
                  ref={el => { if (el) ayahRefs.current.set(ayah.number, el); }}
                  className="ayah-span relative inline group"
                >
                  {/* Ayah text */}
                  <span
                    className="cursor-pointer hover:text-primary/90 transition-colors"
                    onClick={() => copyAyah(ayah.text, ayah.number)}
                  >
                    {ayah.text}
                  </span>

                  {/* Ayah number ornament */}
                  <span className="inline-flex items-center justify-center mx-1 text-primary/80 select-none" style={{ fontSize: fontSize * 0.7 }}>
                    {AYAH_END_SYMBOL}{formatAyahNumber(ayah.numberInSurah)}
                  </span>

                  {/* Bookmark icon - appears on hover */}
                  <span
                    className="inline-block align-middle cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity mx-0.5"
                    onClick={e => { e.stopPropagation(); toggleBookmark(ayah.number); }}
                  >
                    {bookmarks.includes(ayah.number) ? (
                      <BookmarkCheck className="w-4 h-4 text-primary inline" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-muted-foreground hover:text-primary inline" />
                    )}
                  </span>

                  {/* Copy confirmation */}
                  <AnimatePresence>
                    {copiedAyah === ayah.number && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-8 right-1/2 translate-x-1/2 bg-card border border-primary/30 rounded-lg px-2 py-1 text-xs text-primary flex items-center gap-1 whitespace-nowrap z-20 shadow-lg"
                      >
                        <Check className="w-3 h-3" /> تم النسخ
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Separator */}
                  {"  "}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-4 z-40 p-3 rounded-full gold-border bg-secondary/80 backdrop-blur-sm text-primary shadow-lg"
            aria-label="العودة للأعلى"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuranTab;
