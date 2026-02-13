import ramadanIcon from "@/assets/ramadan-icon.jpg";

const SadaqahHeader = () => {
  return (
    <div className="text-center space-y-4 animate-fade-in" dir="rtl">
      {/* Icon */}
      <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full gold-border overflow-hidden animate-float gold-glow">
        <img
          src={ramadanIcon}
          alt="Ramadan"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl sm:text-5xl font-display gold-text animate-shimmer leading-tight">
          صدقة جارية
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 font-arabic">
          إمساكية شهر رمضان المبارك ١٤٤٦ هـ
        </p>
        <p className="text-primary/80 text-xs sm:text-sm mt-1 font-arabic">
          صدقة جارية عن روح المرحوم
        </p>
        <p className="gold-text text-base sm:text-lg font-display font-bold mt-0.5">
          عبد العزيز حسن نهيب الساعدي
        </p>
      </div>

      {/* Memorial Section */}
      <div className="gold-border rounded-2xl p-4 sm:p-6 bg-secondary/30 max-w-md mx-auto">
        <p className="text-foreground font-arabic text-base sm:text-lg leading-relaxed">
          اللّهمّ تقبّل منّا صيامنا وقيامنا
          <br />
          وارحم موتانا وموتى المسلمين
        </p>
        <div className="mt-3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <p className="text-muted-foreground text-xs sm:text-sm mt-3 font-arabic">
          الفاتحة لأرواح جميع المؤمنين والمؤمنات
        </p>
      </div>
    </div>
  );
};

export default SadaqahHeader;
