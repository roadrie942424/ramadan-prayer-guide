import { useState, useEffect } from "react";
import { DayPrayerTimes } from "@/data/prayerData";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownTimerProps {
  timings: DayPrayerTimes[];
}

const CountdownTimer = ({ timings }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [nextPrayer, setNextPrayer] = useState("المغرب");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const monthDay = `${now.getMonth() + 1}/${now.getDate()}`;
      const today = timings.find((t) => {
        const [m, d] = t.gregorianDate.split("/");
        return `${parseInt(m)}/${parseInt(d)}` === monthDay;
      });

      let maghribHour = 18, maghribMin = 15, fajrHour = 5, fajrMin = 0;

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
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [timings]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const items = [
    { value: timeLeft.hours, label: "ساعة" },
    { value: timeLeft.minutes, label: "دقيقة" },
    { value: timeLeft.seconds, label: "ثانية" },
  ];

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <p className="text-muted-foreground text-sm font-arabic mb-3">
        الوقت المتبقي حتى {nextPrayer}
      </p>
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
          >
            <div className="gold-border rounded-xl px-4 sm:px-5 py-3 sm:py-4 bg-secondary/50 min-w-[55px] sm:min-w-[70px] gold-glow">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={item.value}
                  className="gold-text text-2xl sm:text-3xl font-bold font-display block"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {pad(item.value)}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="text-xs text-muted-foreground mt-1.5 font-arabic">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
