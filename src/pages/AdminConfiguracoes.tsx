import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Save,
  Download,
  RefreshCw,
  Trash2,
  Shield,
  Mail,
  Database,
  Globe,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAdminConfig } from "@/hooks";
import { TimezoneOption, LanguageOption } from "@/types";

const timezones: TimezoneOption[] = [
  { value: "America/Sao_Paulo", label: "Brasília (UTC-3)" },
  { value: "America/New_York", label: "Nova York (UTC-5)" },
  { value: "Europe/London", label: "Londres (UTC+0)" },
  { value: "Europe/Paris", label: "Paris (UTC+1)" },
  { value: "Asia/Tokyo", label: "Tóquio (UTC+9)" },
];

const languages: LanguageOption[] = [
  { value: "pt-BR", label: "Português (Brasil)" },
  { value: "en-US", label: "English (US)" },
  { value: "es-ES", label: "Español" },
  { value: "fr-FR", label: "Français" },
];

export default function AdminConfiguracoes() {
  const {
    config,
    isLoading,
    updateConfig,
    saveConfig,
    exportConfig,
    resetConfig,
  } = useAdminConfig();

  const handleTestEmail = () => {
    // Simulate email test
    console.log("Testing email configuration...");
  };

  const handleClearCache = () => {
    // Simulate cache clear
    console.log("Clearing cache...");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Configure o sistema e integrações
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportConfig}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button
            onClick={saveConfig}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isLoading ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="email">E-mail</TabsTrigger>
          <TabsTrigger value="registration">Inscrições</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        {/* Configurações Gerais */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Configurações Básicas
                </CardTitle>
                <CardDescription>
                  Configurações fundamentais do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={config.general.siteName}
                    onChange={(e) =>
                      updateConfig("general", "siteName", e.target.value)
                    }
                    placeholder="Nome do site"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminEmail">E-mail do Administrador</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={config.general.adminEmail}
                    onChange={(e) =>
                      updateConfig("general", "adminEmail", e.target.value)
                    }
                    placeholder="admin@exemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportEmail">E-mail de Suporte</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={config.general.supportEmail}
                    onChange={(e) =>
                      updateConfig("general", "supportEmail", e.target.value)
                    }
                    placeholder="suporte@exemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select
                    value={config.general.timezone}
                    onValueChange={(value) =>
                      updateConfig("general", "timezone", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={config.general.language}
                    onValueChange={(value) =>
                      updateConfig("general", "language", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modo de Operação</CardTitle>
                <CardDescription>
                  Configure o modo de funcionamento do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo de Manutenção</Label>
                    <p className="text-sm text-muted-foreground">
                      Desativa o site para manutenção
                    </p>
                  </div>
                  <Switch
                    checked={config.general.maintenanceMode}
                    onCheckedChange={(checked) =>
                      updateConfig("general", "maintenanceMode", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo Debug</Label>
                    <p className="text-sm text-muted-foreground">
                      Exibe informações detalhadas de erro
                    </p>
                  </div>
                  <Switch
                    checked={config.general.debugMode}
                    onCheckedChange={(checked) =>
                      updateConfig("general", "debugMode", checked)
                    }
                  />
                </div>

                {config.general.maintenanceMode && (
                  <Alert>
                    <AlertDescription>
                      O site está em modo de manutenção. Apenas administradores
                      podem acessar.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="pt-4">
                  <Button
                    onClick={resetConfig}
                    variant="outline"
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Restaurar Padrões
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configurações de E-mail */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Configurações de E-mail
              </CardTitle>
              <CardDescription>
                Configure o provedor de e-mail para envio de mensagens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Servidor SMTP</h4>

                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">Servidor SMTP</Label>
                    <Input
                      id="smtpHost"
                      value={config.email.smtpHost}
                      onChange={(e) =>
                        updateConfig("email", "smtpHost", e.target.value)
                      }
                      placeholder="smtp.gmail.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">Porta</Label>
                      <Input
                        id="smtpPort"
                        value={config.email.smtpPort}
                        onChange={(e) =>
                          updateConfig("email", "smtpPort", e.target.value)
                        }
                        placeholder="587"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpEncryption">Criptografia</Label>
                      <Select
                        value={config.email.smtpEncryption}
                        onValueChange={(value) =>
                          updateConfig("email", "smtpEncryption", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Nenhuma</SelectItem>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">Usuário</Label>
                    <Input
                      id="smtpUser"
                      value={config.email.smtpUser}
                      onChange={(e) =>
                        updateConfig("email", "smtpUser", e.target.value)
                      }
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Senha</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={config.email.smtpPassword}
                      onChange={(e) =>
                        updateConfig("email", "smtpPassword", e.target.value)
                      }
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Remetente Padrão</h4>

                  <div className="space-y-2">
                    <Label htmlFor="fromName">Nome do Remetente</Label>
                    <Input
                      id="fromName"
                      value={config.email.fromName}
                      onChange={(e) =>
                        updateConfig("email", "fromName", e.target.value)
                      }
                      placeholder="FING 2024"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">E-mail do Remetente</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={config.email.fromEmail}
                      onChange={(e) =>
                        updateConfig("email", "fromEmail", e.target.value)
                      }
                      placeholder="noreply@fing2024.com.br"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleTestEmail}
                      variant="outline"
                      className="w-full"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar E-mail de Teste
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificações por E-mail</CardTitle>
              <CardDescription>
                Configure quais notificações serão enviadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Confirmação de Inscrição</Label>
                    <p className="text-sm text-muted-foreground">
                      E-mail após inscrição
                    </p>
                  </div>
                  <Switch
                    checked={config.notifications.registrationConfirmation}
                    onCheckedChange={(checked) =>
                      updateConfig(
                        "notifications",
                        "registrationConfirmation",
                        checked,
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lembretes do Evento</Label>
                    <p className="text-sm text-muted-foreground">
                      Lembretes antes do evento
                    </p>
                  </div>
                  <Switch
                    checked={config.notifications.eventReminders}
                    onCheckedChange={(checked) =>
                      updateConfig("notifications", "eventReminders", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações Admin</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações para administradores
                    </p>
                  </div>
                  <Switch
                    checked={config.notifications.adminNotifications}
                    onCheckedChange={(checked) =>
                      updateConfig(
                        "notifications",
                        "adminNotifications",
                        checked,
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Envio via SMS (requer integração)
                    </p>
                  </div>
                  <Switch
                    checked={config.notifications.smsNotifications}
                    onCheckedChange={(checked) =>
                      updateConfig("notifications", "smsNotifications", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sistema */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Manutenção do Sistema
                </CardTitle>
                <CardDescription>
                  Ferramentas de manutenção e otimização
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleClearCache}
                  variant="outline"
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Limpar Cache
                </Button>

                <Button variant="outline" className="w-full">
                  <Database className="w-4 h-4 mr-2" />
                  Otimizar Banco de Dados
                </Button>

                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Backup do Sistema
                </Button>

                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpar Logs Antigos
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações do Sistema</CardTitle>
                <CardDescription>
                  Estatísticas e informações técnicas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">127</div>
                    <div className="text-sm text-muted-foreground">
                      Usuários Ativos
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">456</div>
                    <div className="text-sm text-muted-foreground">
                      Total de Inscrições
                    </div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">89%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">2.4GB</div>
                    <div className="text-sm text-muted-foreground">
                      Espaço Usado
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Placeholder tabs for other sections */}
        <TabsContent value="registration">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Inscrições</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configurações de inscrições implementadas aqui...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Configurações de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configurações de segurança implementadas aqui...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configurações de integrações implementadas aqui...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
