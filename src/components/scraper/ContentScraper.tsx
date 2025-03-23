
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FadeIn } from "@/components/ui/motion";
import { useToast } from "@/components/ui/use-toast";

interface ScrapedContent {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  url: string;
  hasBeenCommented: boolean;
}

interface ScrapingRule {
  id: string;
  name: string;
  targetUsers: string[];
  frequency: "hourly" | "daily" | "weekly";
  keywords: string[];
  autoComment: boolean;
  commentTemplate: string;
  isActive: boolean;
}

const ContentScraper = () => {
  const { toast } = useToast();
  const [scrapedContent, setScrapedContent] = useState<ScrapedContent[]>([
    {
      id: "1",
      username: "@usuario1",
      content: "Este es un post de ejemplo sobre marketing digital y SEO que ha sido scrapeado automáticamente.",
      timestamp: "2023-09-15T14:30:00Z",
      url: "https://twitter.com/usuario1/status/123456789",
      hasBeenCommented: false,
    },
    {
      id: "2",
      username: "@usuario2",
      content: "¿Cuáles son las mejores estrategias de SEO para 2023? Comparto mis pensamientos en este hilo...",
      timestamp: "2023-09-14T10:15:00Z",
      url: "https://twitter.com/usuario2/status/987654321",
      hasBeenCommented: true,
    },
  ]);
  
  const [scrapingRules, setScrapingRules] = useState<ScrapingRule[]>([
    {
      id: "1",
      name: "Monitoreo SEO",
      targetUsers: ["@usuario1", "@usuario2", "@seoexperto"],
      frequency: "daily",
      keywords: ["SEO", "marketing digital", "posicionamiento"],
      autoComment: true,
      commentTemplate: "Interesante perspectiva sobre {{keyword}}. Has considerado también {{suggestion}}?",
      isActive: true,
    },
  ]);

  const [newRule, setNewRule] = useState<Partial<ScrapingRule>>({
    name: "",
    targetUsers: [],
    frequency: "daily",
    keywords: [],
    autoComment: false,
    commentTemplate: "",
    isActive: false,
  });

  const [manualComment, setManualComment] = useState("");

  const handleAddRule = () => {
    if (!newRule.name || !newRule.targetUsers?.length) return;
    
    const newRuleItem: ScrapingRule = {
      id: `rule-${scrapingRules.length + 1}`,
      name: newRule.name || "",
      targetUsers: typeof newRule.targetUsers === 'string' 
        ? newRule.targetUsers.split(',').map(user => user.trim()) 
        : newRule.targetUsers || [],
      frequency: newRule.frequency as "hourly" | "daily" | "weekly" || "daily",
      keywords: typeof newRule.keywords === 'string'
        ? newRule.keywords.split(',').map(keyword => keyword.trim())
        : newRule.keywords || [],
      autoComment: newRule.autoComment || false,
      commentTemplate: newRule.commentTemplate || "",
      isActive: false,
    };
    
    setScrapingRules([...scrapingRules, newRuleItem]);
    setNewRule({
      name: "",
      targetUsers: [],
      frequency: "daily",
      keywords: [],
      autoComment: false,
      commentTemplate: "",
    });
    
    toast({
      title: "Regla de scraping creada",
      description: `Se ha creado la regla "${newRuleItem.name}" correctamente.`,
    });
  };

  const toggleRuleStatus = (id: string) => {
    setScrapingRules(
      scrapingRules.map((rule) =>
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };

  const handlePostComment = (contentId: string) => {
    if (!manualComment) return;
    
    toast({
      title: "Comentario publicado",
      description: "Tu comentario ha sido enviado correctamente.",
    });
    
    setScrapedContent(
      scrapedContent.map((content) =>
        content.id === contentId
          ? { ...content, hasBeenCommented: true }
          : content
      )
    );
    
    setManualComment("");
  };

  const handleManualScrape = () => {
    toast({
      title: "Scraping iniciado",
      description: "Se está realizando el scraping manualmente. Esto puede tardar unos segundos.",
    });
    
    // Simular un scraping con un temporizador
    setTimeout(() => {
      toast({
        title: "Scraping completado",
        description: "Se han encontrado 2 nuevos contenidos.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="content">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="content">Contenido</TabsTrigger>
          <TabsTrigger value="rules">Reglas de scraping</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
          <FadeIn>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Contenido scrapeado</h2>
              <Button onClick={handleManualScrape}>
                Ejecutar scraping ahora
              </Button>
            </div>
            
            <div className="space-y-4">
              {scrapedContent.length === 0 ? (
                <div className="text-center py-12 border rounded-lg">
                  <h3 className="text-lg font-medium">No hay contenido scrapeado</h3>
                  <p className="text-muted-foreground mt-2">
                    Configura reglas de scraping y ejecútalas para comenzar.
                  </p>
                </div>
              ) : (
                scrapedContent.map((content) => (
                  <Card key={content.id} className="glass-card hover-float">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{content.username}</CardTitle>
                          <CardDescription>
                            {new Date(content.timestamp).toLocaleString()}
                          </CardDescription>
                        </div>
                        <a 
                          href={content.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm"
                        >
                          Ver en X
                        </a>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">
                        {content.content}
                      </p>
                      
                      {content.hasBeenCommented ? (
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                          <p className="text-sm text-green-800 dark:text-green-300">
                            Ya has comentado en esta publicación
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="Escribe un comentario para esta publicación..."
                            value={manualComment}
                            onChange={(e) => setManualComment(e.target.value)}
                          />
                          <div className="flex justify-end">
                            <Button 
                              size="sm"
                              onClick={() => handlePostComment(content.id)}
                              disabled={!manualComment}
                            >
                              Publicar comentario
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </FadeIn>
        </TabsContent>
        
        <TabsContent value="rules">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      <Card key={rule.id} className="glass-card hover-float">
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
                                onCheckedChange={() => toggleRuleStatus(rule.id)}
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
                    ))
                  )}
                </div>
              </div>
              
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
                        value={newRule.name || ""}
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
                        value={Array.isArray(newRule.targetUsers) ? newRule.targetUsers.join(", ") : ""}
                        onChange={(e) => setNewRule({ ...newRule, targetUsers: e.target.value.split(",").map(user => user.trim()) })}
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
                        onValueChange={(value) => setNewRule({ ...newRule, frequency: value as any })}
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
                        value={Array.isArray(newRule.keywords) ? newRule.keywords.join(", ") : ""}
                        onChange={(e) => setNewRule({ ...newRule, keywords: e.target.value.split(",").map(keyword => keyword.trim()) })}
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
                          value={newRule.commentTemplate || ""}
                          onChange={(e) => setNewRule({ ...newRule, commentTemplate: e.target.value })}
                          placeholder="Interesante perspectiva sobre {{keyword}}. Has considerado también {{suggestion}}?"
                          rows={3}
                        />
                        <p className="text-xs text-muted-foreground">
                          Usa {{keyword}} para insertar la palabra clave detectada y {{suggestion}} para una sugerencia generada.
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full"
                      onClick={handleAddRule}
                      disabled={!newRule.name || !Array.isArray(newRule.targetUsers) || newRule.targetUsers.length === 0}
                    >
                      Guardar regla
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </FadeIn>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentScraper;
