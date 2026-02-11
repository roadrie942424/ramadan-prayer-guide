import { DayPrayerTimes, prayerTimings } from "./prayerData";

/**
 * Sunni Waqf base prayer times - Erbil reference point
 * Extracted from SONA1.pdf (Sunni Endowment Ramadan 1446 Hijri)
 * All other Sunni regions use offsets from these base times
 */
export const sunniBaseTimes: DayPrayerTimes[] = [
  { day: 1, dayNameAr: "الخميس", hijriDate: "١ رمضان", gregorianDate: "2/19", fajr: "5:27", sunrise: "6:53", imsak: "5:17", dhuhr: "12:26", maghrib: "5:53", dua: prayerTimings[0].dua },
  { day: 2, dayNameAr: "الجمعة", hijriDate: "٢ رمضان", gregorianDate: "2/20", fajr: "5:26", sunrise: "6:52", imsak: "5:16", dhuhr: "12:26", maghrib: "5:54", dua: prayerTimings[1].dua },
  { day: 3, dayNameAr: "السبت", hijriDate: "٣ رمضان", gregorianDate: "2/21", fajr: "5:24", sunrise: "6:50", imsak: "5:14", dhuhr: "12:26", maghrib: "5:55", dua: prayerTimings[2].dua },
  { day: 4, dayNameAr: "الأحد", hijriDate: "٤ رمضان", gregorianDate: "2/22", fajr: "5:23", sunrise: "6:49", imsak: "5:13", dhuhr: "12:25", maghrib: "5:56", dua: prayerTimings[3].dua },
  { day: 5, dayNameAr: "الاثنين", hijriDate: "٥ رمضان", gregorianDate: "2/23", fajr: "5:21", sunrise: "6:48", imsak: "5:11", dhuhr: "12:25", maghrib: "5:56", dua: prayerTimings[4].dua },
  { day: 6, dayNameAr: "الثلاثاء", hijriDate: "٦ رمضان", gregorianDate: "2/24", fajr: "5:20", sunrise: "6:46", imsak: "5:10", dhuhr: "12:25", maghrib: "5:57", dua: prayerTimings[5].dua },
  { day: 7, dayNameAr: "الأربعاء", hijriDate: "٧ رمضان", gregorianDate: "2/25", fajr: "5:19", sunrise: "6:45", imsak: "5:09", dhuhr: "12:25", maghrib: "5:58", dua: prayerTimings[6].dua },
  { day: 8, dayNameAr: "الخميس", hijriDate: "٨ رمضان", gregorianDate: "2/26", fajr: "5:17", sunrise: "6:44", imsak: "5:07", dhuhr: "12:24", maghrib: "5:59", dua: prayerTimings[7].dua },
  { day: 9, dayNameAr: "الجمعة", hijriDate: "٩ رمضان", gregorianDate: "2/27", fajr: "5:16", sunrise: "6:42", imsak: "5:06", dhuhr: "12:24", maghrib: "6:00", dua: prayerTimings[8].dua },
  { day: 10, dayNameAr: "السبت", hijriDate: "١٠ رمضان", gregorianDate: "2/28", fajr: "5:15", sunrise: "6:41", imsak: "5:05", dhuhr: "12:24", maghrib: "6:01", dua: prayerTimings[9].dua },
  { day: 11, dayNameAr: "الأحد", hijriDate: "١١ رمضان", gregorianDate: "3/1", fajr: "5:13", sunrise: "6:40", imsak: "5:03", dhuhr: "12:24", maghrib: "6:02", dua: prayerTimings[10].dua },
  { day: 12, dayNameAr: "الاثنين", hijriDate: "١٢ رمضان", gregorianDate: "3/2", fajr: "5:12", sunrise: "6:38", imsak: "5:02", dhuhr: "12:24", maghrib: "6:02", dua: prayerTimings[11].dua },
  { day: 13, dayNameAr: "الثلاثاء", hijriDate: "١٣ رمضان", gregorianDate: "3/3", fajr: "5:10", sunrise: "6:37", imsak: "5:00", dhuhr: "12:23", maghrib: "6:03", dua: prayerTimings[12].dua },
  { day: 14, dayNameAr: "الأربعاء", hijriDate: "١٤ رمضان", gregorianDate: "3/4", fajr: "5:09", sunrise: "6:36", imsak: "4:59", dhuhr: "12:23", maghrib: "6:04", dua: prayerTimings[13].dua },
  { day: 15, dayNameAr: "الخميس", hijriDate: "١٥ رمضان", gregorianDate: "3/5", fajr: "5:08", sunrise: "6:34", imsak: "4:58", dhuhr: "12:23", maghrib: "6:05", dua: prayerTimings[14].dua },
  { day: 16, dayNameAr: "الجمعة", hijriDate: "١٦ رمضان", gregorianDate: "3/6", fajr: "5:06", sunrise: "6:33", imsak: "4:56", dhuhr: "12:23", maghrib: "6:06", dua: prayerTimings[15].dua },
  { day: 17, dayNameAr: "السبت", hijriDate: "١٧ رمضان", gregorianDate: "3/7", fajr: "5:05", sunrise: "6:32", imsak: "4:55", dhuhr: "12:23", maghrib: "6:07", dua: prayerTimings[16].dua },
  { day: 18, dayNameAr: "الأحد", hijriDate: "١٨ رمضان", gregorianDate: "3/8", fajr: "5:03", sunrise: "6:30", imsak: "4:53", dhuhr: "12:22", maghrib: "6:07", dua: prayerTimings[17].dua },
  { day: 19, dayNameAr: "الاثنين", hijriDate: "١٩ رمضان", gregorianDate: "3/9", fajr: "5:02", sunrise: "6:29", imsak: "4:52", dhuhr: "12:22", maghrib: "6:08", dua: prayerTimings[18].dua },
  { day: 20, dayNameAr: "الثلاثاء", hijriDate: "٢٠ رمضان", gregorianDate: "3/10", fajr: "5:01", sunrise: "6:28", imsak: "4:51", dhuhr: "12:22", maghrib: "6:09", dua: prayerTimings[19].dua },
  { day: 21, dayNameAr: "الأربعاء", hijriDate: "٢١ رمضان", gregorianDate: "3/11", fajr: "4:59", sunrise: "6:26", imsak: "4:49", dhuhr: "12:22", maghrib: "6:10", dua: prayerTimings[20].dua },
  { day: 22, dayNameAr: "الخميس", hijriDate: "٢٢ رمضان", gregorianDate: "3/12", fajr: "4:58", sunrise: "6:25", imsak: "4:48", dhuhr: "12:22", maghrib: "6:11", dua: prayerTimings[21].dua },
  { day: 23, dayNameAr: "الجمعة", hijriDate: "٢٣ رمضان", gregorianDate: "3/13", fajr: "4:56", sunrise: "6:24", imsak: "4:46", dhuhr: "12:21", maghrib: "6:12", dua: prayerTimings[22].dua },
  { day: 24, dayNameAr: "السبت", hijriDate: "٢٤ رمضان", gregorianDate: "3/14", fajr: "4:55", sunrise: "6:22", imsak: "4:45", dhuhr: "12:21", maghrib: "6:12", dua: prayerTimings[23].dua },
  { day: 25, dayNameAr: "الأحد", hijriDate: "٢٥ رمضان", gregorianDate: "3/15", fajr: "4:54", sunrise: "6:21", imsak: "4:44", dhuhr: "12:21", maghrib: "6:13", dua: prayerTimings[24].dua },
  { day: 26, dayNameAr: "الاثنين", hijriDate: "٢٦ رمضان", gregorianDate: "3/16", fajr: "4:52", sunrise: "6:20", imsak: "4:42", dhuhr: "12:21", maghrib: "6:14", dua: prayerTimings[25].dua },
  { day: 27, dayNameAr: "الثلاثاء", hijriDate: "٢٧ رمضان", gregorianDate: "3/17", fajr: "4:51", sunrise: "6:18", imsak: "4:41", dhuhr: "12:21", maghrib: "6:15", dua: prayerTimings[26].dua },
  { day: 28, dayNameAr: "الأربعاء", hijriDate: "٢٨ رمضان", gregorianDate: "3/18", fajr: "4:49", sunrise: "6:17", imsak: "4:39", dhuhr: "12:20", maghrib: "6:16", dua: prayerTimings[27].dua },
  { day: 29, dayNameAr: "الخميس", hijriDate: "٢٩ رمضان", gregorianDate: "3/19", fajr: "4:48", sunrise: "6:16", imsak: "4:38", dhuhr: "12:20", maghrib: "6:17", dua: prayerTimings[28].dua },
  { day: 30, dayNameAr: "الجمعة", hijriDate: "٣٠ رمضان", gregorianDate: "3/20", fajr: "4:47", sunrise: "6:14", imsak: "4:37", dhuhr: "12:20", maghrib: "6:18", dua: prayerTimings[29].dua },
];
