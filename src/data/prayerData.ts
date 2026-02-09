export interface DayPrayerTimes {
  day: number;
  dayNameAr: string;
  hijriDate: string;
  gregorianDate: string;
  fajr: string;
  sunrise: string;
  imsak: string;
  dhuhr: string;
  maghrib: string;
  dua: string;
}

// Data extracted from siha_1.pdf - Al Rashid Imsakia 1446 Hijri (Shia)
export const prayerTimings: DayPrayerTimes[] = [
  { day: 1, dayNameAr: "الخميس", hijriDate: "١ رمضان", gregorianDate: "2/19", fajr: "5:20", sunrise: "6:43", imsak: "5:10", dhuhr: "12:16", maghrib: "6:06", dua: "اللّهمّ اجعل صيامي فيه صيام الصائمين وقيامي فيه قيام القائمين ونبّهني فيه عن نومة الغافلين" },
  { day: 2, dayNameAr: "الجمعة", hijriDate: "٢ رمضان", gregorianDate: "2/20", fajr: "5:19", sunrise: "6:41", imsak: "5:09", dhuhr: "12:16", maghrib: "6:07", dua: "اللّهمّ قرّبني فيه إلى مرضاتك وجنّبني فيه من سخطك ونقماتك ووفّقني فيه لقراءة آياتك" },
  { day: 3, dayNameAr: "السبت", hijriDate: "٣ رمضان", gregorianDate: "2/21", fajr: "5:18", sunrise: "6:40", imsak: "5:08", dhuhr: "12:16", maghrib: "6:08", dua: "اللّهمّ ارزقني فيه الذهن والتنبيه وباعدني فيه من السفاهة والتمويه" },
  { day: 4, dayNameAr: "الأحد", hijriDate: "٤ رمضان", gregorianDate: "2/22", fajr: "5:17", sunrise: "6:39", imsak: "5:07", dhuhr: "12:16", maghrib: "6:09", dua: "اللّهمّ قوّني فيه على إقامة أمرك وأذقني فيه حلاوة ذكرك وأوزعني فيه لأداء شكرك بكرمك" },
  { day: 5, dayNameAr: "الاثنين", hijriDate: "٥ رمضان", gregorianDate: "2/23", fajr: "5:16", sunrise: "6:38", imsak: "5:06", dhuhr: "12:16", maghrib: "6:10", dua: "اللّهمّ اجعلني فيه من المستغفرين واجعلني فيه من عبادك الصالحين القانتين" },
  { day: 6, dayNameAr: "الثلاثاء", hijriDate: "٦ رمضان", gregorianDate: "2/24", fajr: "5:14", sunrise: "6:37", imsak: "5:04", dhuhr: "12:16", maghrib: "6:11", dua: "اللّهمّ لا تخذلني فيه لتعرّض معصيتك ولا تضربني بسياط نقمتك وزحزحني فيه من موجبات سخطك" },
  { day: 7, dayNameAr: "الأربعاء", hijriDate: "٧ رمضان", gregorianDate: "2/25", fajr: "5:13", sunrise: "6:36", imsak: "5:03", dhuhr: "12:16", maghrib: "6:11", dua: "اللّهمّ أعنّي فيه على صيامه وقيامه وجنّبني فيه من هفواته وآثامه" },
  { day: 8, dayNameAr: "الخميس", hijriDate: "٨ رمضان", gregorianDate: "2/26", fajr: "5:12", sunrise: "6:35", imsak: "5:02", dhuhr: "12:16", maghrib: "6:12", dua: "اللّهمّ ارزقني فيه رحمة الأيتام وإطعام الطعام وإفشاء السلام وصحبة الكرام" },
  { day: 9, dayNameAr: "الجمعة", hijriDate: "٩ رمضان", gregorianDate: "2/27", fajr: "5:11", sunrise: "6:34", imsak: "5:01", dhuhr: "12:15", maghrib: "6:13", dua: "اللّهمّ اجعل لي فيه نصيباً من رحمتك الواسعة واهدني فيه لبراهينك الساطعة" },
  { day: 10, dayNameAr: "السبت", hijriDate: "١٠ رمضان", gregorianDate: "2/28", fajr: "5:10", sunrise: "6:32", imsak: "5:00", dhuhr: "12:15", maghrib: "6:14", dua: "اللّهمّ اجعلني فيه من المتوكّلين عليك واجعلني فيه من الفائزين لديك" },
  { day: 11, dayNameAr: "الأحد", hijriDate: "١١ رمضان", gregorianDate: "3/1", fajr: "5:09", sunrise: "6:31", imsak: "4:59", dhuhr: "12:15", maghrib: "6:15", dua: "اللّهمّ حبّب إليّ فيه الإحسان وكرّه إليّ فيه الفسوق والعصيان وحرّم عليّ فيه سخطك والنيران" },
  { day: 12, dayNameAr: "الاثنين", hijriDate: "١٢ رمضان", gregorianDate: "3/2", fajr: "5:08", sunrise: "6:30", imsak: "4:58", dhuhr: "12:15", maghrib: "6:15", dua: "اللّهمّ زيّنّي فيه بالستر والعفاف واسترني فيه بلباس القنوع والكفاف" },
  { day: 13, dayNameAr: "الثلاثاء", hijriDate: "١٣ رمضان", gregorianDate: "3/3", fajr: "5:06", sunrise: "6:29", imsak: "4:56", dhuhr: "12:15", maghrib: "6:16", dua: "اللّهمّ طهّرني فيه من الدنس والأقذار وصبّرني فيه على كائنات الأقدار" },
  { day: 14, dayNameAr: "الأربعاء", hijriDate: "١٤ رمضان", gregorianDate: "3/4", fajr: "5:05", sunrise: "6:27", imsak: "4:55", dhuhr: "12:14", maghrib: "6:17", dua: "اللّهمّ لا تؤاخذني فيه بالعثرات واقلني فيه من الخطايا والهفوات" },
  { day: 15, dayNameAr: "الخميس", hijriDate: "١٥ رمضان", gregorianDate: "3/5", fajr: "5:04", sunrise: "6:26", imsak: "4:54", dhuhr: "12:14", maghrib: "6:18", dua: "اللّهمّ ارزقني فيه طاعة الخاشعين واشرح فيه صدري بإنابة المخبتين" },
  { day: 16, dayNameAr: "الجمعة", hijriDate: "١٦ رمضان", gregorianDate: "3/6", fajr: "5:03", sunrise: "6:25", imsak: "4:53", dhuhr: "12:14", maghrib: "6:19", dua: "اللّهمّ وفّقني فيه لموافقة الأبرار وجنّبني فيه مرافقة الأشرار" },
  { day: 17, dayNameAr: "السبت", hijriDate: "١٧ رمضان", gregorianDate: "3/7", fajr: "5:02", sunrise: "6:24", imsak: "4:52", dhuhr: "12:14", maghrib: "6:19", dua: "اللّهمّ اهدني فيه لصالح الأعمال واقض لي فيه الحوائج والآمال" },
  { day: 18, dayNameAr: "الأحد", hijriDate: "١٨ رمضان", gregorianDate: "3/8", fajr: "5:00", sunrise: "6:22", imsak: "4:50", dhuhr: "12:13", maghrib: "6:20", dua: "اللّهمّ نبّهني فيه لبركات أسحاره ونوّر فيه قلبي بضياء أنواره" },
  { day: 19, dayNameAr: "الاثنين", hijriDate: "١٩ رمضان", gregorianDate: "3/9", fajr: "4:59", sunrise: "6:21", imsak: "4:49", dhuhr: "12:13", maghrib: "6:21", dua: "اللّهمّ وفّر فيه حظّي من بركاته ويسّر سبيلي إلى خيراته" },
  { day: 20, dayNameAr: "الثلاثاء", hijriDate: "٢٠ رمضان", gregorianDate: "3/10", fajr: "4:58", sunrise: "6:20", imsak: "4:48", dhuhr: "12:13", maghrib: "6:22", dua: "اللّهمّ افتح لي فيه أبواب الجنان وأغلق عنّي فيه أبواب النيران" },
  { day: 21, dayNameAr: "الأربعاء", hijriDate: "٢١ رمضان", gregorianDate: "3/11", fajr: "4:56", sunrise: "6:19", imsak: "4:46", dhuhr: "12:13", maghrib: "6:22", dua: "اللّهمّ اجعل لي فيه إلى مرضاتك دليلاً ولا تجعل للشيطان فيه عليّ سبيلاً" },
  { day: 22, dayNameAr: "الخميس", hijriDate: "٢٢ رمضان", gregorianDate: "3/12", fajr: "4:55", sunrise: "6:17", imsak: "4:45", dhuhr: "12:12", maghrib: "6:23", dua: "اللّهمّ افتح لي فيه أبواب فضلك وأنزل عليّ فيه بركاتك" },
  { day: 23, dayNameAr: "الجمعة", hijriDate: "٢٣ رمضان", gregorianDate: "3/13", fajr: "4:54", sunrise: "6:16", imsak: "4:44", dhuhr: "12:12", maghrib: "6:24", dua: "اللّهمّ اغسلني فيه من الذنوب وطهّرني فيه من العيوب" },
  { day: 24, dayNameAr: "السبت", hijriDate: "٢٤ رمضان", gregorianDate: "3/14", fajr: "4:52", sunrise: "6:15", imsak: "4:42", dhuhr: "12:12", maghrib: "6:25", dua: "اللّهمّ إنّي أسألك فيه ما يرضيك وأعوذ بك ممّا يؤذيك" },
  { day: 25, dayNameAr: "الأحد", hijriDate: "٢٥ رمضان", gregorianDate: "3/15", fajr: "4:51", sunrise: "6:13", imsak: "4:41", dhuhr: "12:12", maghrib: "6:26", dua: "اللّهمّ اجعلني فيه محبّاً لأوليائك ومعادياً لأعدائك مستنّاً بسنّة خاتم أنبيائك" },
  { day: 26, dayNameAr: "الاثنين", hijriDate: "٢٦ رمضان", gregorianDate: "3/16", fajr: "4:50", sunrise: "6:12", imsak: "4:40", dhuhr: "12:11", maghrib: "6:26", dua: "اللّهمّ اجعل سعيي فيه مشكوراً وذنبي فيه مغفوراً وعملي فيه مقبولاً" },
  { day: 27, dayNameAr: "الثلاثاء", hijriDate: "٢٧ رمضان", gregorianDate: "3/17", fajr: "4:48", sunrise: "6:11", imsak: "4:38", dhuhr: "12:11", maghrib: "6:27", dua: "اللّهمّ ارزقني فيه فضل ليلة القدر وحوّل أموري فيه من العسر إلى اليسر" },
  { day: 28, dayNameAr: "الأربعاء", hijriDate: "٢٨ رمضان", gregorianDate: "3/18", fajr: "4:47", sunrise: "6:09", imsak: "4:37", dhuhr: "12:11", maghrib: "6:28", dua: "اللّهمّ وفّر حظّي فيه من النوافل وأكرمني فيه بإحضار المسائل" },
  { day: 29, dayNameAr: "الخميس", hijriDate: "٢٩ رمضان", gregorianDate: "3/19", fajr: "4:45", sunrise: "6:08", imsak: "4:35", dhuhr: "12:10", maghrib: "6:29", dua: "اللّهمّ غشّني فيه بالرحمة وارزقني فيه التوفيق والعصمة وطهّر قلبي من غياهب التهمة" },
  { day: 30, dayNameAr: "الجمعة", hijriDate: "٣٠ رمضان", gregorianDate: "3/20", fajr: "4:44", sunrise: "6:07", imsak: "4:34", dhuhr: "12:10", maghrib: "6:29", dua: "اللّهمّ اجعل صيامي فيه بالشكر والقبول على ما ترضاه ويرضاه الرسول" },
];

export const toArabicNumeral = (num: number): string => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(d => arabicNumerals[parseInt(d)]).join('');
};
