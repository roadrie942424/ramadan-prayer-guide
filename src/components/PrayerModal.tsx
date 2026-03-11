import { DayPrayerTimes, toArabicNumeral } from "@/data/prayerData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface PrayerModalProps {
  open: boolean;
  onClose: () => void;
  data: DayPrayerTimes | null;
}

const prayerIcons: Record<string, string> = {
  imsak: "🌙",
  fajr: "🕌",
  sunrise: "🌅",
  dhuhr: "☀️",
  maghrib: "🌇",
};

const PrayerRow = ({ label, time, icon, index }: { label: string; time: string; icon: string; index: number }) => (
  <motion.div
    className="flex items-center justify-between py-3 border-b border-primary/10 last:border-0"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 + index * 0.08, type: "spring", stiffness: 200 }}
  >
    <span className="text-foreground font-arabic text-base sm:text-lg">{icon} {label}</span>
    <motion.span
      className="gold-text font-bold text-lg sm:text-xl font-display tracking-wider"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 + index * 0.08 }}
    >
      {time}
    </motion.span>
  </motion.div>
);

const PrayerModal = ({ open, onClose, data }: PrayerModalProps) => {
  if (!data) return null;

  const prayers = [
    { label: "الإمساك", time: data.imsak, icon: prayerIcons.imsak },
    { label: "الفجر", time: data.fajr, icon: prayerIcons.fajr },
    { label: "الشروق", time: data.sunrise, icon: prayerIcons.sunrise },
    { label: "الظهر", time: data.dhuhr, icon: prayerIcons.dhuhr },
    { label: "الإفطار (المغرب)", time: data.maghrib, icon: prayerIcons.maghrib },
  ];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-background/85 backdrop-blur-2xl border border-primary/20 max-w-md p-0 overflow-hidden rounded-2xl shadow-[0_0_80px_hsl(45_80%_55%/0.2),0_25px_50px_-12px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="relative p-5 sm:p-6 text-center border-b border-primary/10">
          <DialogHeader>
            <DialogTitle className="gold-text text-3xl sm:text-4xl font-display">
              {toArabicNumeral(data.day)} رمضان
            </DialogTitle>
            <p className="text-muted-foreground text-sm mt-2 font-arabic">
              {data.dayNameAr} - {data.gregorianDate}
            </p>
          </DialogHeader>
        </div>

        {/* Prayer Times */}
        <div className="p-5 sm:p-6 space-y-0" dir="rtl">
          {prayers.map((p, i) => (
            <PrayerRow key={p.label} label={p.label} time={p.time} icon={p.icon} index={i} />
          ))}
        </div>

        {/* Daily Dua */}
        <motion.div
          className="mx-5 sm:mx-6 mb-5 sm:mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10"
          dir="rtl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="gold-text font-display text-lg mb-2 text-center">دعاء اليوم</h3>
          <p className="text-foreground/80 font-arabic text-sm sm:text-base leading-relaxed text-center">
            {data.dua}
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default PrayerModal;
