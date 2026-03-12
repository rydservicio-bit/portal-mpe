import { useState, useCallback, useRef } from "react";
import { Search, BookOpen, ImageIcon, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OtdrCaseAnalysis from "./OtdrCaseAnalysis";
import OtdrCaseLibrary from "./OtdrCaseLibrary";
import OtdrCurveImageInput from "./OtdrCurveImageInput";
import OtdrSorInput from "./OtdrSorInput";
import type { OtdrCase, OtdrEventInput } from "@/lib/otdr/types";
import { toast } from "sonner";

const OtdrTabs = () => {
  const [activeTab, setActiveTab] = useState("analizar");
  const [loadedEvents, setLoadedEvents] = useState<OtdrEventInput[]>([]);
  const [loadKey, setLoadKey] = useState(0);

  const loadCase = useCallback((c: OtdrCase) => {
    setLoadedEvents(c.events.map((e) => ({ ...e, id: crypto.randomUUID() })));
    setLoadKey((k) => k + 1);
    setActiveTab("analizar");
    toast.info(`Caso "${c.title}" cargado. Presiona "Analizar eventos" para diagnosticar.`);
  }, []);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="bg-muted/50 flex-wrap h-auto gap-1 p-1">
        <TabsTrigger value="analizar" className="gap-2 text-xs sm:text-sm">
          <Search size={14} />
          Tabla de eventos
        </TabsTrigger>
        <TabsTrigger value="imagen" className="gap-2 text-xs sm:text-sm">
          <ImageIcon size={14} />
          Imagen de curva
        </TabsTrigger>
        <TabsTrigger value="sor" className="gap-2 text-xs sm:text-sm">
          <FileText size={14} />
          Archivo .sor
        </TabsTrigger>
        <TabsTrigger value="biblioteca" className="gap-2 text-xs sm:text-sm">
          <BookOpen size={14} />
          Biblioteca
        </TabsTrigger>
      </TabsList>

      <TabsContent value="analizar">
        <OtdrCaseAnalysis key={loadKey} initialEvents={loadedEvents} />
      </TabsContent>

      <TabsContent value="imagen">
        <OtdrCurveImageInput />
      </TabsContent>

      <TabsContent value="sor">
        <OtdrSorInput />
      </TabsContent>

      <TabsContent value="biblioteca">
        <OtdrCaseLibrary onLoadCase={loadCase} />
      </TabsContent>
    </Tabs>
  );
};

export default OtdrTabs;
