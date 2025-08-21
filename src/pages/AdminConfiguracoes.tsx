import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
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
  Upload,
  RefreshCw,
  Trash2,
  Shield,
  Mail,
  Database,
  Globe,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminConfiguracoes() {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    general: {
      siteName: "FING 2024",
      adminEmail: "admin@fing2024.com.br",
      supportEmail: "suporte@fing2024.com.br",
      timezone: "America/Sao_Paulo",
      language: "pt-BR",
      maintenanceMode: false,
      debugMode: false,
    },
    email: {
      provider: "smtp",
      smtpHost: "smtp.gmail.com",
      smtpPort: "587",
      smtpUser: "",
      smtpPassword: "",
      smtpEncryption: "tls",
      fromName: "FING 2024",
      fromEmail: "noreply@fing2024.com.br",
    },
    registration: {
      enabled: true,
      requireApproval: false,
      maxParticipants: 500,
      registrationStart: "2024-01-01T00:00",
      registrationEnd: "2024-03-10T23:59",
      waitingList: true,
      requirePayment: false,
      paymentProvider: "stripe",
    },
    security: {
      sessionTimeout: 24,
      passwordMinLength: 8,
      requireSpecialChars: true,
      maxLoginAttempts: 5,
      lockoutDuration: 30,
      twoFactorAuth: false,
      allowedFileTypes: ".jpg,.jpeg,.png,.pdf,.doc,.docx",
      maxFileSize: 5,
    },
    integrations: {
      googleAnalytics: "",
      facebookPixel: "",
      googleMaps: "",
      recaptchaSiteKey: "",
      recaptchaSecretKey: "",
      socialLoginGoogle: false,
      socialLoginFacebook: false,
      socialLoginLinkedin: false,
    },
    notifications: {
      emailNotifications: true,
      registrationConfirmation: true,
      eventReminders: true,
      adminNotifications: true,
      smsNotifications: false,
      pushNotifications: false,
    },
  });

  const timezones = [
    { value: "America/Sao_Paulo", label: "Brasília (UTC-3)" },
    { value: "America/New_York", label: "Nova York (UTC-5)" },
    { value: "Europe/London", label: "Londres (UTC+0)" },
    { value: "Europe/Paris", label: "Paris (UTC+1)" },
    { value: "Asia/Tokyo", label: "Tóquio (UTC+9)" },
  ];

  const languages = [
    { value: "pt-BR", label: "Português (Brasil)" },
    { value: "en-US", label: "English (US)" },
    { value: "es-ES", label: "Español" },
    { value: "fr-FR", label: "Français" },
  ];

  const handleConfigChange = (section: string, field: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações foram atualizadas com sucesso.",
    });
  };

  const handleExportConfig = () => {
    const configData = JSON.stringify(config, null, 2);
    const blob = new Blob([configData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "configuracoes-fing.json";
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Configurações exportadas",
      description: "O arquivo de configuração foi baixado.",
    });
  };

  const handleTestEmail = () => {
    toast({
      title: "Email de teste enviado",
      description:
        "Verifique sua caixa de entrada para confirmar as configurações.",
    });
  };

  const handleClearCache = () => {
    toast({
      title: "Cache limpo",
      description: "O cache do sistema foi limpo com sucesso.",
    });
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
          <Button variant="outline" onClick={handleExportConfig}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Salvar Configurações
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
                      handleConfigChange("general", "siteName", e.target.value)
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
                      handleConfigChange(
                        "general",
                        "adminEmail",
                        e.target.value,
                      )
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
                      handleConfigChange(
                        "general",
                        "supportEmail",
                        e.target.value,
                      )
                    }
                    placeholder="suporte@exemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select
                    value={config.general.timezone}
                    onValueChange={(value) =>
                      handleConfigChange("general", "timezone", value)
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
                      handleConfigChange("general", "language", value)
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
                      handleConfigChange("general", "maintenanceMode", checked)
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
                      handleConfigChange("general", "debugMode", checked)
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
                        handleConfigChange("email", "smtpHost", e.target.value)
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
                          handleConfigChange(
                            "email",
                            "smtpPort",
                            e.target.value,
                          )
                        }
                        placeholder="587"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpEncryption">Criptografia</Label>
                      <Select
                        value={config.email.smtpEncryption}
                        onValueChange={(value) =>
                          handleConfigChange("email", "smtpEncryption", value)
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
                        handleConfigChange("email", "smtpUser", e.target.value)
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
                        handleConfigChange(
                          "email",
                          "smtpPassword",
                          e.target.value,
                        )
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
                        handleConfigChange("email", "fromName", e.target.value)
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
                        handleConfigChange("email", "fromEmail", e.target.value)
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
                      handleConfigChange(
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
                      handleConfigChange(
                        "notifications",
                        "eventReminders",
                        checked,
                      )
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
                      handleConfigChange(
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
                      handleConfigChange(
                        "notifications",
                        "smsNotifications",
                        checked,
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Inscrições */}
        <TabsContent value="registration" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Inscrições</CardTitle>
                <CardDescription>
                  Configure como as inscrições funcionam
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Inscrições Ativas</Label>
                    <p className="text-sm text-muted-foreground">
                      Permite novas inscrições
                    </p>
                  </div>
                  <Switch
                    checked={config.registration.enabled}
                    onCheckedChange={(checked) =>
                      handleConfigChange("registration", "enabled", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Aprovação Manual</Label>
                    <p className="text-sm text-muted-foreground">
                      Inscrições precisam de aprovação
                    </p>
                  </div>
                  <Switch
                    checked={config.registration.requireApproval}
                    onCheckedChange={(checked) =>
                      handleConfigChange(
                        "registration",
                        "requireApproval",
                        checked,
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lista de Espera</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativa lista quando lotado
                    </p>
                  </div>
                  <Switch
                    checked={config.registration.waitingList}
                    onCheckedChange={(checked) =>
                      handleConfigChange("registration", "waitingList", checked)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">
                    Máximo de Participantes
                  </Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={config.registration.maxParticipants}
                    onChange={(e) =>
                      handleConfigChange(
                        "registration",
                        "maxParticipants",
                        parseInt(e.target.value),
                      )
                    }
                    placeholder="500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Período de Inscrições</CardTitle>
                <CardDescription>
                  Defina quando as inscrições estarão abertas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="registrationStart">
                    Início das Inscrições
                  </Label>
                  <Input
                    id="registrationStart"
                    type="datetime-local"
                    value={config.registration.registrationStart}
                    onChange={(e) =>
                      handleConfigChange(
                        "registration",
                        "registrationStart",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationEnd">Fim das Inscrições</Label>
                  <Input
                    id="registrationEnd"
                    type="datetime-local"
                    value={config.registration.registrationEnd}
                    onChange={(e) =>
                      handleConfigChange(
                        "registration",
                        "registrationEnd",
                        e.target.value,
                      )
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Pagamento Obrigatório</Label>
                    <p className="text-sm text-muted-foreground">
                      Inscrição requer pagamento
                    </p>
                  </div>
                  <Switch
                    checked={config.registration.requirePayment}
                    onCheckedChange={(checked) =>
                      handleConfigChange(
                        "registration",
                        "requirePayment",
                        checked,
                      )
                    }
                  />
                </div>

                {config.registration.requirePayment && (
                  <div className="space-y-2">
                    <Label htmlFor="paymentProvider">
                      Provedor de Pagamento
                    </Label>
                    <Select
                      value={config.registration.paymentProvider}
                      onValueChange={(value) =>
                        handleConfigChange(
                          "registration",
                          "paymentProvider",
                          value,
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="mercadopago">
                          Mercado Pago
                        </SelectItem>
                        <SelectItem value="pagseguro">PagSeguro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configurações de Segurança */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Autenticação
                </CardTitle>
                <CardDescription>
                  Configure políticas de senha e login
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Timeout da Sessão (horas)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={config.security.sessionTimeout}
                    onChange={(e) =>
                      handleConfigChange(
                        "security",
                        "sessionTimeout",
                        parseInt(e.target.value),
                      )
                    }
                    placeholder="24"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">
                    Tamanho Mínimo da Senha
                  </Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={config.security.passwordMinLength}
                    onChange={(e) =>
                      handleConfigChange(
                        "security",
                        "passwordMinLength",
                        parseInt(e.target.value),
                      )
                    }
                    placeholder="8"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Caracteres Especiais</Label>
                    <p className="text-sm text-muted-foreground">
                      Obrigar caracteres especiais na senha
                    </p>
                  </div>
                  <Switch
                    checked={config.security.requireSpecialChars}
                    onCheckedChange={(checked) =>
                      handleConfigChange(
                        "security",
                        "requireSpecialChars",
                        checked,
                      )
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">
                    Máximo de Tentativas de Login
                  </Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={config.security.maxLoginAttempts}
                    onChange={(e) =>
                      handleConfigChange(
                        "security",
                        "maxLoginAttempts",
                        parseInt(e.target.value),
                      )
                    }
                    placeholder="5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lockoutDuration">
                    Duração do Bloqueio (minutos)
                  </Label>
                  <Input
                    id="lockoutDuration"
                    type="number"
                    value={config.security.lockoutDuration}
                    onChange={(e) =>
                      handleConfigChange(
                        "security",
                        "lockoutDuration",
                        parseInt(e.target.value),
                      )
                    }
                    placeholder="30"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativar autenticação em dois fatores
                    </p>
                  </div>
                  <Switch
                    checked={config.security.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      handleConfigChange("security", "twoFactorAuth", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload de Arquivos</CardTitle>
                <CardDescription>
                  Configure restrições para upload de arquivos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="allowedFileTypes">
                    Tipos de Arquivo Permitidos
                  </Label>
                  <Input
                    id="allowedFileTypes"
                    value={config.security.allowedFileTypes}
                    onChange={(e) =>
                      handleConfigChange(
                        "security",
                        "allowedFileTypes",
                        e.target.value,
                      )
                    }
                    placeholder=".jpg,.jpeg,.png,.pdf"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separados por vírgula (ex: .jpg,.png,.pdf)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Tamanho Máximo (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={config.security.maxFileSize}
                    onChange={(e) =>
                      handleConfigChange(
                        "security",
                        "maxFileSize",
                        parseInt(e.target.value),
                      )
                    }
                    placeholder="5"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrações */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Analytics e Tracking</CardTitle>
                <CardDescription>
                  Configure ferramentas de análise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                  <Input
                    id="googleAnalytics"
                    value={config.integrations.googleAnalytics}
                    onChange={(e) =>
                      handleConfigChange(
                        "integrations",
                        "googleAnalytics",
                        e.target.value,
                      )
                    }
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebookPixel">Facebook Pixel ID</Label>
                  <Input
                    id="facebookPixel"
                    value={config.integrations.facebookPixel}
                    onChange={(e) =>
                      handleConfigChange(
                        "integrations",
                        "facebookPixel",
                        e.target.value,
                      )
                    }
                    placeholder="123456789012345"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="googleMaps">Google Maps API Key</Label>
                  <Input
                    id="googleMaps"
                    value={config.integrations.googleMaps}
                    onChange={(e) =>
                      handleConfigChange(
                        "integrations",
                        "googleMaps",
                        e.target.value,
                      )
                    }
                    placeholder="AIzaSy..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>reCAPTCHA</CardTitle>
                <CardDescription>
                  Configure proteção contra bots
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recaptchaSiteKey">Site Key</Label>
                  <Input
                    id="recaptchaSiteKey"
                    value={config.integrations.recaptchaSiteKey}
                    onChange={(e) =>
                      handleConfigChange(
                        "integrations",
                        "recaptchaSiteKey",
                        e.target.value,
                      )
                    }
                    placeholder="6Lc..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recaptchaSecretKey">Secret Key</Label>
                  <Input
                    id="recaptchaSecretKey"
                    type="password"
                    value={config.integrations.recaptchaSecretKey}
                    onChange={(e) =>
                      handleConfigChange(
                        "integrations",
                        "recaptchaSecretKey",
                        e.target.value,
                      )
                    }
                    placeholder="6Lc..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Login Social</CardTitle>
                <CardDescription>
                  Configure login com redes sociais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Google</Label>
                      <p className="text-sm text-muted-foreground">
                        Login com Google
                      </p>
                    </div>
                    <Switch
                      checked={config.integrations.socialLoginGoogle}
                      onCheckedChange={(checked) =>
                        handleConfigChange(
                          "integrations",
                          "socialLoginGoogle",
                          checked,
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Facebook</Label>
                      <p className="text-sm text-muted-foreground">
                        Login com Facebook
                      </p>
                    </div>
                    <Switch
                      checked={config.integrations.socialLoginFacebook}
                      onCheckedChange={(checked) =>
                        handleConfigChange(
                          "integrations",
                          "socialLoginFacebook",
                          checked,
                        )
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>LinkedIn</Label>
                      <p className="text-sm text-muted-foreground">
                        Login com LinkedIn
                      </p>
                    </div>
                    <Switch
                      checked={config.integrations.socialLoginLinkedin}
                      onCheckedChange={(checked) =>
                        handleConfigChange(
                          "integrations",
                          "socialLoginLinkedin",
                          checked,
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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

                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Restaurar Backup
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logs do Sistema</CardTitle>
                <CardDescription>Visualize e gerencie logs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Ver Logs de Erro
                </Button>

                <Button variant="outline" className="w-full">
                  Ver Logs de Acesso
                </Button>

                <Button variant="outline" className="w-full">
                  Ver Logs de Segurança
                </Button>

                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Limpar Logs Antigos
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Informações do Sistema</CardTitle>
                <CardDescription>
                  Estatísticas e informações técnicas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
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
      </Tabs>
    </div>
  );
}
