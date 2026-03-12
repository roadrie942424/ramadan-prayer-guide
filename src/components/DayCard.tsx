import { toArabicNumeral } from "@/data/prayerData";
import { motion } from "framer-motion";

interface DayCardProps {
  day: number;
  hijriDate: string;
  onClick: () => void;
  isSelected?: boolean;
  isToday?: boolean;
}

const DayCard = ({ day, hijriDate, onClick, isSelected, isToday }: DayCardProps) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (day % 10) * 0.03, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className={`gold-border card-hover rounded-xl p-2 sm:p-4 flex flex-col items-center justify-center gap-0.5 sm:gap-2 min-h-[68px] sm:min-h-[100px] cursor-pointer group relative overflow-hidden ${
        isSelected
          ? "bg-primary/20 ring-2 ring-primary shadow-[0_0_20px_hsl(45_80%_55%/0.3)]"
          : isToday
          ? "bg-primary/10 ring-2 ring-primary/60 shadow-[0_0_15px_hsl(45_80%_55%/0.25)] animate-pulse-gold"
          : "bg-card hover:bg-card/80"
      }`}
    >
      {isToday && (
        <motion.div
          className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-primary"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
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
    </motion.button>
  );
};

export default DayCard;
