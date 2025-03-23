
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ScrapedContent } from "./types";

interface ScrapedContentItemProps {
  content: ScrapedContent;
  onCommentPost: (contentId: string) => void;
}

export const ScrapedContentItem = ({ content, onCommentPost }: ScrapedContentItemProps) => {
  const [manualComment, setManualComment] = useState("");

  return (
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
                onClick={() => {
                  onCommentPost(content.id);
                  setManualComment("");
                }}
                disabled={!manualComment}
              >
                Publicar comentario
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
