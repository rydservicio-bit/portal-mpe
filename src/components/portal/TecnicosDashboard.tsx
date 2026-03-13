import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, Activity, BookOpen, Wrench, FileText } from "lucide-react";
import AsignacionesList from "./tecnicos/AsignacionesList";
import BitacoraSection from "./tecnicos/BitacoraSection";
import OtdrModule from "@/components/otdr/OtdrModule";
import OtdrCaseLibrary from "@/components/otdr/OtdrCaseLibrary";

const TecnicosDashboard = () => {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-foreground mb-1">Técnicos</h2>
      <p className="text-sm text-muted-foreground mb-6">Panel de trabajo técnico de campo</p>

      <Tabs defaultValue="asignaciones" className="space-y-6">
        <TabsList className="bg-muted/50 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="asignaciones" className="gap-2 text-xs sm:text-sm">
            <ClipboardList size={14} /> Mis asignaciones
          </TabsTrigger>
          <TabsTrigger value="bitacora" className="gap-2 text-xs sm:text-sm">
            <BookOpen size={14} /> Bitácora
          </TabsTrigger>
          <TabsTrigger value="otdr" className="gap-2 text-xs sm:text-sm">
            <Activity size={14} /> OTDR
          </TabsTrigger>
          <TabsTrigger value="herramientas" className="gap-2 text-xs sm:text-sm">
            <Wrench size={14} /> Herramientas
          </TabsTrigger>
          <TabsTrigger value="docs" className="gap-2 text-xs sm:text-sm">
            <FileText size={14} /> Documentación
          </TabsTrigger>
        </TabsList>

        <TabsContent value="asignaciones">
          <AsignacionesList />
        </TabsContent>
        <TabsContent value="bitacora">
          <BitacoraSection />
        </TabsContent>
        <TabsContent value="otdr">
          <OtdrModule embedded />
        </TabsContent>
        <TabsContent value="herramientas">
          <PlaceholderCards title="Herramientas técnicas" items={["Calculadora de enlace", "Tabla de pérdidas", "Referencia de conectores"]} />
        </TabsContent>
        <TabsContent value="docs">
          <PlaceholderCards title="Documentación técnica" items={["Procedimientos de campo", "Guías de empalme", "Normativa vigente"]} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

function PlaceholderCards({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-heading text-sm font-bold text-foreground mb-4">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item} className="glass-card p-5 text-center">
            <span className="text-xs text-muted-foreground">{item}</span>
            <p className="text-[10px] text-muted-foreground/60 mt-2">Próximamente</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TecnicosDashboard;
