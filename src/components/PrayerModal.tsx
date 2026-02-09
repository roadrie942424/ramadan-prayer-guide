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
  <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
    <span className="text-foreground font-arabic text-base sm:text-lg">{label}</span>
    <span className="gold-text font-bold text-lg sm:text-xl font-display tracking-wider">{time}</span>
  </div>
);

const PrayerModal = ({ open, onClose, data }: PrayerModalProps) => {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-card border-border gold-border max-w-md mx-auto p-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="gold-gradient p-4 sm:p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-3 left-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <X size={20} />
          </button>
          <DialogHeader className="text-center">
            <DialogTitle className="text-primary-foreground text-2xl sm:text-3xl font-display">
              {toArabicNumeral(data.day)} رمضان
            </DialogTitle>
            <p className="text-primary-foreground/80 text-sm mt-1">
              {data.dayNameAr} - {data.gregorianDate}
            </p>
          </DialogHeader>
        </div>

        {/* Prayer Times */}
        <div className="p-4 sm:p-6 space-y-0" dir="rtl">
          <PrayerRow label="🌙 الإمساك" time={data.imsak} />
          <PrayerRow label="🕌 الفجر" time={data.fajr} />
          <PrayerRow label="🌅 الشروق" time={data.sunrise} />
          <PrayerRow label="☀️ الظهر" time={data.dhuhr} />
          <PrayerRow label="🌇 الأفطار (المغرب)" time={data.maghrib} />
        </div>

        {/* Daily Dua */}
        <div className="mx-4 sm:mx-6 mb-4 sm:mb-6 p-4 rounded-xl bg-secondary/50 gold-border" dir="rtl">
          <h3 className="gold-text font-display text-lg mb-2 text-center">دعاء اليوم</h3>
          <p className="text-foreground/90 font-arabic text-sm sm:text-base leading-relaxed text-center">
            {data.dua}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrayerModal;
