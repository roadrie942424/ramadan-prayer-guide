import { useState, useMemo } from "react";
import { getGovernorateTimings } from "@/data/governorateData";
import { getSunniRegionTimings, sunniGovernorates } from "@/data/sunniGovernorateData";
import DayCard from "@/components/DayCard";
import PrayerModal from "@/components/PrayerModal";
import CountdownTimer from "@/components/CountdownTimer";
import SadaqahHeader from "@/components/SadaqahHeader";
import HamburgerMenu, { WaqfType } from "@/components/HamburgerMenu";
import CannonAnimation from "@/components/CannonAnimation";
import QuranTab from "@/pages/QuranTab";
import { governorates } from "@/data/governorateData";
import { useNotifications } from "@/hooks/useNotifications";
import ramadanBg from "@/assets/ramadan-bg.jpg";
import crescentMoon from "@/assets/crescent-moon.png";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Calendar } from "lucide-react";

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

  // Notifications
  useNotifications(timings);

  const selectedData = selectedDay !== null
    ? timings.find((d) => d.day === selectedDay) ?? null
    : null;

  const todayDay = useMemo(() => {
    const now = new Date();
    const monthDay = `${now.getMonth() + 1}/${now.getDate()}`;
    const today = timings.find((t) => {
      const [m, d] = t.gregorianDate.split("/");
      return `${parseInt(m)}/${parseInt(d)}` === monthDay;
    });
    return today?.day ?? null;
  }, [timings]);

  const currentHijriDate = useMemo(() => {
    if (todayDay === null) return "رمضان المبارك";
    const today = timings.find((t) => t.day === todayDay);
    return today ? today.hijriDate : "رمضان المبارك";
  }, [todayDay, timings]);

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
    <div className="min-h-screen relative touch-manipulation" dir="rtl">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ramadanBg})`, backgroundAttachment: "fixed" }}
      />
      <div className="fixed inset-0 bg-background/85" />

      {/* Cannon Animation */}
      <CannonAnimation timings={timings} testMode={testCannon} />
      {testCannon && setTimeout(() => setTestCannon(false), 7000) && null}

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-10 space-y-6 sm:space-y-10">
        {/* Hijri Date Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 sm:gap-3 gold-border rounded-full px-4 sm:px-5 py-1.5 sm:py-2 bg-secondary/40"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src={crescentMoon}
              alt="هلال رمضان"
              className="w-7 h-7 sm:w-10 sm:h-10 object-contain"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-base sm:text-xl font-display gold-text">{currentHijriDate} ١٤٤٦ هـ</span>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="imsakia" className="w-full">
          <TabsList className="w-full bg-secondary/50 gold-border rounded-xl p-1 h-auto">
            <TabsTrigger
              value="imsakia"
              className="flex-1 rounded-lg py-2.5 text-sm sm:text-base font-arabic gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_12px_hsl(45_80%_55%/0.2)] transition-all"
            >
              <Calendar className="w-4 h-4" />
              الإمساكية
            </TabsTrigger>
            <TabsTrigger
              value="quran"
              className="flex-1 rounded-lg py-2.5 text-sm sm:text-base font-arabic gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_12px_hsl(45_80%_55%/0.2)] transition-all"
            >
              <BookOpen className="w-4 h-4" />
              القرآن الكريم
            </TabsTrigger>
          </TabsList>

          <TabsContent value="imsakia" className="space-y-6 sm:space-y-10 mt-4 sm:mt-6">
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
                className="gold-border rounded-full px-4 py-2 bg-secondary/40 text-sm font-arabic text-foreground/80 hover:bg-primary/20 active:scale-95 transition-all"
              >
                🎆 تجربة مدفع الإفطار
              </button>
            </motion.div>

            {/* Section Title */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.h2
                className="text-xl sm:text-2xl font-display gold-text"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                ✦ أيام شهر رمضان ✦
              </motion.h2>
              <motion.div
                className="mt-2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent max-w-xs mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.div>

            {/* Day Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5 sm:gap-3">
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
              className="text-center pb-4 sm:pb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-muted-foreground text-xs font-arabic">
                {getFooterLabel()}
              </p>
            </motion.div>
          </TabsContent>

          <TabsContent value="quran" className="mt-4 sm:mt-6">
            <QuranTab />
          </TabsContent>
        </Tabs>
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
