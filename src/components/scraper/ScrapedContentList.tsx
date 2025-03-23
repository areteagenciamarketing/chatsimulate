
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { useToast } from "@/components/ui/use-toast";
import { ScrapedContent } from "./types";
import { ScrapedContentItem } from "./ScrapedContentItem";

interface ScrapedContentListProps {
  scrapedContent: ScrapedContent[];
  onScrapedContentChange: (updatedContent: ScrapedContent[]) => void;
}

export const ScrapedContentList = ({ 
  scrapedContent,
  onScrapedContentChange
}: ScrapedContentListProps) => {
  const { toast } = useToast();

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

  const handlePostComment = (contentId: string) => {
    toast({
      title: "Comentario publicado",
      description: "Tu comentario ha sido enviado correctamente.",
    });
    
    onScrapedContentChange(
      scrapedContent.map((content) =>
        content.id === contentId
          ? { ...content, hasBeenCommented: true }
          : content
      )
    );
  };

  return (
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
            <ScrapedContentItem 
              key={content.id} 
              content={content} 
              onCommentPost={handlePostComment} 
            />
          ))
        )}
      </div>
    </FadeIn>
  );
};
