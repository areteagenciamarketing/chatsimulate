
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FadeIn } from "@/components/ui/motion";
import { ScrapedContent, ScrapingRule } from "./types";
import { ScrapedContentList } from "./ScrapedContentList";
import { ScrapingRulesList } from "./ScrapingRulesList";
import { NewRuleForm } from "./NewRuleForm";

const ContentScraper = () => {
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

  const handleAddRule = (newRule: ScrapingRule) => {
    setScrapingRules([...scrapingRules, newRule]);
  };

  const toggleRuleStatus = (id: string) => {
    setScrapingRules(
      scrapingRules.map((rule) =>
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="content">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="content">Contenido</TabsTrigger>
          <TabsTrigger value="rules">Reglas de scraping</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
          <ScrapedContentList 
            scrapedContent={scrapedContent}
            onScrapedContentChange={setScrapedContent}
          />
        </TabsContent>
        
        <TabsContent value="rules">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrapingRulesList
                scrapingRules={scrapingRules}
                onToggleRuleStatus={toggleRuleStatus}
              />
              <NewRuleForm onAddRule={handleAddRule} />
            </div>
          </FadeIn>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentScraper;
