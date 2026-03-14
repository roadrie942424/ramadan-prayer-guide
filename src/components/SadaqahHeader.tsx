import ramadanIcon from "@/assets/ramadan-icon.jpg";
import { motion } from "framer-motion";

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

      {/* Title - always visible with gold glow */}
      <div className="space-y-2">
        <motion.div
          className="inline-block gold-border rounded-2xl px-6 sm:px-8 py-2.5 sm:py-3 bg-secondary/40 animate-pulse-gold"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        >
          <motion.h1
            className="text-3xl sm:text-5xl font-display leading-tight"
            style={{
              color: "hsl(45 85% 70%)",
              textShadow: "0 0 20px hsl(45 80% 55% / 0.4), 0 0 40px hsl(45 80% 55% / 0.2)",
            }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            صدقة جارية
          </motion.h1>
        </motion.div>

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
        <p className="text-foreground font-arabic text-base sm:text-lg leading-relaxed">
          اللّهمّ تقبّل منّا صيامنا وقيامنا
          <br />
          وارحم موتانا وموتى المسلمين
        </p>
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
