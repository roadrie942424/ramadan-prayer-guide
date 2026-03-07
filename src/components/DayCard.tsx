import { toArabicNumeral } from "@/data/prayerData";

interface DayCardProps {
  day: number;
  hijriDate: string;
  onClick: () => void;
  isSelected?: boolean;
  isToday?: boolean;
}

const DayCard = ({ day, hijriDate, onClick, isSelected, isToday }: DayCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`gold-border card-hover rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center gap-1 sm:gap-2 min-h-[80px] sm:min-h-[100px] cursor-pointer group relative overflow-hidden transition-all duration-300 animate-fade-in-scale ${
        isSelected
          ? "bg-primary/20 ring-2 ring-primary shadow-[0_0_20px_hsl(45_80%_55%/0.3)]"
          : isToday
          ? "bg-primary/10 ring-2 ring-primary/60 shadow-[0_0_15px_hsl(45_80%_55%/0.25)] animate-pulse-gold"
          : "bg-card hover:bg-card/80"
      }`}
      style={{ animationDelay: `${(day % 10) * 0.03}s` }}
    >
      {isToday && (
        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className={`text-2xl sm:text-3xl font-bold font-display relative z-10 ${
        isSelected || isToday ? "text-primary" : "gold-text"
      }`}>
        {toArabicNumeral(day)}
      </span>
      <span className={`text-xs sm:text-sm font-arabic relative z-10 ${
        isSelected ? "text-primary/80" : isToday ? "text-primary/70" : "text-muted-foreground"
      }`}>
        {hijriDate}
      </span>
    </button>
  );
};

export default DayCard;
