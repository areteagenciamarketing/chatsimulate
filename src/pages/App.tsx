
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountManager from "@/components/accounts/AccountManager";
import MessageAutomation from "@/components/automation/MessageAutomation";
import ContentScraper from "@/components/scraper/ContentScraper";
import BotIntegration from "@/components/bots/BotIntegration";
import Sidebar from "@/components/layout/Sidebar";

const AppDashboard = () => {
  const [activeTab, setActiveTab] = useState("accounts");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="accounts">Cuentas</TabsTrigger>
            <TabsTrigger value="messages">Mensajes</TabsTrigger>
            <TabsTrigger value="scraper">Scraper</TabsTrigger>
            <TabsTrigger value="bots">Chatbots</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="space-y-4">
            <AccountManager />
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-4">
            <MessageAutomation />
          </TabsContent>
          
          <TabsContent value="scraper" className="space-y-4">
            <ContentScraper />
          </TabsContent>
          
          <TabsContent value="bots" className="space-y-4">
            <BotIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppDashboard;
