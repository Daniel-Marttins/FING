export interface AdminConfig {
  general: {
    siteName: string;
    adminEmail: string;
    supportEmail: string;
    timezone: string;
    language: string;
    maintenanceMode: boolean;
    debugMode: boolean;
  };
  email: {
    provider: string;
    smtpHost: string;
    smtpPort: string;
    smtpUser: string;
    smtpPassword: string;
    smtpEncryption: string;
    fromName: string;
    fromEmail: string;
  };
  registration: {
    enabled: boolean;
    requireApproval: boolean;
    maxParticipants: number;
    registrationStart: string;
    registrationEnd: string;
    waitingList: boolean;
    requirePayment: boolean;
    paymentProvider: string;
  };
  security: {
    sessionTimeout: number;
    passwordMinLength: number;
    requireSpecialChars: boolean;
    maxLoginAttempts: number;
    lockoutDuration: number;
    twoFactorAuth: boolean;
    allowedFileTypes: string;
    maxFileSize: number;
  };
  integrations: {
    googleAnalytics: string;
    facebookPixel: string;
    googleMaps: string;
    recaptchaSiteKey: string;
    recaptchaSecretKey: string;
    socialLoginGoogle: boolean;
    socialLoginFacebook: boolean;
    socialLoginLinkedin: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    registrationConfirmation: boolean;
    eventReminders: boolean;
    adminNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
}

export interface TimezoneOption {
  value: string;
  label: string;
}

export interface LanguageOption {
  value: string;
  label: string;
}
