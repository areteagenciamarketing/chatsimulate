
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SlideUp } from "@/components/ui/motion";

interface MessageTemplate {
  id: string;
  name: string;
  content: string;
}

interface Campaign {
  id: string;
  name: string;
  accountId: string;
  templateId: string;
  targetUsers: string[];
  isActive: boolean;
  createdAt: string;
}

const MessageAutomation = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([
    {
      id: "1",
      name: "Plantilla de bienvenida",
      content: "Hola, soy {{nombre}}. Gracias por conectar conmigo en X. Me gustaría saber más sobre tu trabajo.",
    },
    {
      id: "2",
      name: "Promoción producto",
      content: "Hola {{nombre}}, estoy ofreciendo {{producto}} con un descuento especial. ¿Te interesaría saber más?",
    },
  ]);
  
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Campaña de alcance SEO",
      accountId: "1",
      templateId: "1",
      targetUsers: ["@usuario1", "@usuario2"],
      isActive: true,
      createdAt: "2023-09-15T14:30:00Z",
    },
  ]);
  
  const [selectedAccount, setSelectedAccount] = useState("");
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    content: "",
  });
  
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    accountId: "",
    templateId: "",
    targetUsers: "",
  });

  const handleAddTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) return;
    
    const newTemplateItem: MessageTemplate = {
      id: `template-${templates.length + 1}`,
      name: newTemplate.name,
      content: newTemplate.content,
    };
    
    setTemplates([...templates, newTemplateItem]);
    setNewTemplate({ name: "", content: "" });
  };
  
  const handleAddCampaign = () => {
    if (!newCampaign.name || !newCampaign.accountId || !newCampaign.templateId) return;
    
    const newCampaignItem: Campaign = {
      id: `campaign-${campaigns.length + 1}`,
      name: newCampaign.name,
      accountId: newCampaign.accountId,
      templateId: newCampaign.templateId,
      targetUsers: newCampaign.targetUsers.split(',').map(user => user.trim()),
      isActive: false,
      createdAt: new Date().toISOString(),
    };
    
    setCampaigns([...campaigns, newCampaignItem]);
    setNewCampaign({
      name: "",
      accountId: "",
      templateId: "",
      targetUsers: "",
    });
  };

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id
          ? { ...campaign, isActive: !campaign.isActive }
          : campaign
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Plantillas de mensajes */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Plantillas de mensajes</h2>
          <SlideUp>
            <div className="space-y-4">
              {templates.map((template) => (
                <Card key={template.id} className="glass-card hover-float">
                  <CardHeader className="pb-2">
                    <CardTitle>{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap font-sans text-sm p-3 bg-gray-100 dark:bg-gray-800 rounded">
                      {template.content}
                    </pre>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex justify-between w-full">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                      >
                        Eliminar
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              
              <Card>
                <CardHeader>
                  <CardTitle>Nueva plantilla</CardTitle>
                  <CardDescription>
                    Crea una nueva plantilla para tus mensajes automáticos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="template-name" className="text-sm font-medium">
                      Nombre de la plantilla
                    </label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      placeholder="Ej. Mensaje de bienvenida"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="template-content" className="text-sm font-medium">
                      Contenido
                    </label>
                    <Textarea
                      id="template-content"
                      value={newTemplate.content}
                      onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                      placeholder="Hola {{nombre}}, gracias por conectar..."
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Usa {"{{nombre}}"} para personalizar el mensaje con el nombre del usuario.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={handleAddTemplate}
                    disabled={!newTemplate.name || !newTemplate.content}
                  >
                    Guardar plantilla
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </SlideUp>
        </div>
        
        {/* Campañas de mensajes */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Campañas de mensajes</h2>
          <SlideUp>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="glass-card hover-float">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{campaign.name}</CardTitle>
                        <CardDescription>
                          Cuenta: {campaign.accountId} | Plantilla: {
                            templates.find(t => t.id === campaign.templateId)?.name || campaign.templateId
                          }
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={campaign.isActive}
                          onCheckedChange={() => toggleCampaignStatus(campaign.id)}
                        />
                        <span className="text-xs">{campaign.isActive ? "Activa" : "Inactiva"}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Destinatarios:</span>{" "}
                        <span className="font-mono text-xs">
                          {campaign.targetUsers.join(", ")}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Creada:</span>{" "}
                        <span className="text-xs">
                          {new Date(campaign.createdAt).toLocaleString()}
                        </span>
                      </div>
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
                        Ver informe
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              
              <Card>
                <CardHeader>
                  <CardTitle>Nueva campaña</CardTitle>
                  <CardDescription>
                    Configura una nueva campaña de mensajes automáticos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="campaign-name" className="text-sm font-medium">
                      Nombre de la campaña
                    </label>
                    <Input
                      id="campaign-name"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                      placeholder="Ej. Campaña de bienvenida"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="campaign-account" className="text-sm font-medium">
                      Cuenta de X
                    </label>
                    <Select
                      value={newCampaign.accountId}
                      onValueChange={(value) => setNewCampaign({ ...newCampaign, accountId: value })}
                    >
                      <SelectTrigger id="campaign-account">
                        <SelectValue placeholder="Selecciona cuenta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">@usuario1</SelectItem>
                        <SelectItem value="2">@usuario2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="campaign-template" className="text-sm font-medium">
                      Plantilla de mensaje
                    </label>
                    <Select
                      value={newCampaign.templateId}
                      onValueChange={(value) => setNewCampaign({ ...newCampaign, templateId: value })}
                    >
                      <SelectTrigger id="campaign-template">
                        <SelectValue placeholder="Selecciona plantilla" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="campaign-users" className="text-sm font-medium">
                      Usuarios objetivo
                    </label>
                    <Textarea
                      id="campaign-users"
                      value={newCampaign.targetUsers}
                      onChange={(e) => setNewCampaign({ ...newCampaign, targetUsers: e.target.value })}
                      placeholder="@usuario1, @usuario2, @usuario3"
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      Introduce los nombres de usuario separados por comas.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={handleAddCampaign}
                    disabled={!newCampaign.name || !newCampaign.accountId || !newCampaign.templateId}
                  >
                    Crear campaña
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </SlideUp>
        </div>
      </div>
    </div>
  );
};

export default MessageAutomation;
