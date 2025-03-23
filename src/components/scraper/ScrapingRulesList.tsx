
import { FadeIn } from "@/components/ui/motion";
import { ScrapingRule } from "./types";
import { ScrapingRuleItem } from "./ScrapingRuleItem";

interface ScrapingRulesListProps {
  scrapingRules: ScrapingRule[];
  onToggleRuleStatus: (id: string) => void;
}

export const ScrapingRulesList = ({ 
  scrapingRules, 
  onToggleRuleStatus 
}: ScrapingRulesListProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reglas activas</h2>
      <div className="space-y-4">
        {scrapingRules.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <h3 className="text-lg font-medium">No hay reglas configuradas</h3>
            <p className="text-muted-foreground mt-2">
              Crea tu primera regla para comenzar a scrapear contenido.
            </p>
          </div>
        ) : (
          scrapingRules.map((rule) => (
            <ScrapingRuleItem 
              key={rule.id} 
              rule={rule} 
              onToggleStatus={onToggleRuleStatus} 
            />
          ))
        )}
      </div>
    </div>
  );
};
