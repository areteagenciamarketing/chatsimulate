
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SlideUp, FadeIn } from "@/components/ui/motion";

interface Account {
  id: string;
  username: string;
  profileName: string;
  proxyUrl: string;
  status: "active" | "inactive" | "pending";
  lastActive: string;
}

const AccountManager = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      username: "@usuario1",
      profileName: "Usuario Ejemplo 1",
      proxyUrl: "proxy1.example.com:8080",
      status: "active",
      lastActive: "2023-09-15T14:30:00Z",
    },
    {
      id: "2",
      username: "@usuario2",
      profileName: "Usuario Ejemplo 2",
      proxyUrl: "proxy2.example.com:8080",
      status: "inactive",
      lastActive: "2023-09-10T09:15:00Z",
    },
  ]);

  const [newAccount, setNewAccount] = useState({
    username: "",
    proxyUrl: "",
  });

  const handleAddAccount = () => {
    if (!newAccount.username) return;

    const newAccountItem: Account = {
      id: `${accounts.length + 1}`,
      username: newAccount.username.startsWith("@")
        ? newAccount.username
        : `@${newAccount.username}`,
      profileName: `Usuario ${accounts.length + 1}`,
      proxyUrl: newAccount.proxyUrl || "No configurado",
      status: "pending",
      lastActive: new Date().toISOString(),
    };

    setAccounts([...accounts, newAccountItem]);
    setNewAccount({ username: "", proxyUrl: "" });
  };

  const handleRemoveAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  return (
    <Tabs defaultValue="accounts" className="w-full">
      <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
        <TabsTrigger value="accounts">Cuentas</TabsTrigger>
        <TabsTrigger value="add">Añadir cuenta</TabsTrigger>
      </TabsList>

      <TabsContent value="accounts">
        <SlideUp>
          <div className="space-y-4">
            {accounts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No hay cuentas configuradas</h3>
                <p className="text-muted-foreground mt-2">
                  Agrega tu primera cuenta para comenzar.
                </p>
              </div>
            ) : (
              accounts.map((account) => (
                <Card key={account.id} className="glass-card hover-float">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{account.profileName}</CardTitle>
                        <CardDescription>{account.username}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            account.status === "active"
                              ? "bg-green-500"
                              : account.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        />
                        <span className="text-xs text-muted-foreground capitalize">
                          {account.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Proxy:</span>
                        <span className="font-mono text-xs">{account.proxyUrl}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Última actividad:</span>
                        <span className="text-xs">
                          {new Date(account.lastActive).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex justify-between w-full">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                        onClick={() => handleRemoveAccount(account.id)}
                      >
                        Eliminar
                      </Button>
                      <Button 
                        size="sm"
                        className="text-xs"
                      >
                        Gestionar
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </SlideUp>
      </TabsContent>

      <TabsContent value="add">
        <FadeIn>
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Añadir nueva cuenta</CardTitle>
              <CardDescription>
                Configura una nueva cuenta de X y su proxy asociado.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Nombre de usuario
                </label>
                <Input
                  id="username"
                  placeholder="@usuario"
                  value={newAccount.username}
                  onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="proxy" className="text-sm font-medium">
                  URL del Proxy (opcional)
                </label>
                <Input
                  id="proxy"
                  placeholder="host:puerto"
                  value={newAccount.proxyUrl}
                  onChange={(e) => setNewAccount({ ...newAccount, proxyUrl: e.target.value })}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Formato: host:puerto o usuario:contraseña@host:puerto
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full button-gradient"
                onClick={handleAddAccount}
                disabled={!newAccount.username}
              >
                Añadir cuenta
              </Button>
            </CardFooter>
          </Card>
        </FadeIn>
      </TabsContent>
    </Tabs>
  );
};

export default AccountManager;
