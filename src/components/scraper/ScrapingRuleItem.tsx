
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ScrapingRule } from "./types";

interface ScrapingRuleItemProps {
  rule: ScrapingRule;
  onToggleStatus: (id: string) => void;
}

export const ScrapingRuleItem = ({ rule, onToggleStatus }: ScrapingRuleItemProps) => {
  return (
    <Card className="glass-card hover-float">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{rule.name}</CardTitle>
            <CardDescription>
              Frecuencia: {rule.frequency === "hourly" ? "Cada hora" : 
                          rule.frequency === "daily" ? "Diaria" : "Semanal"}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={rule.isActive}
              onCheckedChange={() => onToggleStatus(rule.id)}
            />
            <span className="text-xs">{rule.isActive ? "Activa" : "Inactiva"}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Usuarios objetivo:</span>{" "}
            <span className="font-mono text-xs">
              {rule.targetUsers.join(", ")}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Palabras clave:</span>{" "}
            <span className="font-mono text-xs">
              {rule.keywords.join(", ")}
            </span>
          </div>
          {rule.autoComment && (
            <div className="text-sm">
              <div className="text-muted-foreground mb-1">Plantilla de comentario:</div>
              <div className="font-mono text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded border">
                {rule.commentTemplate}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-between w-full">
          <Button 
            variant="outline" 
            size="sm"
          >
            Eliminar
          </Button>
          <Button 
            size="sm"
          >
            Editar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
