import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Bookmark, BookmarkCheck, Check, Copy,
  Plus, Minus, ChevronUp, X, Loader2, Volume2, Pause,
  Moon, Share2, BookOpen
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import TafsirModal from "@/components/TafsirModal";
import VerseCard from "@/components/VerseCard";

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

const TOTAL_AYAHS = 6236;
const BASMALA = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";
const AYAH_END_SYMBOL = "\u06DD";

const RECITERS = [
  { id: "ar.alafasy", name: "مشاري العفاسي" },
  { id: "ar.abdulbasitmurattal", name: "عبد الباسط عبد الصمد" },
];

const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const formatAyahNumber = (n: number) =>
  String(n).split("").map(d => arabicDigits[+d]).join("");

const stripBasmala = (text: string, surahNum: number, ayahInSurah: number): string => {
  if (ayahInSurah !== 1 || surahNum === 1 || surahNum === 9) return text;
  return text.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ\s*/, "") || text;
};

const cleanAyahText = (text: string): string => {
  let cleaned = text.replace(/[\u06DD][\u0660-\u0669]*/g, "");
  cleaned = cleaned.replace(/[\u06E9]/g, "۩");
  return cleaned.trim();
};

function highlightInline(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'g'));
  return parts.map((part, i) =>
    part === query
      ? <mark key={i} className="bg-primary/30 text-foreground rounded px-0.5">{part}</mark>
      : part
  );
}

let globalAudio: HTMLAudioElement | null = null;

