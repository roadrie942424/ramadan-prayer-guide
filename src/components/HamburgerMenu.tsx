import { useState } from "react";
import { Menu, X, MapPin, BookOpen, ChevronDown } from "lucide-react";
import { governorates } from "@/data/governorateData";

interface HamburgerMenuProps {
  selectedGovernorate: string;
  onGovernorateChange: (id: string) => void;
}

const HamburgerMenu = ({
  selectedGovernorate,
  onGovernorateChange,
}: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProvinces, setShowProvinces] = useState(false);
  const currentGov = governorates.find((g) => g.id === selectedGovernorate);

  const handleGovernorateSelect = (id: string) => {
    onGovernorateChange(id);
    setShowProvinces(false);
  };

  return (
    <>
      {/* Hamburger Button - Top Right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-card/90 gold-border backdrop-blur-sm transition-all hover:scale-105"
        aria-label="فتح القائمة"
      >
        <Menu className="h-6 w-6 text-primary" />
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
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-card border-l border-border shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        {/* Drawer Header */}
        <div className="gold-gradient p-5 flex items-center justify-between">
          <h2 className="text-primary-foreground font-display text-xl">
            اختيار المحافظة والمذهب
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-5 space-y-5 overflow-y-auto h-[calc(100%-70px)]">
          {/* Province Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-arabic text-foreground text-sm">المحافظة والمنطقة</span>
            </div>

            {/* Province Dropdown */}
            <button
              onClick={() => setShowProvinces(!showProvinces)}
              className="w-full flex items-center justify-between rounded-xl gold-border bg-secondary/50 px-4 py-3 font-arabic text-sm text-foreground transition-all hover:bg-secondary/70"
            >
              <span>اختر المحافظة</span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                  showProvinces ? "rotate-180" : ""
                }`}
              />
            </button>

            {showProvinces && (
              <div className="grid grid-cols-2 gap-2 animate-fade-in">
                {governorates.map((gov) => (
                  <button
                    key={gov.id}
                    onClick={() => handleGovernorateSelect(gov.id)}
                    className={`rounded-lg px-3 py-2.5 text-xs sm:text-sm font-arabic transition-all ${
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

            {/* Selected Province Display */}
            <div className="w-full rounded-xl gold-border bg-secondary/50 px-4 py-3 text-center">
              <span className="gold-text font-bold font-arabic text-base">
                {currentGov?.name}
              </span>
            </div>
          </div>

          {/* Waqf Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-arabic text-foreground text-sm">المذهب</span>
            </div>

            <div className="space-y-2">
              <button className="w-full rounded-xl gold-gradient px-4 py-3 font-arabic text-sm text-primary-foreground font-bold transition-all">
                الوقف الشيعي
              </button>
              <button
                disabled
                className="w-full rounded-xl bg-secondary/40 px-4 py-3 font-arabic text-sm text-muted-foreground cursor-not-allowed"
              >
                الوقف السني (قريباً)
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="rounded-xl gold-border bg-secondary/30 p-4 space-y-2">
            <p className="text-muted-foreground text-xs font-arabic leading-relaxed">
              إمساكية شهر رمضان المبارك لعام ١٤٤٦ هجرية.
              الأوقات محسوبة حسب الوقف الشيعي لجميع المحافظات العراقية.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
