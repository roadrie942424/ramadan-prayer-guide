import { toArabicNumeral } from "@/data/prayerData";

interface DayCardProps {
  day: number;
  hijriDate: string;
  onClick: () => void;
}

const DayCard = ({ day, hijriDate, onClick }: DayCardProps) => {
  return (
    <button
      onClick={onClick}
      className="gold-border card-hover rounded-xl bg-card p-3 sm:p-4 flex flex-col items-center justify-center gap-1 sm:gap-2 min-h-[80px] sm:min-h-[100px] cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="text-2xl sm:text-3xl font-bold gold-text font-display relative z-10">
        {toArabicNumeral(day)}
      </span>
      <span className="text-xs sm:text-sm text-muted-foreground font-arabic relative z-10">
        {hijriDate}
      </span>
    </button>
  );
};

export default DayCard;
