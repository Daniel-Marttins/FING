import { useState, useCallback } from 'react';
import { AdminConfig } from '@/types';
import { useToast } from '@/hooks/use-toast';

const initialConfig: AdminConfig = {
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
};

export function useAdminConfig() {
  const { toast } = useToast();
  const [config, setConfig] = useState<AdminConfig>(initialConfig);
  const [isLoading, setIsLoading] = useState(false);

  const updateConfig = useCallback((section: keyof AdminConfig, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }, []);

  const saveConfig = useCallback(async () => {
    setIsLoading(true);
    try {
      // Here you would typically save to an API
      // await saveConfigToAPI(config);
      
      toast({
        title: "Configurações salvas",
        description: "As configurações foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [config, toast]);

  const exportConfig = useCallback(() => {
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
  }, [config, toast]);

  const resetConfig = useCallback(() => {
    setConfig(initialConfig);
    toast({
      title: "Configurações resetadas",
      description: "As configurações foram restauradas aos valores padrão.",
    });
  }, [toast]);

  return {
    config,
    isLoading,
    updateConfig,
    saveConfig,
    exportConfig,
    resetConfig,
  };
}
