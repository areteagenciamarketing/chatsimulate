
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlideUp, FadeIn } from "@/components/ui/motion";
import { useToast } from "@/components/ui/use-toast";

interface BotConfig {
  id: string;
  name: string;
  provider: "openai" | "custom-api" | "other";
  apiKey?: string;
  apiEndpoint?: string;
  prompt?: string;
  isActive: boolean;
  accountIds: string[];
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const BotIntegration = () => {
  const { toast } = useToast();
  
  const [botConfigs, setBotConfigs] = useState<BotConfig[]>([
    {
      id: "1",
      name: "Asistente de ventas",
      provider: "openai",
      prompt: "Eres un asistente de ventas amable que ayuda a responder preguntas sobre nuestros productos de marketing digital.",
      isActive: true,
      accountIds: ["1"],
    },
  ]);
  
  const [newBotConfig, setNewBotConfig] = useState<Partial<BotConfig>>({
    name: "",
    provider: "openai",
    apiKey: "",
    apiEndpoint: "",
    prompt: "",
    accountIds: [],
  });
  
  const [testMessages, setTestMessages] = useState<Message[]>([
    {
      id: "1",
      role: "user",
      content: "Hola, me interesa saber más sobre sus servicios de SEO.",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      role: "assistant",
      content: "¡Hola! Gracias por tu interés en nuestros servicios de SEO. Ofrecemos optimización de palabras clave, análisis de competencia, y estrategias de posicionamiento personalizadas. ¿Hay algún aspecto específico que te interese conocer?",
      timestamp: new Date().toISOString(),
    },
  ]);
  
  const [newMessage, setNewMessage] = useState("");

  const handleAddBot = () => {
    if (!newBotConfig.name || !newBotConfig.provider) return;
    
    const newBot: BotConfig = {
      id: `bot-${botConfigs.length + 1}`,
      name: newBotConfig.name,
      provider: newBotConfig.provider as "openai" | "custom-api" | "other",
      apiKey: newBotConfig.apiKey,
      apiEndpoint: newBotConfig.apiEndpoint,
      prompt: newBotConfig.prompt,
      isActive: false,
      accountIds: Array.isArray(newBotConfig.accountIds) ? newBotConfig.accountIds : [],
    };
    
    setBotConfigs([...botConfigs, newBot]);
    setNewBotConfig({
      name: "",
      provider: "openai",
      apiKey: "",
      apiEndpoint: "",
      prompt: "",
      accountIds: [],
    });
    
    toast({
      title: "Chatbot añadido",
      description: `El chatbot "${newBot.name}" ha sido configurado correctamente.`,
    });
  };

  const toggleBotStatus = (id: string) => {
    setBotConfigs(
      botConfigs.map((bot) =>
        bot.id === id ? { ...bot, isActive: !bot.isActive } : bot
      )
    );
  };

  const handleSendTestMessage = () => {
    if (!newMessage) return;
    
    const userMessage: Message = {
      id: `message-${testMessages.length + 1}`,
      role: "user",
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setTestMessages([...testMessages, userMessage]);
    setNewMessage("");
    
    // Simular respuesta del bot después de un breve retraso
    setTimeout(() => {
      const botResponse: Message = {
        id: `message-${testMessages.length + 2}`,
        role: "assistant",
        content: "Esta es una respuesta simulada del chatbot. En un entorno real, esta respuesta vendría de la API del proveedor seleccionado basándose en el prompt configurado.",
        timestamp: new Date().toISOString(),
      };
      
      setTestMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lista de bots configurados */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Chatbots configurados</h2>
          <SlideUp>
            <div className="space-y-4">
              {botConfigs.length === 0 ? (
                <div className="text-center py-12 border rounded-lg">
                  <h3 className="text-lg font-medium">No hay chatbots configurados</h3>
                  <p className="text-muted-foreground mt-2">
                    Añade tu primer chatbot para automatizar respuestas.
                  </p>
                </div>
              ) : (
                botConfigs.map((bot) => (
                  <Card key={bot.id} className="glass-card hover-float">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{bot.name}</CardTitle>
                          <CardDescription>
                            Proveedor: {bot.provider === "openai" ? "OpenAI" : 
                                      bot.provider === "custom-api" ? "API personalizada" : "Otro"}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={bot.isActive}
                            onCheckedChange={() => toggleBotStatus(bot.id)}
                          />
                          <span className="text-xs">{bot.isActive ? "Activo" : "Inactivo"}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {bot.prompt && (
                          <div className="text-sm">
                            <div className="text-muted-foreground mb-1">Prompt:</div>
                            <div className="text-xs bg-gray-50 dark:bg-gray-900 p-2 rounded border">
                              {bot.prompt}
                            </div>
                          </div>
                        )}
                        <div className="text-sm">
                          <span className="text-muted-foreground">Cuentas asociadas:</span>{" "}
                          <span className="font-mono text-xs">
                            {bot.accountIds.map(id => `@usuario${id}`).join(", ")}
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
                          Probar
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </SlideUp>
        </div>
        
        {/* Configuración de nuevo bot */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Añadir nuevo chatbot</h2>
          <FadeIn>
            <Card>
              <CardHeader>
                <CardTitle>Configuración del chatbot</CardTitle>
                <CardDescription>
                  Conecta un chatbot para automatizar respuestas a mensajes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="bot-name" className="text-sm font-medium">
                    Nombre del chatbot
                  </label>
                  <Input
                    id="bot-name"
                    value={newBotConfig.name || ""}
                    onChange={(e) => setNewBotConfig({ ...newBotConfig, name: e.target.value })}
                    placeholder="Ej. Asistente de ventas"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="bot-provider" className="text-sm font-medium">
                    Proveedor
                  </label>
                  <Select
                    value={newBotConfig.provider}
                    onValueChange={(value) => setNewBotConfig({ ...newBotConfig, provider: value as any })}
                  >
                    <SelectTrigger id="bot-provider">
                      <SelectValue placeholder="Selecciona proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI (GPT)</SelectItem>
                      <SelectItem value="custom-api">API personalizada</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {(newBotConfig.provider === "openai" || newBotConfig.provider === "custom-api") && (
                  <div className="space-y-2">
                    <label htmlFor="api-key" className="text-sm font-medium">
                      Clave API
                    </label>
                    <Input
                      id="api-key"
                      type="password"
                      value={newBotConfig.apiKey || ""}
                      onChange={(e) => setNewBotConfig({ ...newBotConfig, apiKey: e.target.value })}
                      placeholder="sk-..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Esta clave se almacenará de forma segura y nunca se compartirá.
                    </p>
                  </div>
                )}
                
                {newBotConfig.provider === "custom-api" && (
                  <div className="space-y-2">
                    <label htmlFor="api-endpoint" className="text-sm font-medium">
                      URL del endpoint API
                    </label>
                    <Input
                      id="api-endpoint"
                      value={newBotConfig.apiEndpoint || ""}
                      onChange={(e) => setNewBotConfig({ ...newBotConfig, apiEndpoint: e.target.value })}
                      placeholder="https://api.tuservicio.com/chat"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="bot-prompt" className="text-sm font-medium">
                    Prompt inicial (instrucciones)
                  </label>
                  <Textarea
                    id="bot-prompt"
                    value={newBotConfig.prompt || ""}
                    onChange={(e) => setNewBotConfig({ ...newBotConfig, prompt: e.target.value })}
                    placeholder="Eres un asistente amable que ayuda a..."
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Estas instrucciones guiarán el comportamiento del chatbot.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="bot-accounts" className="text-sm font-medium">
                    Cuentas asociadas
                  </label>
                  <Select
                    value={Array.isArray(newBotConfig.accountIds) && newBotConfig.accountIds.length > 0 ? newBotConfig.accountIds[0] : undefined}
                    onValueChange={(value) => setNewBotConfig({ ...newBotConfig, accountIds: [value] })}
                  >
                    <SelectTrigger id="bot-accounts">
                      <SelectValue placeholder="Selecciona cuenta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">@usuario1</SelectItem>
                      <SelectItem value="2">@usuario2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={handleAddBot}
                  disabled={!newBotConfig.name || !newBotConfig.provider}
                >
                  Guardar configuración
                </Button>
              </CardFooter>
            </Card>
            
            {/* Área de prueba de chatbot */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Probar chatbot</CardTitle>
                <CardDescription>
                  Prueba cómo respondería el chatbot a mensajes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg h-64 overflow-y-auto p-4 mb-4 bg-gray-50 dark:bg-gray-900">
                  {testMessages.map((message) => (
                    <div 
                      key={message.id}
                      className={`mb-3 ${
                        message.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div 
                        className={`inline-block p-3 rounded-lg max-w-[80%] ${
                          message.role === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje de prueba..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendTestMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendTestMessage} disabled={!newMessage}>
                    Enviar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default BotIntegration;
