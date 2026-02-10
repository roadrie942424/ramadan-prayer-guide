import { DayPrayerTimes, toArabicNumeral } from "@/data/prayerData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface PrayerModalProps {
  open: boolean;
  onClose: () => void;
  data: DayPrayerTimes | null;
}

const PrayerRow = ({ label, time }: { label: string; time: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-primary/10 last:border-0">
    <span className="text-foreground font-arabic text-base sm:text-lg">{label}</span>
    <span className="gold-text font-bold text-lg sm:text-xl font-display tracking-wider">{time}</span>
  </div>
);

const PrayerModal = ({ open, onClose, data }: PrayerModalProps) => {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-background/80 backdrop-blur-xl border border-primary/20 max-w-md mx-auto p-0 overflow-hidden rounded-2xl shadow-[0_0_60px_hsl(45_80%_55%/0.15),0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="relative p-5 sm:p-6 text-center border-b border-primary/10">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-1.5 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <X size={18} />
          </button>
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
          <PrayerRow label="🌙 الإمساك" time={data.imsak} />
          <PrayerRow label="🕌 الفجر" time={data.fajr} />
          <PrayerRow label="🌅 الشروق" time={data.sunrise} />
          <PrayerRow label="☀️ الظهر" time={data.dhuhr} />
          <PrayerRow label="🌇 الإفطار (المغرب)" time={data.maghrib} />
        </div>

        {/* Daily Dua */}
        <div className="mx-5 sm:mx-6 mb-5 sm:mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10" dir="rtl">
          <h3 className="gold-text font-display text-lg mb-2 text-center">دعاء اليوم</h3>
          <p className="text-foreground/80 font-arabic text-sm sm:text-base leading-relaxed text-center">
            {data.dua}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrayerModal;
