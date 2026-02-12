import { DayPrayerTimes } from "./prayerData";
import { sunniBaseTimes } from "./sunniPrayerData";

export interface SunniRegion {
  id: string;
  name: string;
  offsets: {
    fajr: number;
    sunrise: number;
    dhuhr: number;
    maghrib: number;
  };
}

export interface SunniGovernorate {
  id: string;
  name: string;
  regions: SunniRegion[];
}

/**
 * Sunni Waqf governorates and regions
 * Offsets are in minutes relative to Erbil base times
 * Baghdad is listed first, then alphabetical Arabic order
 */
export const sunniGovernorates: SunniGovernorate[] = [
  {
    id: "baghdad",
    name: "بغداد",
    regions: [
      { id: "baghdad-center", name: "مركز بغداد", offsets: { fajr: -7, sunrise: -11, dhuhr: -5, maghrib: 0 } },
      { id: "abu-ghraib", name: "ابو غريب", offsets: { fajr: -6, sunrise: -10, dhuhr: -4, maghrib: 1 } },
      { id: "tarmiya", name: "الطارمية", offsets: { fajr: -7, sunrise: -11, dhuhr: -5, maghrib: 0 } },
      { id: "mahmoudiya", name: "المحمودية", offsets: { fajr: -7, sunrise: -11, dhuhr: -5, maghrib: 0 } },
      { id: "madain", name: "المدائن", offsets: { fajr: -8, sunrise: -11, dhuhr: -5, maghrib: -1 } },
    ],
  },
  {
    id: "erbil",
    name: "أربيل",
    regions: [
      { id: "erbil-city", name: "أربيل", offsets: { fajr: 0, sunrise: 0, dhuhr: 0, maghrib: 0 } },
      { id: "soran", name: "سوران", offsets: { fajr: 0, sunrise: 0, dhuhr: 0, maghrib: 0 } },
      { id: "qasri", name: "قصري", offsets: { fajr: -6, sunrise: -9, dhuhr: -4, maghrib: -2 } },
    ],
  },
  {
    id: "anbar",
    name: "الأنبار",
    regions: [
      { id: "baghdadi", name: "البغدادي", offsets: { fajr: -5, sunrise: -8, dhuhr: -2, maghrib: 2 } },
      { id: "khalidiya", name: "الخالدية والحبانية", offsets: { fajr: -6, sunrise: -9, dhuhr: -3, maghrib: 1 } },
      { id: "rahaliya", name: "الرحالية", offsets: { fajr: -3, sunrise: -6, dhuhr: 0, maghrib: 4 } },
      { id: "rutba", name: "الرطبة", offsets: { fajr: 10, sunrise: 7, dhuhr: 13, maghrib: 15 } },
      { id: "ramadi", name: "الرمادي", offsets: { fajr: -4, sunrise: -8, dhuhr: -2, maghrib: 2 } },
      { id: "ubaydi", name: "العبيدي", offsets: { fajr: 8, sunrise: 5, dhuhr: 11, maghrib: 13 } },
      { id: "falluja", name: "الفلوجة", offsets: { fajr: -4, sunrise: -8, dhuhr: -2, maghrib: 2 } },
      { id: "nukhayb", name: "النخيب", offsets: { fajr: 2, sunrise: -1, dhuhr: 5, maghrib: 8 } },
      { id: "haditha", name: "حديثة", offsets: { fajr: 3, sunrise: 0, dhuhr: 6, maghrib: 8 } },
      { id: "rawah", name: "راوه", offsets: { fajr: 6, sunrise: 3, dhuhr: 9, maghrib: 11 } },
      { id: "ameriya", name: "عامرية الصمود", offsets: { fajr: -5, sunrise: -8, dhuhr: -2, maghrib: 1 } },
      { id: "akashat", name: "عكاشات", offsets: { fajr: 13, sunrise: 10, dhuhr: 16, maghrib: 18 } },
      { id: "anah", name: "عنه", offsets: { fajr: 3, sunrise: -1, dhuhr: 5, maghrib: 9 } },
      { id: "kubaysa", name: "كبيسة", offsets: { fajr: 0, sunrise: -5, dhuhr: 2, maghrib: 5 } },
      { id: "turaybil", name: "منفذ طريبيل", offsets: { fajr: 17, sunrise: 14, dhuhr: 20, maghrib: 22 } },
      { id: "heet", name: "هيت", offsets: { fajr: -2, sunrise: -5, dhuhr: 1, maghrib: 4 } },
    ],
  },
  {
    id: "basra",
    name: "البصرة",
    regions: [
      { id: "basra-city", name: "البصرة", offsets: { fajr: -21, sunrise: -27, dhuhr: -18, maghrib: -11 } },
      { id: "faw", name: "الفاو", offsets: { fajr: -23, sunrise: -29, dhuhr: -20, maghrib: -13 } },
      { id: "qurna", name: "القرنة", offsets: { fajr: -20, sunrise: -26, dhuhr: -17, maghrib: -10 } },
    ],
  },
  {
    id: "diwaniyah",
    name: "الديوانية",
    regions: [
      { id: "diwaniyah-city", name: "الديوانية", offsets: { fajr: -8, sunrise: -13, dhuhr: -5, maghrib: 0 } },
      { id: "shamiya", name: "الشامية", offsets: { fajr: -6, sunrise: -11, dhuhr: -3, maghrib: 2 } },
    ],
  },
  {
    id: "sulaymaniyah",
    name: "السليمانية",
    regions: [
      { id: "sulaymaniyah-city", name: "السليمانية", offsets: { fajr: -3, sunrise: -2, dhuhr: -1, maghrib: -2 } },
      { id: "bazian", name: "بازيان", offsets: { fajr: -2, sunrise: -1, dhuhr: 0, maghrib: -1 } },
      { id: "barzinja", name: "برزنجا", offsets: { fajr: -4, sunrise: -3, dhuhr: -2, maghrib: -3 } },
      { id: "penjwin", name: "بنجوين", offsets: { fajr: -6, sunrise: -5, dhuhr: -4, maghrib: -5 } },
      { id: "pirmakron", name: "بيرمكرون", offsets: { fajr: -5, sunrise: -4, dhuhr: -3, maghrib: -4 } },
      { id: "takiya", name: "تكية", offsets: { fajr: -1, sunrise: 0, dhuhr: 0, maghrib: 0 } },
      { id: "chamchamal", name: "جمجمال", offsets: { fajr: -1, sunrise: 0, dhuhr: 0, maghrib: -1 } },
      { id: "jawarta", name: "جوارتا", offsets: { fajr: -2, sunrise: -1, dhuhr: -1, maghrib: -1 } },
      { id: "hajyawa", name: "حاجياوا", offsets: { fajr: -3, sunrise: -2, dhuhr: -1, maghrib: -2 } },
      { id: "halabja-taza", name: "حلبجة تازه", offsets: { fajr: -5, sunrise: -4, dhuhr: -3, maghrib: -4 } },
      { id: "halabja", name: "حلبجة", offsets: { fajr: -5, sunrise: -4, dhuhr: -3, maghrib: -4 } },
      { id: "khalkan", name: "خلكان", offsets: { fajr: -4, sunrise: -3, dhuhr: -2, maghrib: -3 } },
      { id: "darbandikhan", name: "دربندخان", offsets: { fajr: -4, sunrise: -3, dhuhr: -2, maghrib: -3 } },
      { id: "dokan", name: "دوكان", offsets: { fajr: -2, sunrise: -1, dhuhr: -1, maghrib: -1 } },
      { id: "ranya", name: "رانية", offsets: { fajr: -1, sunrise: 0, dhuhr: 0, maghrib: 0 } },
      { id: "said-sadiq", name: "سيد صادق", offsets: { fajr: -3, sunrise: -2, dhuhr: -1, maghrib: -2 } },
      { id: "arbat", name: "عربت", offsets: { fajr: -2, sunrise: -1, dhuhr: -1, maghrib: -1 } },
      { id: "qaradagh", name: "قره داغ", offsets: { fajr: -3, sunrise: -2, dhuhr: -1, maghrib: -2 } },
      { id: "qala-diza", name: "قلعة دزه", offsets: { fajr: -4, sunrise: -3, dhuhr: -2, maghrib: -3 } },
      { id: "kalar", name: "كلار", offsets: { fajr: -5, sunrise: -5, dhuhr: -3, maghrib: -3 } },
      { id: "koya", name: "كويه", offsets: { fajr: 0, sunrise: 0, dhuhr: 0, maghrib: 0 } },
    ],
  },
  {
    id: "muthanna",
    name: "المثنى",
    regions: [
      { id: "samawa", name: "السماوة", offsets: { fajr: -11, sunrise: -16, dhuhr: -8, maghrib: -2 } },
      { id: "basiya", name: "البصية", offsets: { fajr: -14, sunrise: -16, dhuhr: -8, maghrib: -3 } },
      { id: "khidr", name: "الخضر", offsets: { fajr: -12, sunrise: -17, dhuhr: -9, maghrib: -3 } },
      { id: "rumaytha", name: "الرميثة", offsets: { fajr: -10, sunrise: -16, dhuhr: -8, maghrib: -2 } },
      { id: "salman", name: "السلمان", offsets: { fajr: -8, sunrise: -15, dhuhr: -5, maghrib: 3 } },
    ],
  },
  {
    id: "najaf",
    name: "النجف",
    regions: [
      { id: "najaf-city", name: "النجف", offsets: { fajr: -7, sunrise: -12, dhuhr: -4, maghrib: 2 } },
      { id: "hindiya", name: "الهندية (طويريج)", offsets: { fajr: -6, sunrise: -11, dhuhr: -4, maghrib: 1 } },
    ],
  },
  {
    id: "babel",
    name: "بابل",
    regions: [
      { id: "hilla", name: "الحلة", offsets: { fajr: -7, sunrise: -12, dhuhr: -5, maghrib: 1 } },
      { id: "kifl", name: "الكفل", offsets: { fajr: -7, sunrise: -12, dhuhr: -5, maghrib: 1 } },
      { id: "musayyib", name: "المسيب", offsets: { fajr: -7, sunrise: -11, dhuhr: -4, maghrib: 1 } },
      { id: "hashimiya", name: "الهاشمية", offsets: { fajr: -8, sunrise: -13, dhuhr: -6, maghrib: 0 } },
    ],
  },
  {
    id: "duhok",
    name: "دهوك",
    regions: [
      { id: "duhok-city", name: "دهوك", offsets: { fajr: -2, sunrise: 3, dhuhr: 4, maghrib: 4 } },
      { id: "amadiya", name: "العمادية", offsets: { fajr: -4, sunrise: 1, dhuhr: 2, maghrib: 2 } },
      { id: "zakho", name: "زاخو", offsets: { fajr: -1, sunrise: 4, dhuhr: 5, maghrib: 5 } },
      { id: "aqra", name: "عقرة", offsets: { fajr: 0, sunrise: 1, dhuhr: -1, maghrib: 1 } },
    ],
  },
  {
    id: "diyala",
    name: "ديالى",
    regions: [
      { id: "baquba", name: "بعقوبة", offsets: { fajr: -8, sunrise: -11, dhuhr: -6, maghrib: -1 } },
      { id: "khalis", name: "الخالص", offsets: { fajr: -7, sunrise: -11, dhuhr: -5, maghrib: -1 } },
      { id: "azim", name: "العظيم", offsets: { fajr: -7, sunrise: -10, dhuhr: -5, maghrib: -1 } },
      { id: "muqdadiya", name: "المقدادية", offsets: { fajr: -9, sunrise: -13, dhuhr: -7, maghrib: -3 } },
      { id: "jalawla", name: "جلولاء", offsets: { fajr: -10, sunrise: -13, dhuhr: -8, maghrib: -4 } },
      { id: "khanaqin", name: "خانقين", offsets: { fajr: -10, sunrise: -15, dhuhr: -9, maghrib: -4 } },
      { id: "kifri", name: "كفري", offsets: { fajr: -9, sunrise: -13, dhuhr: -7, maghrib: -2 } },
      { id: "mandali", name: "مندلي", offsets: { fajr: -11, sunrise: -16, dhuhr: -9, maghrib: -4 } },
    ],
  },
  {
    id: "dhiqar",
    name: "ذي قار",
    regions: [
      { id: "nasiriya", name: "الناصرية", offsets: { fajr: -15, sunrise: -20, dhuhr: -12, maghrib: -6 } },
      { id: "shatra", name: "الشطرة", offsets: { fajr: -14, sunrise: -19, dhuhr: -12, maghrib: -6 } },
      { id: "suq-shuyukh", name: "سوق الشيوخ", offsets: { fajr: -16, sunrise: -22, dhuhr: -13, maghrib: -6 } },
      { id: "nahiyat-fajr", name: "ناحية الفجر", offsets: { fajr: -13, sunrise: -18, dhuhr: -11, maghrib: -5 } },
    ],
  },
  {
    id: "salahuddin",
    name: "صلاح الدين",
    regions: [
      { id: "tikrit", name: "تكريت", offsets: { fajr: -4, sunrise: -7, dhuhr: -2, maghrib: 2 } },
      { id: "samarra", name: "سامراء", offsets: { fajr: -5, sunrise: -8, dhuhr: -3, maghrib: 2 } },
      { id: "dujail", name: "الدجيل", offsets: { fajr: -6, sunrise: -10, dhuhr: -4, maghrib: 0 } },
      { id: "sharqat", name: "الشرقاط", offsets: { fajr: -2, sunrise: -5, dhuhr: 0, maghrib: 3 } },
      { id: "tuz", name: "الطوز", offsets: { fajr: -7, sunrise: -11, dhuhr: -6, maghrib: -1 } },
      { id: "balad", name: "بلد والضلوعية", offsets: { fajr: -6, sunrise: -9, dhuhr: -4, maghrib: 0 } },
      { id: "baiji", name: "بيجي", offsets: { fajr: -3, sunrise: -6, dhuhr: -1, maghrib: 3 } },
    ],
  },
  {
    id: "karbala",
    name: "كربلاء",
    regions: [
      { id: "karbala-city", name: "كربلاء", offsets: { fajr: -5, sunrise: -10, dhuhr: -3, maghrib: 2 } },
    ],
  },
  {
    id: "kirkuk",
    name: "كركوك",
    regions: [
      { id: "kirkuk-city", name: "كركوك", offsets: { fajr: -2, sunrise: -2, dhuhr: -1, maghrib: -1 } },
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
 */
export function getSunniRegionTimings(
  governorateId: string,
  regionId: string
): DayPrayerTimes[] {
  const gov = sunniGovernorates.find((g) => g.id === governorateId);
  if (!gov) return sunniBaseTimes;

  const region = gov.regions.find((r) => r.id === regionId);
  if (!region) return sunniBaseTimes;

  return sunniBaseTimes.map((day) => ({
    ...day,
    fajr: applyOffset(day.fajr, region.offsets.fajr),
    sunrise: applyOffset(day.sunrise, region.offsets.sunrise),
    imsak: applyOffset(day.imsak, region.offsets.fajr),
    dhuhr: applyOffset(day.dhuhr, region.offsets.dhuhr),
    maghrib: applyOffset(day.maghrib, region.offsets.maghrib),
  }));
}
