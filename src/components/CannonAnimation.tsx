import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPrayerTimes } from "@/data/prayerData";
import cannonImg from "@/assets/cannon.jfif";

interface CannonAnimationProps {
  timings: DayPrayerTimes[];
  testMode?: boolean;
}

const CannonAnimation = ({ timings, testMode = false }: CannonAnimationProps) => {
  const [show, setShow] = useState(false);
  const [fired, setFired] = useState(false);

  const playCannonSound = useCallback(() => {
    try {
      const audio = new Audio("/sounds/cannon.mp4");
      audio.volume = 0.8;
      audio.play();
    } catch (e) {
      console.log("Audio not supported");
    }
  }, []);

  const triggerCannon = useCallback(() => {
    if (fired && !testMode) return;
    setShow(true);
    setFired(true);
    playCannonSound();
    setTimeout(() => setShow(false), 5000);
  }, [fired, testMode, playCannonSound]);

  useEffect(() => {
    if (testMode) {
      triggerCannon();
      return;
    }

    const checkTime = () => {
      const now = new Date();
      const monthDay = `${now.getMonth() + 1}/${now.getDate()}`;
      const today = timings.find((t) => {
        const [m, d] = t.gregorianDate.split("/");
        return `${parseInt(m)}/${parseInt(d)}` === monthDay;
      });

      if (today) {
        const [h, m] = today.maghrib.split(":").map(Number);
        const maghribHour = h < 12 ? h + 12 : h;
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const maghribMinutes = maghribHour * 60 + m;
        if (Math.abs(nowMinutes - maghribMinutes) <= 1 && now.getSeconds() < 10) {
          triggerCannon();
        }
      }
    };

    const interval = setInterval(checkTime, 5000);
    checkTime();
    return () => clearInterval(interval);
  }, [timings, testMode, triggerCannon]);

  // Sparks/fire particles
  const sparks = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    angle: (i / 30) * 360,
    distance: 80 + Math.random() * 180,
    size: 4 + Math.random() * 8,
    delay: Math.random() * 0.4,
    duration: 0.6 + Math.random() * 0.8,
    color: [`hsl(var(--gold))`, `hsl(var(--gold-light))`, `hsl(var(--destructive))`, `hsl(45 100% 80%)`][Math.floor(Math.random() * 4)],
  }));

  // Smoke puffs
  const smokePuffs = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: -30 + Math.random() * 60,
    delay: 0.3 + i * 0.15,
    size: 40 + Math.random() * 60,
  }));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none flex flex-col items-center justify-end pb-16 sm:pb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Screen flash */}
          <motion.div
            className="absolute inset-0 bg-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />

          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 bg-background/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.5, 0] }}
            transition={{ duration: 3, times: [0, 0.1, 0.4, 1] }}
          />

          {/* Iftar text - top */}
          <motion.div
            className="absolute top-[15%] sm:top-[18%] text-center z-10"
            initial={{ opacity: 0, scale: 0.3, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 150, damping: 12 }}
          >
            <motion.h2
              className="text-4xl sm:text-7xl font-display gold-text drop-shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: 1, ease: "easeInOut" }}
            >
              حان وقت الإفطار!
            </motion.h2>
            <motion.p
              className="text-foreground/80 text-lg sm:text-2xl font-arabic mt-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              تقبّل الله صيامكم 🤲
            </motion.p>
          </motion.div>

          {/* Cannon image */}
          <motion.div
            className="relative z-10"
            initial={{ y: 300, opacity: 0, rotate: 5 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 80 }}
          >
            {/* Muzzle flash */}
            <motion.div
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(var(--gold-light) / 0.9), hsl(var(--gold) / 0.5), transparent)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 3, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />

            {/* Recoil on cannon */}
            <motion.img
              src={cannonImg}
              alt="مدفع الإفطار"
              className="w-40 h-40 sm:w-56 sm:h-56 object-contain drop-shadow-2xl"
              animate={{ y: [0, 12, -4, 0], rotate: [0, -6, 2, 0] }}
              transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
            />

            {/* Fire sparks */}
            {sparks.map((s) => (
              <motion.div
                key={s.id}
                className="absolute top-1/4 left-1/2 rounded-full"
                style={{
                  width: s.size,
                  height: s.size,
                  background: s.color,
                  boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((s.angle * Math.PI) / 180) * s.distance,
                  y: Math.sin((s.angle * Math.PI) / 180) * s.distance - 80,
                  opacity: [1, 1, 0],
                  scale: [0.5, 1.8, 0],
                }}
                transition={{
                  duration: s.duration,
                  delay: 0.4 + s.delay,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Smoke puffs */}
            {smokePuffs.map((p) => (
              <motion.div
                key={`smoke-${p.id}`}
                className="absolute -top-8 left-1/2 rounded-full bg-foreground/10"
                style={{ width: p.size, height: p.size, filter: "blur(12px)" }}
                initial={{ x: p.x, y: 0, opacity: 0, scale: 0.3 }}
                animate={{
                  y: [-20, -120 - p.id * 25],
                  x: [p.x, p.x + (Math.random() - 0.5) * 80],
                  opacity: [0, 0.5, 0],
                  scale: [0.3, 1.5, 2],
                }}
                transition={{ duration: 2, delay: p.delay, ease: "easeOut" }}
              />
            ))}

            {/* Expanding shockwave rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/30"
                initial={{ width: 10, height: 10, opacity: 0 }}
                animate={{
                  width: [10, 200 + i * 60],
                  height: [10, 200 + i * 60],
                  opacity: [0, 0.6, 0],
                }}
                transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CannonAnimation;
