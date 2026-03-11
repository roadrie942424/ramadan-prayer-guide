import ramadanIcon from "@/assets/ramadan-icon.jpg";
import { motion } from "framer-motion";

const SadaqahHeader = () => {
  return (
    <div className="text-center space-y-5" dir="rtl">
      {/* Icon */}
      <motion.div
        className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full gold-border overflow-hidden gold-glow"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={ramadanIcon} alt="Ramadan" className="w-full h-full object-cover" />
      </motion.div>

      {/* Title */}
      <div className="space-y-2">
        <motion.h1
          className="text-3xl sm:text-5xl font-display gold-text leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          صدقة جارية
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-sm sm:text-base font-arabic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          إمساكية شهر رمضان المبارك ١٤٤٦ هـ
        </motion.p>
      </div>

      {/* Memorial Section */}
      <motion.div
        className="gold-border rounded-2xl p-4 sm:p-6 bg-secondary/30 max-w-md mx-auto space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
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
        <p className="gold-text text-lg sm:text-xl font-display font-bold">
          عبد العزيز حسن نهيب الساعدي
        </p>
      </motion.div>
    </div>
  );
};

export default SadaqahHeader;
