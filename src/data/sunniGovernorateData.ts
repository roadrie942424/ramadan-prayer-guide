import { DayPrayerTimes } from "./prayerData";
import { sunniBaseTimes } from "./sunniPrayerData";

export interface SunniRegion {
  id: string;
  name: string;
  offsets: {
    fajr: [number, number];    // [بداية الشهر, نهاية الشهر]
    sunrise: [number, number];
    dhuhr: [number, number];
    maghrib: [number, number];
  };
}

export interface SunniGovernorate {
  id: string;
  name: string;
  regions: SunniRegion[];
}

/**
 * دالة حساب الفارق التدريجي لليوم المحدد
 */
function getInterpolatedOffset(range: [number, number], dayIndex: number, totalDays: number = 30): number {
  const [start, end] = range;
  return Math.round(start + (dayIndex / (totalDays - 1)) * (end - start));
}

export const sunniGovernorates: SunniGovernorate[] = [
  {
    id: "baghdad",
    name: "بغداد",
    regions: [
      // بغداد (تقديري مقارنة بأربيل لعدم وجودها في الملف المرسل)
      { id: "baghdad-center", name: "مركز بغداد", offsets: { fajr: [4, 5], sunrise: [-3, -2], dhuhr: [4, 4], maghrib: [4, 3] } },
      { id: "abu-ghraib", name: "ابو غريب", offsets: { fajr: [5, 6], sunrise: [-2, -1], dhuhr: [5, 5], maghrib: [5, 4] } },
      { id: "tarmiya", name: "الطارمية", offsets: { fajr: [4, 5], sunrise: [-3, -2], dhuhr: [4, 4], maghrib: [4, 3] } },
      { id: "mahmoudiya", name: "المحمودية", offsets: { fajr: [4, 5], sunrise: [-3, -2], dhuhr: [4, 4], maghrib: [4, 3] } },
      { id: "madain", name: "المدائن", offsets: { fajr: [3, 4], sunrise: [-4, -3], dhuhr: [4, 4], maghrib: [3, 2] } },
    ],
  },
  {
    id: "erbil",
    name: "أربيل",
    regions: [
      { id: "erbil-city", name: "أربيل", offsets: { fajr: [0, 0], sunrise: [0, 0], dhuhr: [0, 0], maghrib: [0, 0] } },
      // بيانات دقيقة من ص4 في الملف
      { id: "soran", name: "سوران", offsets: { fajr: [-3, -3], sunrise: [-3, -3], dhuhr: [-2, -2], maghrib: [-1, -2] } },
      // بيانات دقيقة من ص5 في الملف
      { id: "qasri", name: "قصري", offsets: { fajr: [-4, -6], sunrise: [-4, -5], dhuhr: [-3, -3], maghrib: [-2, -3] } },
    ],
  },
  {
    id: "anbar",
    name: "الأنبار",
    regions: [
      // تم التصحيح بناءً على الصفحات 6-20 من الملف
      { id: "baghdadi", name: "البغدادي", offsets: { fajr: [12, 14], sunrise: [12, 13], dhuhr: [13, 13], maghrib: [9, 11] } },
      { id: "khalidiya", name: "الخالدية والحبانية", offsets: { fajr: [7, 9], sunrise: [7, 8], dhuhr: [8, 8], maghrib: [5, 7] } },
      { id: "rahaliya", name: "الرحالية", offsets: { fajr: [9, 11], sunrise: [7, 9], dhuhr: [12, 12], maghrib: [8, 10] } },
      { id: "rutba", name: "الرطبة", offsets: { fajr: [22, 25], sunrise: [22, 24], dhuhr: [23, 24], maghrib: [18, 21] } },
      { id: "ramadi", name: "الرمادي", offsets: { fajr: [8, 10], sunrise: [5, 7], dhuhr: [10, 10], maghrib: [6, 8] } },
      { id: "ubaydi", name: "العبيدي (القائم)", offsets: { fajr: [20, 20], sunrise: [20, 20], dhuhr: [21, 22], maghrib: [16, 16] } },
      { id: "falluja", name: "الفلوجة", offsets: { fajr: [6, 8], sunrise: [3, 5], dhuhr: [8, 8], maghrib: [4, 6] } },
      { id: "nukhayb", name: "النخيب", offsets: { fajr: [12, 12], sunrise: [10, 10], dhuhr: [15, 15], maghrib: [12, 12] } },
      { id: "haditha", name: "حديثة", offsets: { fajr: [13, 13], sunrise: [12, 14], dhuhr: [16, 16], maghrib: [12, 14] } },
      { id: "rawah", name: "راوه", offsets: { fajr: [16, 16], sunrise: [15, 17], dhuhr: [19, 19], maghrib: [15, 15] } },
      { id: "ameriya", name: "عامرية الصمود", offsets: { fajr: [7, 9], sunrise: [4, 6], dhuhr: [8, 8], maghrib: [5, 7] } },
      { id: "akashat", name: "عكاشات", offsets: { fajr: [25, 25], sunrise: [25, 25], dhuhr: [26, 27], maghrib: [21, 21] } },
      { id: "anah", name: "عنه", offsets: { fajr: [13, 13], sunrise: [11, 13], dhuhr: [15, 15], maghrib: [13, 13] } },
      { id: "kubaysa", name: "كبيسة", offsets: { fajr: [10, 10], sunrise: [7, 7], dhuhr: [12, 12], maghrib: [9, 9] } },
      { id: "turaybil", name: "منفذ طريبيل", offsets: { fajr: [29, 29], sunrise: [29, 29], dhuhr: [30, 31], maghrib: [25, 28] } },
      { id: "heet", name: "هيت", offsets: { fajr: [10, 10], sunrise: [7, 7], dhuhr: [11, 11], maghrib: [8, 10] } },
    ],
  },
  // بقية المحافظات تم وضعها كـ [ثابت, ثابت] لحين توفر ملفاتها الرسمية
  {
    id: "basra",
    name: "البصرة",
    regions: [
      { id: "basra-city", name: "البصرة", offsets: { fajr: [-21, -21], sunrise: [-27, -27], dhuhr: [-18, -18], maghrib: [-11, -11] } },
    ],
  },
  // ... يمكنك إضافة باقي المحافظات بنفس النمط
];

