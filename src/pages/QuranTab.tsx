import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const QuranTab = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 sm:py-32 gap-6 text-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full gold-border bg-secondary/40 flex items-center justify-center gold-glow"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
      </motion.div>
      <h2 className="text-2xl sm:text-3xl font-display gold-text">القرآن الكريم</h2>
      <p className="text-muted-foreground font-arabic text-sm sm:text-base max-w-xs">
        قريباً إن شاء الله...
      </p>
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent w-48" />
    </motion.div>
  );
};

export default QuranTab;
