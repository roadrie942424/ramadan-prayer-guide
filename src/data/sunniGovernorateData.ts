import { DayPrayerTimes } from "./prayerData";
import { sunniBaseTimes } from "./sunniPrayerData";

// 1. تحديث الواجهة لتقبل قيمتين (بداية الشهر ونهايته)
export interface SunniRegion {
  id: string;
  name: string;
  offsets: {
    fajr: [number, number];    // [Day 1 Offset, Day 30 Offset]
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
 * دالة حسابية لاستخراج الفارق الدقيق لليوم المحدد
 * تقوم بتوزيع الفارق تدريجياً بين أول الشهر وآخره
 */
function getInterpolatedOffset(range: [number, number], dayIndex: number, totalDays: number = 30): number {
  const [start, end] = range;
  // معادلة خطية لحساب الفارق بناءً على ترتيب اليوم
  return Math.round(start + (dayIndex / (totalDays - 1)) * (end - start));
}

/**
 * Sunni Waqf governorates and regions
 * تم تحديث بيانات (أربيل، الأنبار) بدقة من ملفات PDF 2026
 * المناطق الأخرى تم تحويلها لصيغة المصفوفة مؤقتاً لحين توفر بياناتها
 */
export const sunniGovernorates: SunniGovernorate[] = [
  {
    id: "baghdad",
    name: "بغداد",
    regions: [
      // قيم تقديرية مؤقتة (محولة من الكود القديم) لحين رفع صورة بغداد
      { id: "baghdad-center", name: "مركز بغداد", offsets: { fajr: [-7, -7], sunrise: [-11, -11], dhuhr: [-5, -5], maghrib: [0, 0] } },
      { id: "abu-ghraib", name: "ابو غريب", offsets: { fajr: [-6, -6], sunrise: [-10, -10], dhuhr: [-4, -4], maghrib: [1, 1] } },
      { id: "tarmiya", name: "الطارمية", offsets: { fajr: [-7, -7], sunrise: [-11, -11], dhuhr: [-5, -5], maghrib: [0, 0] } },
      { id: "mahmoudiya", name: "المحمودية", offsets: { fajr: [-7, -7], sunrise: [-11, -11], dhuhr: [-5, -5], maghrib: [0, 0] } },
      { id: "madain", name: "المدائن", offsets: { fajr: [-8, -8], sunrise: [-11, -11], dhuhr: [-5, -5], maghrib: [-1, -1] } },
    ],
  },
  {
    id: "erbil",
    name: "أربيل",
    regions: [
      // تم التحقق: أربيل هي الأساس (المرجع) في الملفات
      { id: "erbil-city", name: "أربيل", offsets: { fajr: [0, 0], sunrise: [0, 0], dhuhr: [0, 0], maghrib: [0, 0] } },
      // تم التحقق: سوران (من PDF)
      { id: "soran", name: "سوران", offsets: { fajr: [-3, -3], sunrise: [-3, -3], dhuhr: [-2, -2], maghrib: [-1, -2] } },
      // تم التحقق: قصري (من PDF)
      { id: "qasri", name: "قصري", offsets: { fajr: [-4, -6], sunrise: [-4, -5], dhuhr: [-3, -3], maghrib: [-2, -3] } },
    ],
  },
  {
    id: "anbar",
    name: "الأنبار",
    regions: [
      // تم التحقق: البغدادي (من PDF)
      { id: "baghdadi", name: "البغدادي", offsets: { fajr: [12, 14], sunrise: [12, 13], dhuhr: [13, 13], maghrib: [9, 11] } },
      // تم التحقق: الخالدية (من PDF)
      { id: "khalidiya", name: "الخالدية والحبانية", offsets: { fajr: [7, 9], sunrise: [7, 8], dhuhr: [8, 8], maghrib: [5, 7] } },
      // تم التحقق: الرطبة (من PDF - فرق شاسع)
      { id: "rutba", name: "الرطبة", offsets: { fajr: [22, 25], sunrise: [22, 24], dhuhr: [23, 24], maghrib: [18, 21] } },
      // تم التحقق: الرمادي (من PDF)
      { id: "ramadi", name: "الرمادي", offsets: { fajr: [8, 10], sunrise: [5, 7], dhuhr: [10, 10], maghrib: [6, 8] } },
      
      // المناطق التالية تقديرية (تم تحويلها للمصفوفة) لحين توفر صورها
      { id: "rahaliya", name: "الرحالية", offsets: { fajr: [9, 11], sunrise: [7, 9], dhuhr: [12, 12], maghrib: [8, 10] } },
      { id: "ubaydi", name: "العبيدي", offsets: { fajr: [20, 20], sunrise: [20, 20], dhuhr: [21, 21], maghrib: [16, 16] } }, // تحتاج تدقيق
      { id: "falluja", name: "الفلوجة", offsets: { fajr: [6, 8], sunrise: [3, 5], dhuhr: [8, 8], maghrib: [4, 6] } },
      { id: "nukhayb", name: "النخيب", offsets: { fajr: [12, 12], sunrise: [10, 10], dhuhr: [15, 15], maghrib: [12, 12] } },
      { id: "haditha", name: "حديثة", offsets: { fajr: [13, 13], sunrise: [12, 12], dhuhr: [16, 16], maghrib: [12, 12] } },
      { id: "rawah", name: "راوه", offsets: { fajr: [16, 16], sunrise: [15, 15], dhuhr: [19, 19], maghrib: [15, 15] } },
      { id: "ameriya", name: "عامرية الصمود", offsets: { fajr: [7, 9], sunrise: [4, 6], dhuhr: [8, 8], maghrib: [5, 7] } },
      { id: "akashat", name: "عكاشات", offsets: { fajr: [25, 25], sunrise: [25, 25], dhuhr: [26, 26], maghrib: [21, 21] } },
      { id: "anah", name: "عنه", offsets: { fajr: [13, 13], sunrise: [11, 11], dhuhr: [15, 15], maghrib: [13, 13] } },
      { id: "kubaysa", name: "كبيسة", offsets: { fajr: [10, 10], sunrise: [7, 7], dhuhr: [12, 12], maghrib: [9, 9] } },
      { id: "turaybil", name: "منفذ طريبيل", offsets: { fajr: [29, 29], sunrise: [29, 29], dhuhr: [30, 30], maghrib: [25, 25] } },
      { id: "heet", name: "هيت", offsets: { fajr: [10, 10], sunrise: [7, 7], dhuhr: [11, 11], maghrib: [8, 8] } },
    ],
  },
  {
    id: "basra",
    name: "البصرة",
    regions: [
      { id: "basra-city", name: "البصرة", offsets: { fajr: [-21, -21], sunrise: [-27, -27], dhuhr: [-18, -18], maghrib: [-11, -11] } },
      { id: "faw", name: "الفاو", offsets: { fajr: [-23, -23], sunrise: [-29, -29], dhuhr: [-20, -20], maghrib: [-13, -13] } },
      { id: "qurna", name: "القرنة", offsets: { fajr: [-20, -20], sunrise: [-26, -26], dhuhr: [-17, -17], maghrib: [-10, -10] } },
    ],
  },
  {
    id: "diwaniyah",
    name: "الديوانية",
    regions: [
      { id: "diwaniyah-city", name: "الديوانية", offsets: { fajr: [-8, -8], sunrise: [-13, -13], dhuhr: [-5, -5], maghrib: [0, 0] } },
      { id: "shamiya", name: "الشامية", offsets: { fajr: [-6, -6], sunrise: [-11, -11], dhuhr: [-3, -3], maghrib: [2, 2] } },
    ],
  },
  {
    id: "sulaymaniyah",
    name: "السليمانية",
    regions: [
      { id: "sulaymaniyah-city", name: "السليمانية", offsets: { fajr: [-3, -3], sunrise: [-2, -2], dhuhr: [-1, -1], maghrib: [-2, -2] } },
      { id: "bazian", name: "بازيان", offsets: { fajr: [-2, -2], sunrise: [-1, -1], dhuhr: [0, 0], maghrib: [-1, -1] } },
      { id: "barzinja", name: "برزنجا", offsets: { fajr: [-4, -4], sunrise: [-3, -3], dhuhr: [-2, -2], maghrib: [-3, -3] } },
      { id: "penjwin", name: "بنجوين", offsets: { fajr: [-6, -6], sunrise: [-5, -5], dhuhr: [-4, -4], maghrib: [-5, -5] } },
      { id: "pirmakron", name: "بيرمكرون", offsets: { fajr: [-5, -5], sunrise: [-4, -4], dhuhr: [-3, -3], maghrib: [-4, -4] } },
      { id: "takiya", name: "تكية", offsets: { fajr: [-1, -1], sunrise: [0, 0], dhuhr: [0, 0], maghrib: [0, 0] } },
      { id: "chamchamal", name: "جمجمال", offsets: { fajr: [-1, -1], sunrise: [0, 0], dhuhr: [0, 0], maghrib: [-1, -1] } },
      { id: "jawarta", name: "جوارتا", offsets: { fajr: [-2, -2], sunrise: [-1, -1], dhuhr: [-1, -1], maghrib: [-1, -1] } },
      { id: "hajyawa", name: "حاجياوا", offsets: { fajr: [-3, -3], sunrise: [-2, -2], dhuhr: [-1, -1], maghrib: [-2, -2] } },
      { id: "halabja-taza", name: "حلبجة تازه", offsets: { fajr: [-5, -5], sunrise: [-4, -4], dhuhr: [-3, -3], maghrib: [-4, -4] } },
      { id: "halabja", name: "حلبجة", offsets: { fajr: [-5, -5], sunrise: [-4, -4], dhuhr: [-3, -3], maghrib: [-4, -4] } },
      { id: "khalkan", name: "خلكان", offsets: { fajr: [-4, -4], sunrise: [-3, -3], dhuhr: [-2, -2], maghrib: [-3, -3] } },
      { id: "darbandikhan", name: "دربندخان", offsets: { fajr: [-4, -4], sunrise: [-3, -3], dhuhr: [-2, -2], maghrib: [-3, -3] } },
      { id: "dokan", name: "دوكان", offsets: { fajr: [-2, -2], sunrise: [-1, -1], dhuhr: [-1, -1], maghrib: [-1, -1] } },
      { id: "ranya", name: "رانية", offsets: { fajr: [-1, -1], sunrise: [0, 0], dhuhr: [0, 0], maghrib: [0, 0] } },
      { id: "said-sadiq", name: "سيد صادق", offsets: { fajr: [-3, -3], sunrise: [-2, -2], dhuhr: [-1, -1], maghrib: [-2, -2] } },
      { id: "arbat", name: "عربت", offsets: { fajr: [-2, -2], sunrise: [-1, -1], dhuhr: [-1, -1], maghrib: [-1, -1] } },
      { id: "qaradagh", name: "قره داغ", offsets: { fajr: [-3, -3], sunrise: [-2, -2], dhuhr: [-1, -1], maghrib: [-2, -2] } },
      { id: "qala-diza", name: "قلعة دزه", offsets: { fajr: [-4, -4], sunrise: [-3, -3], dhuhr: [-2, -2], maghrib: [-3, -3] } },
      { id: "kalar", name: "كلار", offsets: { fajr: [-5, -5], sunrise: [-5, -5], dhuhr: [-3, -3], maghrib: [-3, -3] } },
      { id: "koya", name: "كويه", offsets: { fajr: [0, 0], sunrise: [0, 0], dhuhr: [0, 0], maghrib: [0, 0] } },
    ],
  },
  {
    id: "muthanna",
    name: "المثنى",
    regions: [
      { id: "samawa", name: "السماوة", offsets: { fajr: [-11, -11], sunrise: [-16, -16], dhuhr: [-8, -8], maghrib: [-2, -2] } },
      { id: "basiya", name: "البصية", offsets: { fajr: [-14, -14], sunrise: [-16, -16], dhuhr: [-8, -8], maghrib: [-3, -3] } },
      { id: "khidr", name: "الخضر", offsets: { fajr: [-12, -12], sunrise: [-17, -17], dhuhr: [-9, -9], maghrib: [-3, -3] } },
      { id: "rumaytha", name: "الرميثة", offsets: { fajr: [-10, -10], sunrise: [-16, -16], dhuhr: [-8, -8], maghrib: [-2, -2] } },
      { id: "salman", name: "السلمان", offsets: { fajr: [-8, -8], sunrise: [-15, -15], dhuhr: [-5, -5], maghrib: [3, 3] } },
    ],
  },
  {
    id: "najaf",
    name: "النجف",
    regions: [
      { id: "najaf-city", name: "النجف", offsets: { fajr: [-7, -7], sunrise: [-12, -12], dhuhr: [-4, -4], maghrib: [2, 2] } },
      { id: "hindiya", name: "الهندية (طويريج)", offsets: { fajr: [-6, -6], sunrise: [-11, -11], dhuhr: [-4, -4], maghrib: [1, 1] } },
    ],
  },
  {
    id: "babel",
    name: "بابل",
    regions: [
      { id: "hilla", name: "الحلة", offsets: { fajr: [-7, -7], sunrise: [-12, -12], dhuhr: [-5, -5], maghrib: [1, 1] } },
      { id: "kifl", name: "الكفل", offsets: { fajr: [-7, -7], sunrise: [-12, -12], dhuhr: [-5, -5], maghrib: [1, 1] } },
      { id: "musayyib", name: "المسيب", offsets: { fajr: [-7, -7], sunrise: [-11, -11], dhuhr: [-4, -4], maghrib: [1, 1] } },
      { id: "hashimiya", name: "الهاشمية", offsets: { fajr: [-8, -8], sunrise: [-13, -13], dhuhr: [-6, -6], maghrib: [0, 0] } },
    ],
  },
  {
    id: "duhok",
    name: "دهوك",
    regions: [
      { id: "duhok-city", name: "دهوك", offsets: { fajr: [-2, -2], sunrise: [3, 3], dhuhr: [4, 4], maghrib: [4, 4] } },
      { id: "amadiya", name: "العمادية", offsets: { fajr: [-4, -4], sunrise: [1, 1], dhuhr: [2, 2], maghrib: [2, 2] } },
      { id: "zakho", name: "زاخو", offsets: { fajr: [-1, -1], sunrise: [4, 4], dhuhr: [5, 5], maghrib: [5, 5] } },
      { id: "aqra", name: "عقرة", offsets: { fajr: [0, 0], sunrise: [1, 1], dhuhr: [-1, -1], maghrib: [1, 1] } },
    ],
  },
  {
    id: "diyala",
    name: "ديالى",
    regions: [
      { id: "baquba", name: "بعقوبة", offsets: { fajr: [-8, -8], sunrise: [-11, -11], dhuhr: [-6, -6], maghrib: [-1, -1] } },
      { id: "khalis", name: "الخالص", offsets: { fajr: [-7, -7], sunrise: [-11, -11], dhuhr: [-5, -5], maghrib: [-1, -1] } },
      { id: "azim", name: "العظيم", offsets: { fajr: [-7, -7], sunrise: [-10, -10], dhuhr: [-5, -5], maghrib: [-1, -1] } },
      { id: "muqdadiya", name: "المقدادية", offsets: { fajr: [-9, -9], sunrise: [-13, -13], dhuhr: [-7, -7], maghrib: [-3, -3] } },
      { id: "jalawla", name: "جلولاء", offsets: { fajr: [-10, -10], sunrise: [-13, -13], dhuhr: [-8, -8], maghrib: [-4, -4] } },
      { id: "khanaqin", name: "خانقين", offsets: { fajr: [-10, -10], sunrise: [-15, -15], dhuhr: [-9, -9], maghrib: [-4, -4] } },
      { id: "kifri", name: "كفري", offsets: { fajr: [-9, -9], sunrise: [-13, -13], dhuhr: [-7, -7], maghrib: [-2, -2] } },
      { id: "mandali", name: "مندلي", offsets: { fajr: [-11, -11], sunrise: [-16, -16], dhuhr: [-9, -9], maghrib: [-4, -4] } },
    ],
  },
  {
    id: "dhiqar",
    name: "ذي قار",
    regions: [
      { id: "nasiriya", name: "الناصرية", offsets: { fajr: [-15, -15], sunrise: [-20, -20], dhuhr: [-12, -12], maghrib: [-6, -6] } },
      { id: "shatra", name: "الشطرة", offsets: { fajr: [-14, -14], sunrise: [-19, -19], dhuhr: [-12, -12], maghrib: [-6, -6] } },
      { id: "suq-shuyukh", name: "سوق الشيوخ", offsets: { fajr: [-16, -16], sunrise: [-22, -22], dhuhr: [-13, -13], maghrib: [-6, -6] } },
      { id: "nahiyat-fajr", name: "ناحية الفجر", offsets: { fajr: [-13, -13], sunrise: [-18, -18], dhuhr: [-11, -11], maghrib: [-5, -5] } },
    ],
  },
  {
    id: "salahuddin",
    name: "صلاح الدين",
    regions: [
      { id: "tikrit", name: "تكريت", offsets: { fajr: [-4, -4], sunrise: [-7, -7], dhuhr: [-2, -2], maghrib: [2, 2] } },
      { id: "samarra", name: "سامراء", offsets: { fajr: [-5, -5], sunrise: [-8, -8], dhuhr: [-3, -3], maghrib: [2, 2] } },
      { id: "dujail", name: "الدجيل", offsets: { fajr: [-6, -6], sunrise: [-10, -10], dhuhr: [-4, -4], maghrib: [0, 0] } },
      { id: "sharqat", name: "الشرقاط", offsets: { fajr: [-2, -2], sunrise: [-5, -5], dhuhr: [0, 0], maghrib: [3, 3] } },
      { id: "tuz", name: "الطوز", offsets: { fajr: [-7, -7], sunrise: [-11, -11], dhuhr: [-6, -6], maghrib: [-1, -1] } },
      { id: "balad", name: "بلد والضلوعية", offsets: { fajr: [-6, -6], sunrise: [-9, -9], dhuhr: [-4, -4], maghrib: [0, 0] } },
      { id: "baiji", name: "بيجي", offsets: { fajr: [-3, -3], sunrise: [-6, -6], dhuhr: [-1, -1], maghrib: [3, 3] } },
    ],
  },
  {
    id: "karbala",
    name: "كربلاء",
    regions: [
      { id: "karbala-city", name: "كربلاء", offsets: { fajr: [-5, -5], sunrise: [-10, -10], dhuhr: [-3, -3], maghrib: [2, 2] } },
    ],
  },
  {
    id: "kirkuk",
    name: "كركوك",
    regions: [
      { id: "kirkuk-city", name: "كركوك", offsets: { fajr: [-2, -2], sunrise: [-2, -2], dhuhr: [-1, -1], maghrib: [-1, -1] } },
    ],
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
 * Get prayer timings for a specific Sunni region
 * Now supports interpolated offsets per day
 */
export function getSunniRegionTimings(
  governorateId: string,
  regionId: string
): DayPrayerTimes[] {
  const gov = sunniGovernorates.find((g) => g.id === governorateId);
  if (!gov) return sunniBaseTimes;

  const region = gov.regions.find((r) => r.id === regionId);
  if (!region) return sunniBaseTimes;

  return sunniBaseTimes.map((day, index) => {
    // حساب الفارق الزمني الخاص بهذا اليوم بالتحديد (من 0 إلى 29)
    const fajrOffset = getInterpolatedOffset(region.offsets.fajr, index);
    const sunriseOffset = getInterpolatedOffset(region.offsets.sunrise, index);
    const dhuhrOffset = getInterpolatedOffset(region.offsets.dhuhr, index);
    const maghribOffset = getInterpolatedOffset(region.offsets.maghrib, index);
    
    // الإمساك يتبع الفجر بنفس الفارق
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