function applyOffset(time: string, offsetMinutes: number): string {
  const [h, m] = time.split(":").map(Number);
  let totalMinutes = h * 60 + m + offsetMinutes;
  if (totalMinutes < 0) totalMinutes += 24 * 60;
  const newH = Math.floor(totalMinutes / 60) % 24;
  const newM = totalMinutes % 60;
  return `${newH}:${newM.toString().padStart(2, "0")}`;
}

export function getSunniRegionTimings(governorateId: string, regionId: string): DayPrayerTimes[] {
  const gov = sunniGovernorates.find((g) => g.id === governorateId);
  if (!gov) return sunniBaseTimes;

  const region = gov.regions.find((r) => r.id === regionId);
  if (!region) return sunniBaseTimes;

  return sunniBaseTimes.map((day, index) => {
    // حساب الفارق لليوم الحالي من الشهر (index)
    const fOffset = getInterpolatedOffset(region.offsets.fajr, index);
    const sOffset = getInterpolatedOffset(region.offsets.sunrise, index);
    const dOffset = getInterpolatedOffset(region.offsets.dhuhr, index);
    const mOffset = getInterpolatedOffset(region.offsets.maghrib, index);

    return {
      ...day,
      fajr: applyOffset(day.fajr, fOffset),
      sunrise: applyOffset(day.sunrise, sOffset),
      imsak: applyOffset(day.imsak, fOffset), // الإمساك يتبع الفجر
      dhuhr: applyOffset(day.dhuhr, dOffset),
      maghrib: applyOffset(day.maghrib, mOffset),
    };
  });
}