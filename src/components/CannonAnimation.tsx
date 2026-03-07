import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPrayerTimes } from "@/data/prayerData";

interface CannonAnimationProps {
  timings: DayPrayerTimes[];
  /** For testing: set true to trigger immediately */
  testMode?: boolean;
}

const CannonAnimation = ({ timings, testMode = false }: CannonAnimationProps) => {
  const [show, setShow] = useState(false);
  const [fired, setFired] = useState(false);

  const playCannonSound = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const duration = 1.2;
      const sampleRate = ctx.sampleRate;

      // Create explosion noise buffer
      const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const t = i / sampleRate;
        // Sharp attack, exponential decay
        const envelope = Math.exp(-t * 4) * (t < 0.02 ? t / 0.02 : 1);
        data[i] = (Math.random() * 2 - 1) * envelope;
        // Add low-frequency boom
        data[i] += Math.sin(t * 80 * Math.PI * 2) * Math.exp(-t * 6) * 0.6;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Low-pass filter for boom effect
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.7, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();
      source.onended = () => ctx.close();
    } catch (e) {
      console.log("Audio not supported");
    }
  }, []);

  const triggerCannon = useCallback(() => {
    if (fired && !testMode) return;
    setShow(true);
    setFired(true);
    playCannonSound();
    setTimeout(() => setShow(false), 4000);
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
        // Trigger within 1 minute of maghrib
        if (Math.abs(nowMinutes - maghribMinutes) <= 1 && now.getSeconds() < 10) {
          triggerCannon();
        }
      }
    };

    const interval = setInterval(checkTime, 5000);
    checkTime();
    return () => clearInterval(interval);
  }, [timings, testMode, triggerCannon]);

  // Particle positions for explosion
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i / 20) * 360,
    distance: 60 + Math.random() * 120,
    size: 3 + Math.random() * 6,
    delay: Math.random() * 0.3,
    duration: 0.8 + Math.random() * 0.6,
  }));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Dark overlay flash */}
          <motion.div
            className="absolute inset-0 bg-background/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.3, 0] }}
            transition={{ duration: 1.5, times: [0, 0.05, 0.3, 1] }}
          />

          {/* Cannon body */}
          <motion.div
            className="relative"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
          >
            {/* Cannon barrel */}
            <motion.div
              className="text-8xl sm:text-9xl"
              animate={{ rotate: [0, -8, 0] }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              💥
            </motion.div>

            {/* Muzzle flash */}
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(45 90% 70% / 0.8), hsl(30 100% 50% / 0.4), transparent)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2.5, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />

            {/* Explosion particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: `hsl(${40 + Math.random() * 20} ${70 + Math.random() * 30}% ${50 + Math.random() * 30}%)`,
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
                  y: Math.sin((p.angle * Math.PI) / 180) * p.distance - 40,
                  opacity: [1, 1, 0],
                  scale: [1, 1.5, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: 0.5 + p.delay,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Smoke rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`smoke-${i}`}
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full border-2 border-foreground/20"
                initial={{ width: 20, height: 20, opacity: 0 }}
                animate={{
                  width: [20, 100 + i * 40],
                  height: [20, 100 + i * 40],
                  opacity: [0, 0.4, 0],
                  y: [0, -60 - i * 30],
                }}
                transition={{ duration: 1.5, delay: 0.6 + i * 0.2, ease: "easeOut" }}
              />
            ))}
          </motion.div>

          {/* Iftar text */}
          <motion.div
            className="absolute top-1/4 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            <h2 className="text-4xl sm:text-6xl font-display gold-text drop-shadow-lg">
              حان وقت الإفطار! 🌙
            </h2>
            <motion.p
              className="text-foreground/80 text-lg sm:text-xl font-arabic mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              تقبّل الله صيامكم
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CannonAnimation;
