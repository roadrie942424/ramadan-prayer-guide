import { useState } from "react";
import { getGovernorateTimings } from "@/data/governorateData";
import DayCard from "@/components/DayCard";
import PrayerModal from "@/components/PrayerModal";
import CountdownTimer from "@/components/CountdownTimer";
import SadaqahHeader from "@/components/SadaqahHeader";
import HamburgerMenu from "@/components/HamburgerMenu";
import ramadanBg from "@/assets/ramadan-bg.jpg";

const Index = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedGovernorate, setSelectedGovernorate] = useState("al-rashid");

  const timings = getGovernorateTimings(selectedGovernorate);

  const selectedData = selectedDay !== null
    ? timings.find((d) => d.day === selectedDay) ?? null
    : null;

  return (
    <div className="min-h-screen relative" dir="rtl">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ramadanBg})` }}
      />
      <div className="fixed inset-0 bg-background/85" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 sm:py-10 space-y-8 sm:space-y-10">
        {/* Header */}
        <SadaqahHeader />

        {/* Hamburger Menu */}
        <HamburgerMenu
          selectedGovernorate={selectedGovernorate}
          onGovernorateChange={setSelectedGovernorate}
        />

        {/* Countdown */}
        <CountdownTimer timings={timings} />

        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-display gold-text">أيام شهر رمضان</h2>
          <div className="mt-2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent max-w-xs mx-auto" />
        </div>

        {/* Day Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-3">
          {timings.map((day) => (
            <DayCard
              key={day.day}
              day={day.day}
              hijriDate={day.hijriDate}
              onClick={() => setSelectedDay(day.day)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pb-6">
          <p className="text-muted-foreground text-xs font-arabic">
            إمساكية الرشيد — الطائفة الشيعية
          </p>
        </div>
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
