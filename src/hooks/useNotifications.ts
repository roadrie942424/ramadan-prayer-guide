import { useEffect, useRef } from "react";
import { DayPrayerTimes } from "@/data/prayerData";

const NOTIF_KEY = "adhan_notif_last";
const PERM_KEY = "adhan_notif_asked";

interface PrayerTime {
  name: string;
  hour: number;
  minute: number;
}

function getPrayerTimes(today: DayPrayerTimes): PrayerTime[] {
  const parse = (time: string, name: string, pmDefault = false): PrayerTime => {
    const [h, m] = time.split(":").map(Number);
    return { name, hour: pmDefault && h < 12 ? h + 12 : h, minute: m };
  };

  return [
    parse(today.fajr, "الفجر"),
    parse(today.dhuhr, "الظهر", true),
    parse(today.maghrib, "المغرب", true),
  ];
}

function sendNotification(title: string, body: string) {
  if (Notification.permission !== "granted") return;
  
  const key = `${title}-${body}`;
  const last = localStorage.getItem(NOTIF_KEY);
  const now = Date.now();
  
  // Don't repeat within 2 minutes
  if (last) {
    const [lastKey, lastTime] = last.split("|");
    if (lastKey === key && now - parseInt(lastTime) < 120000) return;
  }
  
  localStorage.setItem(NOTIF_KEY, `${key}|${now}`);
  
  try {
    new Notification(title, {
      body,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
    });
  } catch {
    // Silent fail for unsupported environments
  }
}

export function useNotifications(timings: DayPrayerTimes[]) {
  const asked = useRef(false);

  // Request permission once
  useEffect(() => {
    if (asked.current) return;
    if (!("Notification" in window)) return;
    
    const alreadyAsked = localStorage.getItem(PERM_KEY);
    if (Notification.permission === "granted") {
      localStorage.setItem(PERM_KEY, "true");
      asked.current = true;
      return;
    }
    if (Notification.permission === "denied" || alreadyAsked === "true") {
      asked.current = true;
      return;
    }

    // Delay permission request slightly so page loads first
    const timer = setTimeout(() => {
      Notification.requestPermission().then((perm) => {
        localStorage.setItem(PERM_KEY, "true");
        asked.current = true;
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Check prayer times every 30 seconds
  useEffect(() => {
    if (!("Notification" in window) || Notification.permission !== "granted") return;

    const check = () => {
      const now = new Date();
      const monthDay = `${now.getMonth() + 1}/${now.getDate()}`;
      const today = timings.find((t) => {
        const [m, d] = t.gregorianDate.split("/");
        return `${parseInt(m)}/${parseInt(d)}` === monthDay;
      });

      if (!today) return;

      const prayers = getPrayerTimes(today);
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      for (const prayer of prayers) {
        const prayerMinutes = prayer.hour * 60 + prayer.minute;
        const diff = prayerMinutes - nowMinutes;

        if (diff === 5) {
          sendNotification(
            "🕌 تنبيه الأذان",
            `باقي ٥ دقائق على أذان ${prayer.name}`
          );
        } else if (diff === 0) {
          sendNotification(
            "🕌 حان وقت الأذان",
            `حان الآن وقت أذان ${prayer.name}`
          );
        }
      }
    };

    const interval = setInterval(check, 30000);
    check();
    return () => clearInterval(interval);
  }, [timings]);
}
