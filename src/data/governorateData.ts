import { DayPrayerTimes, prayerTimings } from "./prayerData";

export interface Governorate {
  id: string;
  name: string;
  // Offsets in minutes from Al Rashid base times
  // [day1Offset, day30Offset] - linearly interpolated for days in between
  offsets: {
    fajr: [number, number];
    sunrise: [number, number];
    dhuhr: [number, number];
    maghrib: [number, number];
  };
}

export const governorates: Governorate[] = [
  {
    id: "al-rashid",
    name: "الرشيد",
    offsets: { fajr: [0, 0], sunrise: [0, 0], dhuhr: [0, 0], maghrib: [0, 0] },
  },
  {
    id: "baghdad",
    name: "بغداد",
    offsets: { fajr: [-1, 0], sunrise: [-1, -1], dhuhr: [0, 0], maghrib: [0, 0] },
  },
  {
    id: "erbil",
    name: "اربيل",
    offsets: { fajr: [1, -1], sunrise: [4, 1], dhuhr: [2, 1], maghrib: [-1, 1] },
  },
  {
    id: "anbar",
    name: "الأنبار",
    offsets: { fajr: [20, 21], sunrise: [19, 20], dhuhr: [21, 21], maghrib: [21, 20] },
  },
  {
    id: "basra",
    name: "البصرة",
    offsets: { fajr: [-15, -11], sunrise: [-17, -14], dhuhr: [-13, -14], maghrib: [-11, -14] },
  },
  {
    id: "diwaniyah",
    name: "الديوانية",
    offsets: { fajr: [-3, -2], sunrise: [-4, -3], dhuhr: [-2, -2], maghrib: [0, -2] },
  },
  {
    id: "samawah",
    name: "السماوة",
    offsets: { fajr: [-5, -4], sunrise: [-6, -5], dhuhr: [-3, -3], maghrib: [-2, -4] },
  },
  {
    id: "amarah",
    name: "العمارة",
    offsets: { fajr: [-9, -7], sunrise: [-10, -9], dhuhr: [-8, -8], maghrib: [-7, -8] },
  },
  {
    id: "kut",
    name: "الكوت",
    offsets: { fajr: [-6, -5], sunrise: [-7, -6], dhuhr: [-5, -5], maghrib: [-5, -6] },
  },
  {
    id: "mosul",
    name: "الموصل",
    offsets: { fajr: [5, 2], sunrise: [8, 5], dhuhr: [6, 5], maghrib: [3, 6] },
  },
  {
    id: "nasiriyah",
    name: "الناصرية",
    offsets: { fajr: [-9, -7], sunrise: [-11, -9], dhuhr: [-7, -7], maghrib: [-5, -8] },
  },
  {
    id: "najaf",
    name: "النجف الأشرف",
    offsets: { fajr: [0, 0], sunrise: [-2, -1], dhuhr: [1, 0], maghrib: [2, 0] },
  },
  {
    id: "babel",
    name: "بابل",
    offsets: { fajr: [-1, -1], sunrise: [-2, -1], dhuhr: [-1, 0], maghrib: [0, -1] },
  },
  {
    id: "diyala",
    name: "ديالى",
    offsets: { fajr: [-6, -6], sunrise: [-5, -5], dhuhr: [-5, -5], maghrib: [-6, -6] },
  },
  {
    id: "dhi-qar",
    name: "ذي قار",
    offsets: { fajr: [-7, -6], sunrise: [-9, -8], dhuhr: [-6, -6], maghrib: [-4, -6] },
  },
  {
    id: "salah-ad-din",
    name: "صلاح الدين",
    offsets: { fajr: [3, 2], sunrise: [4, 3], dhuhr: [3, 3], maghrib: [2, 1] },
  },
  {
    id: "karbala",
    name: "كربلاء المقدسة",
    offsets: { fajr: [1, 2], sunrise: [0, 1], dhuhr: [1, 1], maghrib: [2, 1] },
  },
  {
    id: "kirkuk",
    name: "كركوك",
    offsets: { fajr: [3, 1], sunrise: [5, 3], dhuhr: [4, 3], maghrib: [2, 2] },
  },
];

/**
 * Apply a minute offset to a time string like "5:20" or "12:16"
 */
function applyOffset(time: string, offsetMinutes: number): string {
  const [h, m] = time.split(":").map(Number);
  let totalMinutes = h * 60 + m + offsetMinutes;
  if (totalMinutes < 0) totalMinutes += 24 * 60;
  const newH = Math.floor(totalMinutes / 60) % 24;
  const newM = totalMinutes % 60;
  return `${newH}:${newM.toString().padStart(2, "0")}`;
}

/**
 * Get interpolated offset for a specific day (1-30)
 */
function getOffset(offsets: [number, number], day: number): number {
  const [start, end] = offsets;
  return Math.round(start + ((day - 1) / 29) * (end - start));
}

/**
 * Get prayer timings for a specific governorate
 */
export function getGovernorateTimings(governorateId: string): DayPrayerTimes[] {
  const gov = governorates.find((g) => g.id === governorateId);
  if (!gov) return prayerTimings;

  // Al Rashid is the base - no offset needed
  if (gov.id === "al-rashid") return prayerTimings;

  return prayerTimings.map((day) => {
    const fajrOffset = getOffset(gov.offsets.fajr, day.day);
    const sunriseOffset = getOffset(gov.offsets.sunrise, day.day);
    const dhuhrOffset = getOffset(gov.offsets.dhuhr, day.day);
    const maghribOffset = getOffset(gov.offsets.maghrib, day.day);
    // imsak is always fajr - 10 min, so same offset applies
    const imsakOffset = fajrOffset;

    return {
      ...day,
      fajr: applyOffset(day.fajr, fajrOffset),
      sunrise: applyOffset(day.sunrise, sunriseOffset),
      imsak: applyOffset(day.imsak, imsakOffset),
      dhuhr: applyOffset(day.dhuhr, dhuhrOffset),
      maghrib: applyOffset(day.maghrib, maghribOffset),
    };
  });
}