// Ayah with popover
const AyahSpan = ({
  ayah, surahNumber, fontSize, bookmarks, searchQuery,
  onCopy, onToggleBookmark, ayahRefs, playingAyah, onPlayAyah,
  onTafsir, onShare, onRead,
}: {
  ayah: Ayah; surahNumber: number; fontSize: number; bookmarks: number[];
  searchQuery: string; onCopy: (text: string, num: number) => void;
  onToggleBookmark: (num: number) => void;
  ayahRefs: React.MutableRefObject<Map<number, HTMLSpanElement>>;
  playingAyah: number | null; onPlayAyah: (ayah: Ayah) => void;
  onTafsir: (ayah: Ayah) => void; onShare: (ayah: Ayah) => void;
  onRead: (ayahNum: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const isBookmarked = bookmarks.includes(ayah.number);
  const isPlaying = playingAyah === ayah.number;
  const rawText = stripBasmala(ayah.text, surahNumber, ayah.numberInSurah);
  const cleaned = cleanAyahText(rawText);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          ref={el => { if (el) ayahRefs.current.set(ayah.number, el); }}
          className={`ayah-span inline cursor-pointer transition-all duration-200 rounded-sm ${
            isPlaying ? "playing-ayah" : "hover:text-primary/90"
          }`}
          onClick={() => onRead(ayah.number)}
        >
          <span>{searchQuery ? highlightInline(cleaned, searchQuery) : cleaned}</span>
          <span
            className="inline text-primary/70 select-none"
            style={{ fontSize: fontSize * 0.6 }}
          >{AYAH_END_SYMBOL}{formatAyahNumber(ayah.numberInSurah)}</span>
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-2 bg-card/95 backdrop-blur-md border-primary/30 shadow-[0_0_20px_hsl(45_80%_55%/0.15)]"
        side="top" sideOffset={8}
      >
        <div className="flex items-center gap-1.5 flex-wrap" dir="rtl">
          <button onClick={(e) => { e.stopPropagation(); onPlayAyah(ayah); setOpen(false); }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-arabic bg-secondary/60 hover:bg-primary/20 text-foreground/90 hover:text-primary transition-colors">
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            {isPlaying ? "إيقاف" : "استماع"}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onCopy(ayah.text, ayah.number); setOpen(false); }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-arabic bg-secondary/60 hover:bg-primary/20 text-foreground/90 hover:text-primary transition-colors">
            <Copy className="w-3.5 h-3.5" /> نسخ
          </button>
          <button onClick={(e) => { e.stopPropagation(); onToggleBookmark(ayah.number); setOpen(false); }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-arabic transition-colors ${
              isBookmarked ? "bg-primary/20 text-primary" : "bg-secondary/60 hover:bg-primary/20 text-foreground/90 hover:text-primary"
            }`}>
            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            {isBookmarked ? "إزالة" : "حفظ"}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onTafsir(ayah); setOpen(false); }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-arabic bg-secondary/60 hover:bg-primary/20 text-foreground/90 hover:text-primary transition-colors">
            <BookOpen className="w-3.5 h-3.5" /> تفسير
          </button>
          <button onClick={(e) => { e.stopPropagation(); onShare(ayah); setOpen(false); }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-arabic bg-secondary/60 hover:bg-primary/20 text-foreground/90 hover:text-primary transition-colors">
            <Share2 className="w-3.5 h-3.5" /> مشاركة
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Lazy Surah
const LazySurah = ({
  surah, fontSize, bookmarks, searchQuery, onCopy, onToggleBookmark,
  surahRef, ayahRefs, playingAyah, onPlayAyah, onTafsir, onShare, onRead,
}: {
  surah: Surah; fontSize: number; bookmarks: number[]; searchQuery: string;
  onCopy: (text: string, num: number) => void; onToggleBookmark: (num: number) => void;
  surahRef: (el: HTMLDivElement | null) => void;
  ayahRefs: React.MutableRefObject<Map<number, HTMLSpanElement>>;
  playingAyah: number | null; onPlayAyah: (ayah: Ayah) => void;
  onTafsir: (ayah: Ayah) => void; onShare: (ayah: Ayah) => void;
  onRead: (ayahNum: number) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin: "600px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showBasmala = surah.number !== 1 && surah.number !== 9;

  return (
    <div
      ref={el => { surahRef(el); sentinelRef.current = el as any; }}
      id={`surah-${surah.number}`}
      className="mb-10"
      style={{ contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}
    >
      <div className="text-center my-6 sm:my-8">
        <div className="inline-block gold-border rounded-2xl px-8 sm:px-12 py-5 sm:py-6 bg-secondary/40 gold-glow">
          <h2 className="text-2xl sm:text-3xl font-display gold-text" style={{ lineHeight: 1.8 }}>
            {surah.name}
          </h2>
          <p className="text-xs text-muted-foreground mt-1.5 font-arabic">{surah.numberOfAyahs} آيات</p>
        </div>
        {showBasmala && (
          <p className="mt-5 text-foreground/90 font-uthmanic" style={{ fontSize: fontSize * 0.9, lineHeight: 2.2 }}>
            {BASMALA}
          </p>
        )}
      </div>

      {isVisible ? (
        <p className="quran-text text-foreground/95 text-justify px-3 sm:px-5 font-uthmanic" dir="rtl"
          style={{ fontSize, lineHeight: 2.6 }}>
          {surah.ayahs.map(ayah => (
            <AyahSpan key={ayah.number} ayah={ayah} surahNumber={surah.number}
              fontSize={fontSize} bookmarks={bookmarks} searchQuery={searchQuery}
              onCopy={onCopy} onToggleBookmark={onToggleBookmark} ayahRefs={ayahRefs}
              playingAyah={playingAyah} onPlayAyah={onPlayAyah}
              onTafsir={onTafsir} onShare={onShare} onRead={onRead} />
          ))}
        </p>
      ) : (
        <div style={{ minHeight: 400 }} />
      )}
    </div>
  );
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
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [reciter, setReciter] = useState(() => localStorage.getItem("quran-reciter") || "ar.alafasy");
  const [zenMode, setZenMode] = useState(false);
  const [tafsirAyah, setTafsirAyah] = useState<Ayah | null>(null);
  const [shareAyah, setShareAyah] = useState<Ayah | null>(null);
  const [readAyahs, setReadAyahs] = useState<Set<number>>(() => {
    const saved = localStorage.getItem("quran-read-ayahs");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

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

  useEffect(() => { localStorage.setItem("quran-bookmarks", JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem("quran-font-size", String(fontSize)); }, [fontSize]);
  useEffect(() => { localStorage.setItem("quran-reciter", reciter); }, [reciter]);
  useEffect(() => { localStorage.setItem("quran-read-ayahs", JSON.stringify([...readAyahs])); }, [readAyahs]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Search
  useEffect(() => {
    if (!searchQuery.trim() || surahs.length === 0) {
      setSearchResults([]); setIsSearching(false); return;
    }
    setIsSearching(true);
    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      const q = searchQuery.trim();
      const results: Ayah[] = [];
      for (const s of surahs) {
        for (const a of s.ayahs) {
          if (a.text.includes(q)) { results.push(a); if (results.length >= 50) break; }
        }
        if (results.length >= 50) break;
      }
      setSearchResults(results); setIsSearching(false);
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
    setBookmarks(prev => prev.includes(ayahNum) ? prev.filter(n => n !== ayahNum) : [...prev, ayahNum]);
  }, []);

  const copyAyah = useCallback(async (text: string, num: number) => {
    try { await navigator.clipboard.writeText(text); } catch {
      const ta = document.createElement("textarea"); ta.value = text;
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopiedAyah(num);
    setTimeout(() => setCopiedAyah(null), 2000);
  }, []);

  const markRead = useCallback((ayahNum: number) => {
    setReadAyahs(prev => {
      const next = new Set(prev);
      next.add(ayahNum);
      return next;
    });
  }, []);

  // Audio playback
  const playAyah = useCallback((ayah: Ayah) => {
    if (playingAyah === ayah.number) {
      globalAudio?.pause(); globalAudio = null; setPlayingAyah(null); return;
    }
    if (globalAudio) { globalAudio.pause(); globalAudio = null; }

    const audioUrl = `https://cdn.islamic.network/quran/audio/128/${reciter}/${ayah.number}.mp3`;
    const audio = new Audio(audioUrl);
    globalAudio = audio;
    setPlayingAyah(ayah.number);
    markRead(ayah.number);

    const el = ayahRefs.current.get(ayah.number);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });

    audio.play().catch(() => { setPlayingAyah(null); globalAudio = null; });

    audio.onended = () => {
      const nextNum = ayah.number + 1;
      let nextAyah: Ayah | null = null;
      for (const s of surahs) {
        for (const a of s.ayahs) {
          if (a.number === nextNum) { nextAyah = a; break; }
        }
        if (nextAyah) break;
      }
      if (nextAyah) { playAyah(nextAyah); } else { setPlayingAyah(null); globalAudio = null; }
    };
    audio.onerror = () => { setPlayingAyah(null); globalAudio = null; };
  }, [playingAyah, surahs, reciter, markRead]);

  useEffect(() => {
    return () => { if (globalAudio) { globalAudio.pause(); globalAudio = null; } };
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

  const khatmaProgress = useMemo(() => (readAyahs.size / TOTAL_AYAHS) * 100, [readAyahs]);
  const points = useMemo(() => readAyahs.size * 10, [readAyahs]);

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

  // Zen Mode
  if (zenMode) {
    return (
      <div className="fixed inset-0 z-[200] bg-black flex flex-col">
        <button onClick={() => setZenMode(false)}
          className="absolute top-4 left-4 z-50 p-2 rounded-full bg-white/10 text-white/70 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-16">
          {surahs.map(surah => (
            <div key={surah.number} className="mb-16">
              <h2 className="text-center text-2xl sm:text-3xl font-display text-primary/80 mb-6" style={{ lineHeight: 1.8 }}>
                {surah.name}
              </h2>
              {surah.number !== 1 && surah.number !== 9 && (
                <p className="text-center text-white/70 font-uthmanic mb-4" style={{ fontSize: fontSize * 0.85, lineHeight: 2.2 }}>
                  {BASMALA}
                </p>
              )}
              <p className="quran-text text-white/90 text-center font-uthmanic" dir="rtl"
                style={{ fontSize: fontSize + 4, lineHeight: 2.8 }}>
                {surah.ayahs.map(a => {
                  const cleaned = cleanAyahText(stripBasmala(a.text, surah.number, a.numberInSurah));
                  return (
                    <span key={a.number} className="inline">
                      {cleaned}
                      <span className="text-primary/60" style={{ fontSize: (fontSize + 4) * 0.55 }}>
                        {AYAH_END_SYMBOL}{formatAyahNumber(a.numberInSurah)}
                      </span>
                    </span>
                  );
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Khatma progress */}
      <div className="px-3 sm:px-4 pt-3 pb-1">
        <div className="flex items-center justify-between text-xs font-arabic text-muted-foreground mb-1.5">
          <span>الختمة: {readAyahs.size} / {TOTAL_AYAHS} آية</span>
          <span className="gold-text font-bold">{khatmaProgress.toFixed(1)}%</span>
        </div>
        <Progress value={khatmaProgress} className="h-2 bg-secondary/60" />
        <p className="text-xs text-primary/70 font-arabic mt-1 text-left">{points} نقطة</p>
      </div>

      {/* Sticky toolbar */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border px-2 sm:px-3 py-2.5 space-y-2">
        {/* Row 1: Surah select + controls */}
        <div className="flex items-center gap-2 h-9">
          <select onChange={e => scrollToSurah(+e.target.value)} defaultValue=""
            className="flex-1 min-w-0 bg-secondary/60 border border-border rounded-lg px-2.5 h-9 text-sm font-arabic text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="" disabled>انتقل إلى سورة...</option>
            {surahs.map(s => <option key={s.number} value={s.number}>{s.name}</option>)}
          </select>

          {/* Reciter selector */}
          <select value={reciter} onChange={e => setReciter(e.target.value)}
            className="bg-secondary/60 border border-border rounded-lg px-2 h-9 text-xs font-arabic text-foreground focus:outline-none focus:ring-1 focus:ring-primary max-w-[120px]">
            {RECITERS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>

          <div className="flex items-center gap-1 gold-border rounded-lg px-2 h-9 bg-secondary/40 shrink-0">
            <button onClick={() => setFontSize(f => Math.max(18, f - 2))} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-muted-foreground min-w-[1.5rem] text-center select-none">{fontSize}</span>
            <button onClick={() => setFontSize(f => Math.min(48, f + 2))} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button onClick={() => setShowBookmarks(!showBookmarks)}
            className={`h-9 w-9 flex items-center justify-center rounded-lg transition-colors shrink-0 ${
              showBookmarks ? 'bg-primary/20 text-primary' : 'bg-secondary/40 text-muted-foreground hover:text-foreground border border-border'
            }`}>
            <Bookmark className="w-4 h-4" />
          </button>

          <button onClick={() => setZenMode(true)}
            className="h-9 w-9 flex items-center justify-center rounded-lg bg-secondary/40 text-muted-foreground hover:text-foreground border border-border shrink-0 transition-colors">
            <Moon className="w-4 h-4" />
          </button>

          {playingAyah !== null && (
            <button onClick={() => { globalAudio?.pause(); globalAudio = null; setPlayingAyah(null); }}
              className="h-9 w-9 flex items-center justify-center rounded-lg bg-primary/20 text-primary shrink-0 animate-pulse">
              <Pause className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Row 2: Search */}
        <div className="relative h-9">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="ابحث في القرآن الكريم..." dir="rtl"
            className="w-full h-9 bg-secondary/60 border border-border rounded-lg pr-9 pl-8 text-sm font-arabic text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute left-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
            </button>
          )}
        </div>

        {/* Search results */}
        <AnimatePresence>
          {searchQuery.trim() && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="max-h-60 overflow-y-auto bg-card border border-border rounded-lg">
              {isSearching ? (
                <div className="p-4 text-center text-muted-foreground text-sm font-arabic">جاري البحث...</div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm font-arabic">لا توجد نتائج</div>
              ) : (
                searchResults.map(a => (
                  <button key={a.number} onClick={() => scrollToAyah(a.number)}
                    className="w-full text-right px-3 py-2 hover:bg-secondary/60 transition-colors border-b border-border/50 last:border-0">
                    <span className="text-xs text-primary font-arabic">{a.surah.name} - آية {formatAyahNumber(a.numberInSurah)}</span>
                    <p className="text-sm font-uthmanic text-foreground/80 line-clamp-1 mt-0.5">
                      {highlightInline(a.text, searchQuery.trim())}
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
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="max-h-60 overflow-y-auto bg-card border border-border rounded-lg">
              {bookmarkedAyahs.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground text-sm font-arabic">لا توجد محفوظات</div>
              ) : (
                bookmarkedAyahs.map(a => (
                  <button key={a.number} onClick={() => { scrollToAyah(a.number); setShowBookmarks(false); }}
                    className="w-full text-right px-3 py-2 hover:bg-secondary/60 transition-colors border-b border-border/50 last:border-0">
                    <span className="text-xs text-primary font-arabic">{a.surah.name} - آية {formatAyahNumber(a.numberInSurah)}</span>
                    <p className="text-sm font-uthmanic text-foreground/80 line-clamp-1 mt-0.5">{cleanAyahText(a.text).slice(0, 80)}...</p>
                  </button>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quran content */}
      <div className="px-2 sm:px-4 pt-4 pb-20">
        {surahs.map(surah => (
          <LazySurah key={surah.number} surah={surah} fontSize={fontSize}
            bookmarks={bookmarks} searchQuery={searchQuery} onCopy={copyAyah}
            onToggleBookmark={toggleBookmark}
            surahRef={el => { if (el) surahRefs.current.set(surah.number, el); }}
            ayahRefs={ayahRefs} playingAyah={playingAyah} onPlayAyah={playAyah}
            onTafsir={setTafsirAyah} onShare={setShareAyah} onRead={markRead} />
        ))}
      </div>

      {/* Copied toast */}
      <AnimatePresence>
        {copiedAyah !== null && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-card border border-primary/30 rounded-xl px-4 py-2 text-sm text-primary flex items-center gap-2 shadow-[0_0_20px_hsl(45_80%_55%/0.2)] font-arabic">
            <Check className="w-4 h-4" /> تم نسخ الآية
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-4 z-40 p-3 rounded-full gold-border bg-secondary/80 backdrop-blur-sm text-primary shadow-lg">
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tafsir Modal */}
      <TafsirModal ayah={tafsirAyah} onClose={() => setTafsirAyah(null)} />

      {/* Verse Card Modal */}
      <VerseCard ayah={shareAyah} onClose={() => setShareAyah(null)} />
    </div>
  );
};

export default QuranTab;
