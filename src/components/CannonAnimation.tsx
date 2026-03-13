import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPrayerTimes } from "@/data/prayerData";
import cannonImg from "@/assets/cannon.png";

interface CannonAnimationProps {
  timings: DayPrayerTimes[];
  testMode?: boolean;
}

// Cannonball as independent object with fire()
class Cannonball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  lifetime: number;
  age: number;
  alive: boolean;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.4;
    this.lifetime = 2000;
    this.age = 0;
    this.alive = false;
  }

  fire(startX: number, startY: number, angle: number, force: number) {
    this.x = startX;
    this.y = startY;
    const rad = (angle * Math.PI) / 180;
    this.vx = Math.cos(rad) * force;
    this.vy = -Math.sin(rad) * force;
    this.age = 0;
    this.alive = true;
  }

  update(dt: number) {
    if (!this.alive) return;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.age += dt;
    if (this.age >= this.lifetime) this.alive = false;
  }
}

const CannonAnimation = ({ timings, testMode = false }: CannonAnimationProps) => {
  const [show, setShow] = useState(false);
  const [fired, setFired] = useState(false);
  const [phase, setPhase] = useState<"fuse" | "fire" | "text">("fuse");
  const [ballPos, setBallPos] = useState<{ x: number; y: number; alive: boolean; trail: { x: number; y: number }[] }>({
    x: 0, y: 0, alive: false, trail: []
  });

  const cannonballRef = useMemo(() => new Cannonball(), []);

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
    setPhase("fuse");
    setShow(true);
    setFired(true);

    // Fuse burns for 1.8s, then fire
    setTimeout(() => {
      setPhase("fire");
      playCannonSound();

      // Launch cannonball with physics
      cannonballRef.fire(0, -20, 75, 14);
      const startTime = Date.now();
      const animate = () => {
        const dt = 16;
        cannonballRef.update(dt);
        if (cannonballRef.alive) {
          setBallPos(prev => ({
            x: cannonballRef.x,
            y: cannonballRef.y,
            alive: true,
            trail: [...prev.trail.slice(-8), { x: cannonballRef.x, y: cannonballRef.y }]
          }));
          requestAnimationFrame(animate);
        } else {
          setBallPos(prev => ({ ...prev, alive: false, trail: [] }));
        }
      };
      requestAnimationFrame(animate);
    }, 1800);

    setTimeout(() => setPhase("text"), 2800);
    setTimeout(() => setShow(false), 7500);
  }, [fired, testMode, playCannonSound, cannonballRef]);

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

  const sparks = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i / 20) * 360,
    distance: 50 + Math.random() * 140,
    size: 3 + Math.random() * 6,
    delay: Math.random() * 0.25,
    duration: 0.4 + Math.random() * 0.6,
    color: [
      "hsl(var(--gold))",
      "hsl(var(--gold-light))",
      "hsl(var(--destructive))",
      "hsl(45 100% 80%)",
    ][Math.floor(Math.random() * 4)],
  })), []);

  const smokePuffs = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
    id: i,
    x: -15 + Math.random() * 30,
    delay: i * 0.1,
    size: 25 + Math.random() * 40,
  })), []);

  const isFiring = phase === "fire" || phase === "text";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none flex flex-col items-center justify-end pb-12 sm:pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 bg-background/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Screen flash on fire */}
          {isFiring && (
            <motion.div
              className="absolute inset-0 bg-primary/25"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Iftar text */}
          {phase === "text" && (
            <motion.div
              className="absolute top-[12%] sm:top-[16%] text-center z-10 px-4"
              initial={{ opacity: 0, scale: 0.3, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
            >
              <motion.h2
                className="text-3xl sm:text-6xl font-display gold-text drop-shadow-lg"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: 1, ease: "easeInOut" }}
              >
                حان وقت الإفطار!
              </motion.h2>
              <motion.p
                className="text-foreground/80 text-base sm:text-xl font-arabic mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                تقبّل الله صيامكم 🤲
              </motion.p>
            </motion.div>
          )}

          {/* Cannon + effects container */}
          <motion.div
            className="relative z-10"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", damping: 16, stiffness: 90 }}
          >
            {/* Fuse emerging from cannon body */}
            <svg
              className="absolute z-20"
              style={{ top: "-8px", right: "-35px" }}
              width="80"
              height="70"
              viewBox="0 0 80 70"
            >
              <defs>
                <filter id="fuseGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="sparkGlow">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Fuse rope from cannon body outward */}
              <motion.path
                d="M10 60 Q20 50, 25 40 Q30 30, 40 25 Q50 20, 55 12 Q60 5, 70 3"
                stroke="hsl(var(--gold-dark))"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 1, opacity: 1 }}
                animate={
                  phase === "fuse"
                    ? { pathLength: [1, 0], opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 1.8, ease: "linear" }}
              />

              {/* Burning spark traveling along fuse */}
              {phase === "fuse" && (
                <>
                  <motion.circle
                    r="5"
                    fill="hsl(var(--gold-light))"
                    filter="url(#fuseGlow)"
                    initial={{ cx: 70, cy: 3, opacity: 1 }}
                    animate={{
                      cx: [70, 55, 40, 25, 10],
                      cy: [3, 12, 25, 40, 60],
                      opacity: [1, 1, 1, 1, 0],
                    }}
                    transition={{ duration: 1.8, ease: "linear" }}
                  />
                  {[0, 1, 2].map((i) => (
                    <motion.circle
                      key={`trail-${i}`}
                      r={2 - i * 0.5}
                      fill="hsl(var(--destructive))"
                      filter="url(#sparkGlow)"
                      initial={{ cx: 70, cy: 3, opacity: 0 }}
                      animate={{
                        cx: [70, 55, 40, 25, 10],
                        cy: [3, 12, 25, 40, 60],
                        opacity: [0, 0.8, 0.6, 0.4, 0],
                      }}
                      transition={{ duration: 1.8, ease: "linear", delay: 0.08 * (i + 1) }}
                    />
                  ))}
                </>
              )}
            </svg>

            {/* Muzzle flash */}
            {isFiring && (
              <motion.div
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, hsl(var(--gold-light) / 0.9), hsl(var(--gold) / 0.4), transparent)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2.5, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.35 }}
              />
            )}

            {/* Physics-based cannonball with trail */}
            {ballPos.alive && (
              <>
                {/* Trail */}
                {ballPos.trail.map((t, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      left: `calc(50% + ${t.x}px)`,
                      top: `${t.y}px`,
                      width: 4 + i * 0.5,
                      height: 4 + i * 0.5,
                      background: `hsl(var(--gold) / ${0.1 + (i / ballPos.trail.length) * 0.3})`,
                      filter: "blur(1px)",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ))}
                {/* Ball */}
                <div
                  className="absolute rounded-full z-30"
                  style={{
                    left: `calc(50% + ${ballPos.x}px)`,
                    top: `${ballPos.y}px`,
                    width: 18,
                    height: 18,
                    background: "radial-gradient(circle at 30% 30%, hsl(var(--foreground)/0.5), hsl(222 47% 8%))",
                    boxShadow: "0 0 12px hsl(var(--gold)/0.5), inset 0 -2px 4px rgba(0,0,0,0.5)",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </>
            )}

            {/* Cannon image with recoil */}
            <motion.img
              src={cannonImg}
              alt="مدفع الإفطار"
              className="w-32 h-32 sm:w-48 sm:h-48 object-contain drop-shadow-2xl"
              animate={
                isFiring
                  ? { y: [0, 12, -4, 0], rotate: [0, -6, 2, 0] }
                  : { y: 0, rotate: 0 }
              }
              transition={isFiring ? { duration: 0.3, ease: "easeOut" } : {}}
            />

            {/* Sparks */}
            {isFiring &&
              sparks.map((s) => (
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
                    y: Math.sin((s.angle * Math.PI) / 180) * s.distance - 50,
                    opacity: [1, 1, 0],
                    scale: [0.5, 1.3, 0],
                  }}
                  transition={{
                    duration: s.duration,
                    delay: s.delay,
                    ease: "easeOut",
                  }}
                />
              ))}

            {/* Smoke puffs */}
            {isFiring &&
              smokePuffs.map((p) => (
                <motion.div
                  key={`smoke-${p.id}`}
                  className="absolute -top-6 left-1/2 rounded-full bg-foreground/10"
                  style={{ width: p.size, height: p.size, filter: "blur(8px)" }}
                  initial={{ x: p.x, y: 0, opacity: 0, scale: 0.3 }}
                  animate={{
                    y: [-10, -80 - p.id * 20],
                    x: [p.x, p.x + (Math.random() - 0.5) * 50],
                    opacity: [0, 0.35, 0],
                    scale: [0.3, 1.2, 1.6],
                  }}
                  transition={{ duration: 1.5, delay: p.delay, ease: "easeOut" }}
                />
              ))}

            {/* Shockwave ring */}
            {isFiring && (
              <motion.div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/30"
                initial={{ width: 10, height: 10, opacity: 0 }}
                animate={{
                  width: [10, 180],
                  height: [10, 180],
                  opacity: [0, 0.5, 0],
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CannonAnimation;
