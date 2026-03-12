import ramadanIcon from "@/assets/ramadan-icon.jpg";
import { motion } from "framer-motion";

const shimmer = {
  animate: {
    backgroundPosition: ["200% 0%", "-200% 0%"],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "linear" as const,
  },
};

const SadaqahHeader = () => {
  return (
    <div className="text-center space-y-5" dir="rtl">
      {/* Icon with pulse glow */}
      <motion.div
        className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full gold-border overflow-hidden gold-glow"
        animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={ramadanIcon} alt="Ramadan" className="w-full h-full object-cover" />
      </motion.div>

      {/* Title with shimmer */}
      <div className="space-y-2">
        <motion.h1
          className="text-3xl sm:text-5xl font-display gold-text leading-tight"
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
        >
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            صدقة جارية
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-sm sm:text-base font-arabic"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          إمساكية شهر رمضان المبارك ١٤٤٦ هـ
        </motion.p>
      </div>

      {/* Memorial Section */}
      <motion.div
        className="gold-border rounded-2xl p-4 sm:p-6 bg-secondary/30 max-w-md mx-auto space-y-3"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.p
          className="text-foreground font-arabic text-base sm:text-lg leading-relaxed"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          اللّهمّ تقبّل منّا صيامنا وقيامنا
          <br />
          وارحم موتانا وموتى المسلمين
        </motion.p>
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <p className="text-muted-foreground text-xs sm:text-sm font-arabic">
          الفاتحة لأرواح جميع المؤمنين والمؤمنات
        </p>
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <p className="text-primary/80 text-xs sm:text-sm font-arabic">
          صدقة جارية عن روح المرحوم
        </p>
        <motion.p
          className="gold-text text-lg sm:text-xl font-display font-bold"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          عبد العزيز حسن نهيب الساعدي
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SadaqahHeader;
