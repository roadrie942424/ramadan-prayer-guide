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
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-[320px] bg-card border-l border-border shadow-2xl overflow-hidden transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        {/* Drawer Header */}
        <div className="gold-gradient p-3.5 sm:p-4 flex items-center justify-between">
          <h2 className="text-primary-foreground font-display text-base sm:text-lg">
            الإعدادات
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors p-1 rounded-lg hover:bg-primary-foreground/10"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-3 sm:p-4 space-y-3 overflow-y-auto h-[calc(100%-52px)] sm:h-[calc(100%-56px)]">
          {/* Waqf Type Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="font-arabic text-foreground text-xs sm:text-sm">المذهب</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleWaqfChange("shia")}
                className={`rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 font-arabic text-xs sm:text-sm transition-all ${
                  waqfType === "shia"
                    ? "gold-gradient text-primary-foreground font-bold"
                    : "bg-secondary/60 text-foreground hover:bg-secondary"
                }`}
              >
                الوقف الشيعي
              </button>
              <button
                onClick={() => handleWaqfChange("sunni")}
                className={`rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 font-arabic text-xs sm:text-sm transition-all ${
                  waqfType === "sunni"
                    ? "gold-gradient text-primary-foreground font-bold"
                    : "bg-secondary/60 text-foreground hover:bg-secondary"
                }`}
              >
                الوقف السني
              </button>
            </div>
          </div>

          {/* Shia Province Section */}
          {waqfType === "shia" && (
            <div className="space-y-2.5 animate-fade-in">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <span className="font-arabic text-foreground text-xs sm:text-sm">المحافظة</span>
              </div>

              <button
                onClick={() => setShowProvinces(!showProvinces)}
                className="w-full flex items-center justify-between rounded-xl gold-border bg-secondary/50 px-3 py-2.5 sm:px-4 sm:py-3 font-arabic text-xs sm:text-sm text-foreground transition-all hover:bg-secondary/70"
              >
                <span>اختر المحافظة</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    showProvinces ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showProvinces && (
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 animate-fade-in max-h-52 overflow-y-auto">
                  {governorates.map((gov) => (
                    <button
                      key={gov.id}
                      onClick={() => handleGovernorateSelect(gov.id)}
                      className={`rounded-lg px-2 py-2 sm:px-3 sm:py-2.5 text-[11px] sm:text-sm font-arabic transition-all ${
                        selectedGovernorate === gov.id
                          ? "gold-gradient text-primary-foreground font-bold"
                          : "bg-secondary/60 text-foreground hover:bg-secondary"
                      }`}
                    >
                      {gov.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="w-full rounded-xl gold-border bg-secondary/50 px-3 py-2.5 sm:px-4 sm:py-3 text-center">
                <span className="gold-text font-bold font-arabic text-sm sm:text-base">
                  {currentShiaGov?.name}
                </span>
              </div>
            </div>
          )}

          {/* Sunni Province + Region Section */}
          {waqfType === "sunni" && (
            <div className="space-y-3 animate-fade-in">
              {/* Sunni Governorate */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="font-arabic text-foreground text-xs sm:text-sm">المحافظة</span>
                </div>

                <button
                  onClick={() => setShowSunniGovernorates(!showSunniGovernorates)}
                  className="w-full flex items-center justify-between rounded-xl gold-border bg-secondary/50 px-3 py-2.5 sm:px-4 sm:py-3 font-arabic text-xs sm:text-sm text-foreground transition-all hover:bg-secondary/70"
                >
                  <span>اختر المحافظة</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      showSunniGovernorates ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showSunniGovernorates && (
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 animate-fade-in max-h-48 overflow-y-auto">
                    {sunniGovernorates.map((gov) => (
                      <button
                        key={gov.id}
                        onClick={() => handleSunniGovernorateSelect(gov.id)}
                        className={`rounded-lg px-2 py-2 sm:px-3 sm:py-2.5 text-[11px] sm:text-sm font-arabic transition-all ${
                          selectedSunniGovernorate === gov.id
                            ? "gold-gradient text-primary-foreground font-bold"
                            : "bg-secondary/60 text-foreground hover:bg-secondary"
                        }`}
                      >
                        {gov.name}
                      </button>
                    ))}
                  </div>
                )}

                <div className="w-full rounded-xl gold-border bg-secondary/50 px-3 py-2.5 sm:px-4 sm:py-3 text-center">
                  <span className="gold-text font-bold font-arabic text-sm sm:text-base">
                    {currentSunniGov?.name}
                  </span>
                </div>
              </div>

              {/* Sunni Region */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <MapPinned className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="font-arabic text-foreground text-xs sm:text-sm">المنطقة</span>
                </div>

                <button
                  onClick={() => setShowSunniRegions(!showSunniRegions)}
                  className="w-full flex items-center justify-between rounded-xl gold-border bg-secondary/50 px-3 py-2.5 sm:px-4 sm:py-3 font-arabic text-xs sm:text-sm text-foreground transition-all hover:bg-secondary/70"
                >
                  <span>اختر المنطقة</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      showSunniRegions ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showSunniRegions && currentSunniGov && (
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 animate-fade-in max-h-48 overflow-y-auto">
                    {currentSunniGov.regions.map((region) => (
                      <button
                        key={region.id}
                        onClick={() => handleSunniRegionSelect(region.id)}
                        className={`rounded-lg px-2 py-2 sm:px-3 sm:py-2.5 text-[11px] sm:text-sm font-arabic transition-all ${
                          selectedSunniRegion === region.id
                            ? "gold-gradient text-primary-foreground font-bold"
                            : "bg-secondary/60 text-foreground hover:bg-secondary"
                        }`}
                      >
                        {region.name}
                      </button>
                    ))}
                  </div>
                )}

                <div className="w-full rounded-xl gold-border bg-secondary/50 px-3 py-2.5 sm:px-4 sm:py-3 text-center">
                  <span className="gold-text font-bold font-arabic text-sm sm:text-base">
                    {currentSunniRegion?.name}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="rounded-xl gold-border bg-secondary/30 p-3 sm:p-4 space-y-2">
            <p className="text-muted-foreground text-[10px] sm:text-xs font-arabic leading-relaxed">
              إمساكية شهر رمضان المبارك لعام ١٤٤٦ هجرية.
              {waqfType === "shia"
                ? " الأوقات محسوبة حسب الوقف الشيعي لجميع المحافظات العراقية."
                : " الأوقات محسوبة حسب الوقف السني للمحافظات والمناطق المتاحة."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
