
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { NewRuleFormData, ScrapingRule } from "./types";

interface NewRuleFormProps {
  onAddRule: (rule: ScrapingRule) => void;
}

export const NewRuleForm = ({ onAddRule }: NewRuleFormProps) => {
  const { toast } = useToast();
  const [newRule, setNewRule] = useState<NewRuleFormData>({
    name: "",
    targetUsers: [],
    frequency: "daily",
    keywords: [],
    autoComment: false,
    commentTemplate: "",
    isActive: false,
  });

  const handleAddRule = () => {
    if (!newRule.name || newRule.targetUsers.length === 0) return;
    
    const newRuleItem: ScrapingRule = {
      id: `rule-${Date.now()}`,
      name: newRule.name,
      targetUsers: newRule.targetUsers,
      frequency: newRule.frequency,
      keywords: newRule.keywords,
      autoComment: newRule.autoComment,
      commentTemplate: newRule.commentTemplate,
      isActive: false,
    };
    
    onAddRule(newRuleItem);
    
    setNewRule({
      name: "",
      targetUsers: [],
      frequency: "daily",
      keywords: [],
      autoComment: false,
      commentTemplate: "",
      isActive: false,
    });
    
    toast({
      title: "Regla de scraping creada",
      description: `Se ha creado la regla "${newRuleItem.name}" correctamente.`,
    });
  };

  const handleTargetUsersChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const usersArray = e.target.value.split(",").map(user => user.trim());
    setNewRule({ ...newRule, targetUsers: usersArray });
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const keywordsArray = e.target.value.split(",").map(keyword => keyword.trim());
    setNewRule({ ...newRule, keywords: keywordsArray });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Nueva regla</h2>
      <Card>
        <CardHeader>
          <CardTitle>Configuración de scraping</CardTitle>
          <CardDescription>
            Define qué usuarios monitorear y qué hacer con su contenido
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="rule-name" className="text-sm font-medium">
              Nombre de la regla
            </label>
            <Input
              id="rule-name"
              value={newRule.name}
              onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              placeholder="Ej. Monitoreo de competidores"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="target-users" className="text-sm font-medium">
              Usuarios objetivo
            </label>
            <Textarea
              id="target-users"
              value={newRule.targetUsers.join(", ")}
              onChange={handleTargetUsersChange}
              placeholder="@usuario1, @usuario2, @usuario3"
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              Introduce los nombres de usuario separados por comas.
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="rule-frequency" className="text-sm font-medium">
              Frecuencia de scraping
            </label>
            <Select
              value={newRule.frequency}
              onValueChange={(value) => setNewRule({ ...newRule, frequency: value as "hourly" | "daily" | "weekly" })}
            >
              <SelectTrigger id="rule-frequency">
                <SelectValue placeholder="Selecciona frecuencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Cada hora</SelectItem>
                <SelectItem value="daily">Diaria</SelectItem>
                <SelectItem value="weekly">Semanal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="rule-keywords" className="text-sm font-medium">
              Palabras clave (opcional)
            </label>
            <Textarea
              id="rule-keywords"
              value={newRule.keywords.join(", ")}
              onChange={handleKeywordsChange}
              placeholder="SEO, marketing, digital"
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              Solo se scrapearán publicaciones que contengan estas palabras clave.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-comment"
              checked={newRule.autoComment}
              onCheckedChange={(checked) => setNewRule({ ...newRule, autoComment: checked })}
            />
            <Label htmlFor="auto-comment">Comentar automáticamente</Label>
          </div>
          
          {newRule.autoComment && (
            <div className="space-y-2">
              <label htmlFor="comment-template" className="text-sm font-medium">
                Plantilla de comentario
              </label>
              <Textarea
                id="comment-template"
                value={newRule.commentTemplate}
                onChange={(e) => setNewRule({ ...newRule, commentTemplate: e.target.value })}
                placeholder="Interesante perspectiva sobre {{keyword}}. Has considerado también {{suggestion}}?"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Usa {"{{keyword}}"} para insertar la palabra clave detectada y {"{{suggestion}}"} para una sugerencia generada.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full"
            onClick={handleAddRule}
            disabled={!newRule.name || newRule.targetUsers.length === 0}
          >
            Guardar regla
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
