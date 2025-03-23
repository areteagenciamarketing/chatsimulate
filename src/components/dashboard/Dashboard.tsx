
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AccountManager from "@/components/accounts/AccountManager";
import { SlideUp, FadeIn, SequentialFadeIn } from "@/components/ui/motion";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Datos de demostración para el dashboard
  const stats = [
    { label: "Cuentas activas", value: "2", icon: "👤" },
    { label: "Mensajes enviados", value: "156", icon: "✉️" },
    { label: "Conversaciones", value: "32", icon: "💬" },
    { label: "Publicaciones monitorizadas", value: "87", icon: "🔍" },
  ];

  const recentActivities = [
    { id: 1, account: "@usuario1", action: "Mensaje enviado a @destino1", time: "Hace 2 minutos" },
    { id: 2, account: "@usuario2", action: "Comentario en publicación de @influencer", time: "Hace 15 minutos" },
    { id: 3, account: "@usuario1", action: "Nuevo seguidor: @nuevocontacto", time: "Hace 1 hora" },
    { id: 4, account: "@usuario2", action: "Mensaje programado enviado", time: "Hace 3 horas" },
  ];

  return (
    <div className="container max-w-7xl py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel de control</h1>
          <p className="text-muted-foreground">Gestiona tus cuentas y actividades en X</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            Ver tutoriales
          </Button>
          <Button className="button-gradient">
            Configurar automación
          </Button>
        </div>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-6"
      >
        <div className="sticky top-0 z-20 w-full bg-background/95 backdrop-blur-sm pb-4 border-b">
          <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-full md:w-auto">
            <TabsTrigger value="overview" className="rounded-md px-3">
              Resumen
            </TabsTrigger>
            <TabsTrigger value="accounts" className="rounded-md px-3">
              Cuentas
            </TabsTrigger>
            <TabsTrigger value="messages" className="rounded-md px-3">
              Mensajes
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="rounded-md px-3">
              Monitorización
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-md px-3">
              Configuración
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-8">
          <SequentialFadeIn
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            delay={100}
          >
            {stats.map((stat, i) => (
              <Card key={i} className="glass-card hover-float">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                  <div className="opacity-70 text-lg">{stat.icon}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </SequentialFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle>Actividad reciente</CardTitle>
                  <CardDescription>
                    Las últimas actividades de tus cuentas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div 
                        key={activity.id}
                        className="flex justify-between items-start border-b border-border/50 pb-3 last:border-0 last:pb-0"
                      >
                        <div>
                          <div className="font-medium">{activity.account}</div>
                          <div className="text-sm text-muted-foreground">{activity.action}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle>Acciones rápidas</CardTitle>
                  <CardDescription>
                    Accesos directos a funciones comunes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <span className="mr-2">✉️</span> Enviar mensaje
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span className="mr-2">🔍</span> Monitorizar perfil
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span className="mr-2">💬</span> Respuesta automatizada
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span className="mr-2">📊</span> Ver estadísticas
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="accounts">
          <AccountManager />
        </TabsContent>

        <TabsContent value="messages">
          <SlideUp>
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle>Mensajes Directos</CardTitle>
                <CardDescription>
                  Configuración de mensajes automatizados y seguimiento de conversaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Módulo de mensajes en desarrollo
                  </p>
                  <Button variant="outline">Próximamente</Button>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </TabsContent>

        <TabsContent value="monitoring">
          <SlideUp>
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle>Monitorización</CardTitle>
                <CardDescription>
                  Seguimiento de perfiles y publicaciones para interacción automatizada
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Módulo de monitorización en desarrollo
                  </p>
                  <Button variant="outline">Próximamente</Button>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </TabsContent>

        <TabsContent value="settings">
          <SlideUp>
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>
                  Gestiona las preferencias de tu cuenta y aplicación
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Configuración en desarrollo
                  </p>
                  <Button variant="outline">Próximamente</Button>
                </div>
              </CardContent>
            </Card>
          </SlideUp>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
