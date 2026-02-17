import { useState } from "react";
import { Menu, X, MapPin, BookOpen, ChevronDown, MapPinned } from "lucide-react";
import { governorates } from "@/data/governorateData";
import { sunniGovernorates } from "@/data/sunniGovernorateData";

export type WaqfType = "shia" | "sunni";

interface HamburgerMenuProps {
  selectedGovernorate: string;
  onGovernorateChange: (id: string) => void;
  waqfType: WaqfType;
  onWaqfTypeChange: (type: WaqfType) => void;
  selectedSunniGovernorate: string;
  onSunniGovernorateChange: (id: string) => void;
  selectedSunniRegion: string;
  onSunniRegionChange: (id: string) => void;
}

const HamburgerMenu = ({
  selectedGovernorate,
  onGovernorateChange,
  waqfType,
  onWaqfTypeChange,
  selectedSunniGovernorate,
  onSunniGovernorateChange,
  selectedSunniRegion,
  onSunniRegionChange,
}: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProvinces, setShowProvinces] = useState(false);
  const [showSunniGovernorates, setShowSunniGovernorates] = useState(false);
  const [showSunniRegions, setShowSunniRegions] = useState(false);

  const currentShiaGov = governorates.find((g) => g.id === selectedGovernorate);
  const currentSunniGov = sunniGovernorates.find((g) => g.id === selectedSunniGovernorate);
  const currentSunniRegion = currentSunniGov?.regions.find((r) => r.id === selectedSunniRegion);

  const handleGovernorateSelect = (id: string) => {
    onGovernorateChange(id);
    setShowProvinces(false);
  };

  const handleSunniGovernorateSelect = (id: string) => {
    onSunniGovernorateChange(id);
    const gov = sunniGovernorates.find((g) => g.id === id);
    if (gov && gov.regions.length > 0) {
      onSunniRegionChange(gov.regions[0].id);
    }
    setShowSunniGovernorates(false);
    setShowSunniRegions(true);
  };

  const handleSunniRegionSelect = (id: string) => {
    onSunniRegionChange(id);
    setShowSunniRegions(false);
  };

  const handleWaqfChange = (type: WaqfType) => {
    onWaqfTypeChange(type);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 p-2.5 rounded-xl bg-card/90 gold-border backdrop-blur-sm transition-all hover:scale-105"
        aria-label="فتح القائمة"
      >
        <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
          onTouchMove={(e) => e.stopPropagation()}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[82%] max-w-[340px] bg-card/95 backdrop-blur-md border-l border-primary/20 shadow-[0_0_60px_hsl(45_80%_55%/0.1)] overflow-hidden transition-all duration-400 ease-out ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        dir="rtl"
      >
        {/* Drawer Header */}
        <div className="gold-gradient px-5 py-4 flex items-center justify-between">
          <h2 className="text-primary-foreground font-display text-lg">
            الإعدادات
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors p-1.5 rounded-lg hover:bg-primary-foreground/10"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-5 overflow-y-auto h-[calc(100%-60px)]">
          {/* Waqf Type Selection */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-arabic text-foreground text-sm font-bold">المذهب</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {(["shia", "sunni"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => handleWaqfChange(type)}
                  className={`rounded-xl px-4 py-3 font-arabic text-sm transition-all duration-200 active:scale-95 ${
                    waqfType === type
                      ? "gold-gradient text-primary-foreground font-bold shadow-md"
                      : "bg-secondary/60 text-foreground hover:bg-secondary hover:shadow-sm"
                  }`}
                >
                  {type === "shia" ? "الوقف الشيعي" : "الوقف السني قريبا"}
                </button>
              ))}
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          {/* Shia Province Section */}
          {waqfType === "shia" && (
            <section className="space-y-3 animate-fade-in">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-arabic text-foreground text-sm font-bold">المحافظة</span>
              </div>

              <button
                onClick={() => setShowProvinces(!showProvinces)}
                className="w-full flex items-center justify-between rounded-xl gold-border bg-secondary/50 px-4 py-3 font-arabic text-sm text-foreground transition-all hover:bg-secondary/70 active:scale-[0.98]"
              >
                <span>اختر المحافظة</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    showProvinces ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showProvinces && (
                <div className="grid grid-cols-2 gap-2 animate-fade-in max-h-52 overflow-y-auto rounded-xl p-1">
                  {governorates.map((gov) => (
                    <button
                      key={gov.id}
                      onClick={() => handleGovernorateSelect(gov.id)}
                      className={`rounded-lg px-3 py-2.5 text-xs sm:text-sm font-arabic transition-all duration-200 active:scale-95 ${
                        selectedGovernorate === gov.id
                          ? "gold-gradient text-primary-foreground font-bold shadow-md"
                          : "bg-secondary/60 text-foreground hover:bg-secondary"
                      }`}
                    >
                      {gov.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="w-full rounded-xl gold-border bg-secondary/50 px-4 py-3 text-center">
                <span className="gold-text font-bold font-arabic text-base">
                  {currentShiaGov?.name}
                </span>
              </div>
            </section>
          )}

          {/* Sunni Province + Region Section */}
          {waqfType === "sunni" && (
            <section className="space-y-4 animate-fade-in">
              {/* Sunni Governorate */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-arabic text-foreground text-sm font-bold">المحافظة</span>
                </div>

                <button
                  onClick={() => setShowSunniGovernorates(!showSunniGovernorates)}
                  className="w-full flex items-center justify-between rounded-xl gold-border bg-secondary/50 px-4 py-3 font-arabic text-sm text-foreground transition-all hover:bg-secondary/70 active:scale-[0.98]"
                >
                  <span>اختر المحافظة</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      showSunniGovernorates ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showSunniGovernorates && (
                  <div className="grid grid-cols-2 gap-2 animate-fade-in max-h-48 overflow-y-auto rounded-xl p-1">
                    {sunniGovernorates.map((gov) => (
                      <button
                        key={gov.id}
                        onClick={() => handleSunniGovernorateSelect(gov.id)}
                        className={`rounded-lg px-3 py-2.5 text-xs sm:text-sm font-arabic transition-all duration-200 active:scale-95 ${
                          selectedSunniGovernorate === gov.id
                            ? "gold-gradient text-primary-foreground font-bold shadow-md"
                            : "bg-secondary/60 text-foreground hover:bg-secondary"
                        }`}
                      >
                        {gov.name}
                      </button>
                    ))}
                  </div>
                )}

                <div className="w-full rounded-xl gold-border bg-secondary/50 px-4 py-3 text-center">
                  <span className="gold-text font-bold font-arabic text-base">
                    {currentSunniGov?.name}
                  </span>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

              {/* Sunni Region */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <MapPinned className="h-5 w-5 text-primary" />
                  <span className="font-arabic text-foreground text-sm font-bold">المنطقة</span>
                </div>

                <button
                  onClick={() => setShowSunniRegions(!showSunniRegions)}
                  className="w-full flex items-center justify-between rounded-xl gold-border bg-secondary/50 px-4 py-3 font-arabic text-sm text-foreground transition-all hover:bg-secondary/70 active:scale-[0.98]"
                >
                  <span>اختر المنطقة</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      showSunniRegions ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showSunniRegions && currentSunniGov && (
                  <div className="grid grid-cols-2 gap-2 animate-fade-in max-h-48 overflow-y-auto rounded-xl p-1">
                    {currentSunniGov.regions.map((region) => (
                      <button
                        key={region.id}
                        onClick={() => handleSunniRegionSelect(region.id)}
                        className={`rounded-lg px-3 py-2.5 text-xs sm:text-sm font-arabic transition-all duration-200 active:scale-95 ${
                          selectedSunniRegion === region.id
                            ? "gold-gradient text-primary-foreground font-bold shadow-md"
                            : "bg-secondary/60 text-foreground hover:bg-secondary"
                        }`}
                      >
                        {region.name}
                      </button>
                    ))}
                  </div>
                )}

                <div className="w-full rounded-xl gold-border bg-secondary/50 px-4 py-3 text-center">
                  <span className="gold-text font-bold font-arabic text-base">
                    {currentSunniRegion?.name}
                  </span>
                </div>
              </div>
            </section>
          )}

          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          {/* Iftar Dua */}
          <section className="rounded-xl gold-border bg-primary/5 p-5 space-y-3">
            <h3 className="gold-text font-display text-lg text-center font-bold">🤲 دعاء الإفطار</h3>
            <p className="text-foreground text-sm sm:text-base font-arabic leading-[2] text-center">
              اللَّهُمَّ لَكَ صُمْتُ، وَعَلَىٰ رِزْقِكَ أَفْطَرْتُ، وَلِصَوْمِ غَدٍ نَوَيْتُ.
            </p>
            <p className="text-foreground text-sm sm:text-base font-arabic leading-[2] text-center">
              ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ العُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ.
            </p>
          </section>

          {/* Info */}
          <section className="rounded-xl gold-border bg-secondary/30 p-4 space-y-2">
            <p className="text-muted-foreground text-xs font-arabic leading-relaxed">
              إمساكية شهر رمضان المبارك لعام ١٤٤٦ هجرية.
              {waqfType === "shia"
                ? " الأوقات محسوبة حسب الوقف الشيعي لجميع المحافظات العراقية."
                : " الأوقات محسوبة حسب الوقف السني للمحافظات والمناطق المتاحة."}
            </p>
          </section>

          {/* Bottom spacer */}
          <div className="h-4" />
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
