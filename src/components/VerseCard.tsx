import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import html2canvas from "html2canvas";

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  surah: { number: number; name: string; englishName: string; numberOfAyahs: number };
}

interface VerseCardProps {
  ayah: Ayah | null;
  onClose: () => void;
}

const VerseCard = ({ ayah, onClose }: VerseCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null, scale: 2, useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `ayah-${ayah?.number}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch { /* silent */ }
  };

  return (
    <AnimatePresence>
      {ayah && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div className="relative max-w-md w-full"
            initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}>
            <button onClick={onClose}
              className="absolute -top-10 left-0 p-1.5 rounded-lg bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors z-10">
              <X className="w-4 h-4" />
            </button>

            {/* The card to capture */}
            <div ref={cardRef} className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(222 47% 12%), hsl(222 50% 8%))",
                border: "2px solid hsl(45 50% 35%)",
              }}>
              <div className="p-8 sm:p-10 text-center space-y-6" dir="rtl">
                {/* Decorative top */}
                <div className="flex justify-center">
                  <div style={{ color: "hsl(45 80% 55%)", fontSize: "2rem" }}>﷽</div>
                </div>

                {/* Ayah text */}
                <p className="font-uthmanic text-xl sm:text-2xl leading-[2.4]"
                  style={{ color: "hsl(45 85% 85%)", textShadow: "0 0 20px hsl(45 80% 55% / 0.2)" }}>
                  {ayah.text}
                </p>

                {/* Surah info */}
                <div style={{ borderTop: "1px solid hsl(45 50% 30%)", paddingTop: "1rem" }}>
                  <p className="font-arabic text-sm" style={{ color: "hsl(45 80% 60%)" }}>
                    {ayah.surah.name} — آية {ayah.numberInSurah}
                  </p>
                </div>

                {/* Watermark */}
                <p className="text-xs" style={{ color: "hsl(45 50% 40%)" }}>imsaket.lovable.app</p>
              </div>
            </div>

            {/* Download button */}
            <button onClick={handleDownload}
              className="mt-4 w-full flex items-center justify-center gap-2 gold-border rounded-xl px-4 py-3 bg-secondary/60 text-sm font-arabic text-primary hover:bg-primary/20 transition-colors">
              <Download className="w-4 h-4" /> تحميل البطاقة
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VerseCard;
