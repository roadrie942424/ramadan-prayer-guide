import { useState, useEffect } from "react";
import { DayPrayerTimes } from "@/data/prayerData";

interface CountdownTimerProps {
  timings: DayPrayerTimes[];
}

const CountdownTimer = ({ timings }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [nextPrayer, setNextPrayer] = useState("المغرب");

  useEffect(() => {
    const tick = () => {
      const now = new Date();

      // Find today's timings based on gregorian date
      const monthDay = `${now.getMonth() + 1}/${now.getDate()}`;
      const today = timings.find((t) => {
        const [m, d] = t.gregorianDate.split("/");
        return `${parseInt(m)}/${parseInt(d)}` === monthDay;
      });

      let maghribHour = 18;
      let maghribMin = 15;
      let fajrHour = 5;
      let fajrMin = 0;

      if (today) {
        const [mH, mM] = today.maghrib.split(":").map(Number);
        maghribHour = mH < 12 ? mH + 12 : mH;
        maghribMin = mM;
        const [fH, fM] = today.fajr.split(":").map(Number);
        fajrHour = fH;
        fajrMin = fM;
      }

      let target = new Date(now);
      target.setHours(maghribHour, maghribMin, 0, 0);

      if (now >= target) {
        target = new Date(now);
        target.setDate(target.getDate() + 1);
        target.setHours(fajrHour, fajrMin, 0, 0);
        setNextPrayer("الفجر");
      } else {
        setNextPrayer("الإفطار");
      }

      const diff = target.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [timings]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <p className="text-muted-foreground text-sm font-arabic mb-2">
        الوقت المتبقي حتى {nextPrayer}
      </p>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {[
          { value: timeLeft.hours, label: "ساعة" },
          { value: timeLeft.minutes, label: "دقيقة" },
          { value: timeLeft.seconds, label: "ثانية" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="gold-border rounded-lg px-3 sm:px-4 py-2 sm:py-3 bg-secondary/50 min-w-[50px] sm:min-w-[60px] animate-pulse-gold">
              <span className="gold-text text-xl sm:text-2xl font-bold font-display">
                {pad(item.value)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground mt-1 font-arabic">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
