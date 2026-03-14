import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

interface TadabburData {
  ayahText: string;
  surahName: string;
  ayahNumber: number;
  tafsir: string;
}

const TadabburModal = () => {
  const [data, setData] = useState<TadabburData | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("tadabbur-shown");
    if (shown) return;

    const fetchTadabbur = async () => {
      try {
        // Random ayah (1-6236)
        const randomNum = Math.floor(Math.random() * 6236) + 1;
        const [ayahRes, tafsirRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/ayah/${randomNum}/quran-uthmani`),
          fetch(`https://api.alquran.cloud/v1/ayah/${randomNum}/ar.muyassar`),
        ]);
        
        if (!ayahRes.ok || !tafsirRes.ok) return;
        
        const ayahJson = await ayahRes.json();
        const tafsirJson = await tafsirRes.json();
        
        setData({
          ayahText: ayahJson.data.text,
          surahName: ayahJson.data.surah.name,
          ayahNumber: ayahJson.data.numberInSurah,
          tafsir: tafsirJson.data.text,
        });
        setOpen(true);
        sessionStorage.setItem("tadabbur-shown", "1");
      } catch {
        // Silently fail
      }
    };

    // Delay to not block initial render
    const timer = setTimeout(fetchTadabbur, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!data) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          
          {/* Modal */}
          <motion.div
            className="relative max-w-lg w-full bg-card border border-border rounded-2xl p-6 sm:p-8 gold-glow overflow-y-auto max-h-[85vh]"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            dir="rtl"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 left-3 p-1.5 rounded-lg bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-lg font-display gold-text">تدبّر اليوم</h3>
                <Sparkles className="w-5 h-5" />
              </div>

              <div className="gold-border rounded-xl p-4 bg-secondary/30">
                <p className="font-uthmanic text-foreground/95 text-xl sm:text-2xl leading-[2.4]">
                  {data.ayahText}
                </p>
                <p className="text-primary/80 text-sm font-arabic mt-3">
                  {data.surahName} — آية {data.ayahNumber}
                </p>
              </div>

              <div className="text-right space-y-2">
                <h4 className="text-sm font-arabic text-primary/70">التفسير الميسّر:</h4>
                <p className="text-sm font-arabic text-foreground/80 leading-relaxed">
                  {data.tafsir}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TadabburModal;
