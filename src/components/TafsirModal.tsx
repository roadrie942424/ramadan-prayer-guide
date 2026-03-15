import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  surah: { number: number; name: string; englishName: string; numberOfAyahs: number };
}

interface TafsirModalProps {
  ayah: Ayah | null;
  onClose: () => void;
}

const TafsirModal = ({ ayah, onClose }: TafsirModalProps) => {
  const [tafsir, setTafsir] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ayah) { setTafsir(""); return; }
    setLoading(true);
    fetch(`https://api.alquran.cloud/v1/ayah/${ayah.number}/ar.muyassar`)
      .then(r => r.json())
      .then(json => setTafsir(json.data?.text || "لا يتوفر تفسير"))
      .catch(() => setTafsir("فشل في جلب التفسير"))
      .finally(() => setLoading(false));
  }, [ayah]);

  return (
    <AnimatePresence>
      {ayah && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative max-w-lg w-full bg-card border border-border rounded-2xl p-6 sm:p-8 gold-glow overflow-y-auto max-h-[85vh]"
            initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }} dir="rtl">
            <button onClick={onClose}
              className="absolute top-3 left-3 p-1.5 rounded-lg bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <h3 className="text-lg font-display gold-text text-center">التفسير الميسّر</h3>

              <div className="gold-border rounded-xl p-4 bg-secondary/30">
                <p className="font-uthmanic text-foreground/95 text-lg sm:text-xl leading-[2.4]">{ayah.text}</p>
                <p className="text-primary/80 text-sm font-arabic mt-3">
                  {ayah.surah.name} — آية {ayah.numberInSurah}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-arabic text-primary/70">التفسير:</h4>
                {loading ? (
                  <div className="flex justify-center py-4"><Loader2 className="w-6 h-6 text-primary animate-spin" /></div>
                ) : (
                  <p className="text-sm font-arabic text-foreground/80 leading-relaxed">{tafsir}</p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TafsirModal;
