import { MapPin, BookOpen, Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { governorates } from "@/data/governorateData";

interface SettingsPanelProps {
  selectedGovernorate: string;
  onGovernorateChange: (id: string) => void;
}

const SettingsPanel = ({
  selectedGovernorate,
  onGovernorateChange,
}: SettingsPanelProps) => {
  const currentGov = governorates.find((g) => g.id === selectedGovernorate);

  return (
    <div className="space-y-2" dir="rtl">
      <Accordion type="single" collapsible className="space-y-2">
        {/* Governorate Selection */}
        <AccordionItem
          value="governorate"
          className="gold-border rounded-xl bg-card/80 px-4 border-b-0"
        >
          <AccordionTrigger className="hover:no-underline py-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-arabic text-foreground text-sm sm:text-base">
                المحافظة: <span className="gold-text font-bold">{currentGov?.name}</span>
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pb-3">
              {governorates.map((gov) => (
                <button
                  key={gov.id}
                  onClick={() => onGovernorateChange(gov.id)}
                  className={`rounded-lg px-2 py-2 text-xs sm:text-sm font-arabic transition-all ${
                    selectedGovernorate === gov.id
                      ? "gold-gradient text-primary-foreground font-bold"
                      : "bg-secondary/60 text-foreground hover:bg-secondary"
                  }`}
                >
                  {gov.name}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Endowment (Sect) Selection */}
        <AccordionItem
          value="endowment"
          className="gold-border rounded-xl bg-card/80 px-4 border-b-0"
        >
          <AccordionTrigger className="hover:no-underline py-3">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-arabic text-foreground text-sm sm:text-base">
                الوقف: <span className="gold-text font-bold">الوقف الشيعي</span>
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2 pb-3">
              <button className="flex-1 rounded-lg px-3 py-2 text-sm font-arabic gold-gradient text-primary-foreground font-bold">
                الوقف الشيعي
              </button>
              <button
                disabled
                className="flex-1 rounded-lg px-3 py-2 text-sm font-arabic bg-secondary/40 text-muted-foreground cursor-not-allowed"
              >
                الوقف السني (قريباً)
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* About / Info */}
        <AccordionItem
          value="info"
          className="gold-border rounded-xl bg-card/80 px-4 border-b-0"
        >
          <AccordionTrigger className="hover:no-underline py-3">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-primary" />
              <span className="font-arabic text-foreground text-sm sm:text-base">
                حول الإمساكية
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pb-3 space-y-2">
              <p className="text-muted-foreground text-xs sm:text-sm font-arabic leading-relaxed">
                إمساكية شهر رمضان المبارك لعام ١٤٤٦ هجرية.
                الأوقات محسوبة حسب الوقف الشيعي لجميع المحافظات العراقية.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm font-arabic leading-relaxed">
                يرجى اختيار المحافظة للحصول على أوقات الصلاة الدقيقة لمنطقتك.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SettingsPanel;
