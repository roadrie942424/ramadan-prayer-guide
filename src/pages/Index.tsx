import { useState, useMemo } from "react";
import { getGovernorateTimings } from "@/data/governorateData";
import { getSunniRegionTimings, sunniGovernorates } from "@/data/sunniGovernorateData";
import DayCard from "@/components/DayCard";
import PrayerModal from "@/components/PrayerModal";
import CountdownTimer from "@/components/CountdownTimer";
import SadaqahHeader from "@/components/SadaqahHeader";
import HamburgerMenu, { WaqfType } from "@/components/HamburgerMenu";
import CannonAnimation from "@/components/CannonAnimation";
import { governorates } from "@/data/governorateData";
import ramadanBg from "@/assets/ramadan-bg.jpg";
import { motion } from "framer-motion";

const Index = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedGovernorate, setSelectedGovernorate] = useState("baghdad");
  const [waqfType, setWaqfType] = useState<WaqfType>("shia");
  const [selectedSunniGovernorate, setSelectedSunniGovernorate] = useState("baghdad");
  const [selectedSunniRegion, setSelectedSunniRegion] = useState("baghdad-center");
  const [testCannon, setTestCannon] = useState(false);

  const timings =
    waqfType === "shia"
      ? getGovernorateTimings(selectedGovernorate)
      : getSunniRegionTimings(selectedSunniGovernorate, selectedSunniRegion);

  const selectedData = selectedDay !== null
    ? timings.find((d) => d.day === selectedDay) ?? null
    : null;

  // Find today's day number
  const todayDay = useMemo(() => {
    const now = new Date();
    const monthDay = `${now.getMonth() + 1}/${now.getDate()}`;
    const today = timings.find((t) => {
      const [m, d] = t.gregorianDate.split("/");
      return `${parseInt(m)}/${parseInt(d)}` === monthDay;
    });
    return today?.day ?? null;
  }, [timings]);

  // Get current Hijri date
  const currentHijriDate = useMemo(() => {
    if (todayDay === null) return "رمضان المبارك";
    const today = timings.find((t) => t.day === todayDay);
    return today ? today.hijriDate : "رمضان المبارك";
  }, [todayDay, timings]);

  // Footer label
  const getFooterLabel = () => {
    if (waqfType === "shia") {
      const govName = governorates.find((g) => g.id === selectedGovernorate)?.name ?? "بغداد";
      return `إمساكية ${govName} — الوقف الشيعي`;
    }
    const gov = sunniGovernorates.find((g) => g.id === selectedSunniGovernorate);
    const region = gov?.regions.find((r) => r.id === selectedSunniRegion);
    return `إمساكية ${region?.name ?? gov?.name ?? "أربيل"} — الوقف السني`;
  };

  return (
    <div className="min-h-screen relative" dir="rtl">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ramadanBg})` }}
      />
      <div className="fixed inset-0 bg-background/85" />

      {/* Cannon Animation */}
      <CannonAnimation timings={timings} testMode={testCannon} />
      {testCannon && (
        <div className="fixed z-[101]" style={{ display: "none" }}>
          {/* Reset after trigger */}
          {setTimeout(() => setTestCannon(false), 5000) && null}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 sm:py-10 space-y-8 sm:space-y-10">
        {/* Hijri Date Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 gold-border rounded-full px-5 py-2 bg-secondary/40">
            <span className="text-lg sm:text-xl font-display gold-text">🌙 {currentHijriDate} ١٤٤٦ هـ</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SadaqahHeader />
        </motion.div>

        {/* Hamburger Menu */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <HamburgerMenu
            selectedGovernorate={selectedGovernorate}
            onGovernorateChange={setSelectedGovernorate}
            waqfType={waqfType}
            onWaqfTypeChange={setWaqfType}
            selectedSunniGovernorate={selectedSunniGovernorate}
            onSunniGovernorateChange={setSelectedSunniGovernorate}
            selectedSunniRegion={selectedSunniRegion}
            onSunniRegionChange={setSelectedSunniRegion}
          />
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CountdownTimer timings={timings} />
        </motion.div>

        {/* Test Cannon Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => setTestCannon(true)}
            className="gold-border rounded-full px-4 py-2 bg-secondary/40 text-sm font-arabic text-foreground/80 hover:bg-primary/20 transition-colors"
          >
            🎆 تجربة مدفع الإفطار
          </button>
        </motion.div>

        {/* Section Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl font-display gold-text">أيام شهر رمضان</h2>
          <div className="mt-2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent max-w-xs mx-auto" />
        </motion.div>

        {/* Day Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-3">
          {timings.map((day) => (
            <DayCard
              key={day.day}
              day={day.day}
              hijriDate={day.hijriDate}
              isSelected={selectedDay === day.day}
              isToday={todayDay === day.day}
              onClick={() => setSelectedDay(day.day)}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-muted-foreground text-xs font-arabic">
            {getFooterLabel()}
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <PrayerModal
        open={selectedDay !== null}
        onClose={() => setSelectedDay(null)}
        data={selectedData}
      />
    </div>
  );
};

export default Index;
