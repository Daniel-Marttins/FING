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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Save, Palette, Eye, RotateCcw, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminTema() {
  const { toast } = useToast();
  const [themeData, setThemeData] = useState({
    colors: {
      primary: "#8B5CF6",
      secondary: "#F59E0B",
      accent: "#06B6D4",
      background: "#FFFFFF",
      surface: "#F8FAFC",
      text: "#1F2937",
      textSecondary: "#6B7280",
      border: "#E5E7EB",
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
    },
    typography: {
      fontFamily: "Inter",
      headingFont: "Poppins",
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
      },
    },
    layout: {
      borderRadius: 8,
      spacing: 16,
      maxWidth: 1200,
      headerHeight: 64,
      sidebarWidth: 256,
    },
    effects: {
      shadows: true,
      animations: true,
      gradients: true,
      blur: true,
    },
    branding: {
      logoPosition: "left",
      logoSize: "medium",
      showTagline: true,
      brandColors: true,
    },
  });

  const [selectedColorScheme, setSelectedColorScheme] = useState("custom");

  const colorSchemes = {
    light: {
      name: "Claro",
      colors: {
        primary: "#3B82F6",
        secondary: "#F59E0B",
        accent: "#06B6D4",
        background: "#FFFFFF",
        surface: "#F8FAFC",
        text: "#1F2937",
        textSecondary: "#6B7280",
        border: "#E5E7EB",
      },
    },
    dark: {
      name: "Escuro",
      colors: {
        primary: "#8B5CF6",
        secondary: "#F59E0B",
        accent: "#06B6D4",
        background: "#111827",
        surface: "#1F2937",
        text: "#F9FAFB",
        textSecondary: "#D1D5DB",
        border: "#374151",
      },
    },
    tech: {
      name: "Tech",
      colors: {
        primary: "#8B5CF6",
        secondary: "#EC4899",
        accent: "#06B6D4",
        background: "#0F172A",
        surface: "#1E293B",
        text: "#F1F5F9",
        textSecondary: "#CBD5E1",
        border: "#334155",
      },
    },
    nature: {
      name: "Natureza",
      colors: {
        primary: "#059669",
        secondary: "#F59E0B",
        accent: "#06B6D4",
        background: "#FFFFFF",
        surface: "#F0FDF4",
        text: "#064E3B",
        textSecondary: "#6B7280",
        border: "#D1FAE5",
      },
    },
  };

  const fontOptions = [
    { value: "Inter", label: "Inter (Moderno)" },
    { value: "Poppins", label: "Poppins (Amigável)" },
    { value: "Roboto", label: "Roboto (Limpo)" },
    { value: "Open Sans", label: "Open Sans (Legível)" },
    { value: "Lato", label: "Lato (Profissional)" },
    { value: "Montserrat", label: "Montserrat (Elegante)" },
  ];

  const handleColorChange = (colorKey: string, value: string) => {
    setThemeData((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value,
      },
    }));
    setSelectedColorScheme("custom");
  };

  const handleSchemeChange = (scheme: string) => {
    if (scheme !== "custom") {
      const selectedScheme = colorSchemes[scheme as keyof typeof colorSchemes];
      setThemeData((prev) => ({
        ...prev,
        colors: {
          ...prev.colors,
          ...selectedScheme.colors,
        },
      }));
    }
    setSelectedColorScheme(scheme);
  };

  const handleTypographyChange = (
    section: string,
    field: string,
    value: any,
  ) => {
    setThemeData((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [section]:
          typeof prev.typography[section as keyof typeof prev.typography] ===
          "object"
            ? {
                ...prev.typography[section as keyof typeof prev.typography],
                [field]: value,
              }
            : value,
      },
    }));
  };

  const handleLayoutChange = (field: string, value: any) => {
    setThemeData((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        [field]: value,
      },
    }));
  };

  const handleEffectChange = (field: string, value: boolean) => {
    setThemeData((prev) => ({
      ...prev,
      effects: {
        ...prev.effects,
        [field]: value,
      },
    }));
  };

  const handleBrandingChange = (field: string, value: any) => {
    setThemeData((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    toast({
      title: "Tema salvo",
      description: "As configurações do tema foram aplicadas com sucesso.",
    });
  };

  const handleReset = () => {
    // Reset to default theme
    toast({
      title: "Tema resetado",
      description: "O tema foi restaurado para as configurações padrão.",
    });
  };

  const handleExport = () => {
    const themeConfig = JSON.stringify(themeData, null, 2);
    const blob = new Blob([themeConfig], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tema-fing.json";
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Tema exportado",
      description: "O arquivo de configuração foi baixado.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tema Visual</h1>
          <p className="text-muted-foreground">
            Customize a aparência do site do evento
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Resetar
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Aplicar Tema
          </Button>
        </div>
      </div>

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="colors">Cores</TabsTrigger>
          <TabsTrigger value="typography">Tipografia</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="effects">Efeitos</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Cores */}
        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Esquemas de Cores
              </CardTitle>
              <CardDescription>
                Escolha um esquema pré-definido ou customize suas próprias cores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(colorSchemes).map(([key, scheme]) => (
                    <div
                      key={key}
                      className={`cursor-pointer border rounded-lg p-4 ${
                        selectedColorScheme === key
                          ? "border-primary"
                          : "border-border"
                      }`}
                      onClick={() => handleSchemeChange(key)}
                    >
                      <div className="space-y-2">
                        <div className="flex gap-1">
                          <div
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: scheme.colors.primary }}
                          />
                          <div
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: scheme.colors.secondary }}
                          />
                          <div
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: scheme.colors.accent }}
                          />
                        </div>
                        <p className="text-sm font-medium">{scheme.name}</p>
                      </div>
                    </div>
                  ))}
                  <div
                    className={`cursor-pointer border rounded-lg p-4 ${
                      selectedColorScheme === "custom"
                        ? "border-primary"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedColorScheme("custom")}
                  >
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        <div className="w-6 h-6 rounded bg-gradient-to-r from-primary to-secondary" />
                        <div className="w-6 h-6 rounded bg-gradient-to-r from-secondary to-accent" />
                        <div className="w-6 h-6 rounded bg-gradient-to-r from-accent to-primary" />
                      </div>
                      <p className="text-sm font-medium">Customizado</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Cores Principais</h4>
                    {Object.entries(themeData.colors)
                      .slice(0, 6)
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <Label className="capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="color"
                              value={value}
                              onChange={(e) =>
                                handleColorChange(key, e.target.value)
                              }
                              className="w-12 h-10 p-1 border rounded"
                            />
                            <Input
                              value={value}
                              onChange={(e) =>
                                handleColorChange(key, e.target.value)
                              }
                              className="w-24 text-xs"
                            />
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Cores de Estado</h4>
                    {Object.entries(themeData.colors)
                      .slice(6)
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <Label className="capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="color"
                              value={value}
                              onChange={(e) =>
                                handleColorChange(key, e.target.value)
                              }
                              className="w-12 h-10 p-1 border rounded"
                            />
                            <Input
                              value={value}
                              onChange={(e) =>
                                handleColorChange(key, e.target.value)
                              }
                              className="w-24 text-xs"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tipografia */}
        <TabsContent value="typography" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fontes</CardTitle>
                <CardDescription>
                  Configure as fontes utilizadas no site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Fonte Principal</Label>
                  <Select
                    value={themeData.typography.fontFamily}
                    onValueChange={(value) =>
                      handleTypographyChange("fontFamily", "", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headingFont">Fonte dos Títulos</Label>
                  <Select
                    value={themeData.typography.headingFont}
                    onValueChange={(value) =>
                      handleTypographyChange("headingFont", "", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tamanhos de Fonte</CardTitle>
                <CardDescription>Ajuste os tamanhos de texto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(themeData.typography.fontSize).map(
                  ([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-sm">{key.toUpperCase()}</Label>
                        <span className="text-sm text-muted-foreground">
                          {value}
                        </span>
                      </div>
                      <Slider
                        value={[parseFloat(value)]}
                        onValueChange={([newValue]) =>
                          handleTypographyChange(
                            "fontSize",
                            key,
                            `${newValue}rem`,
                          )
                        }
                        min={0.5}
                        max={4}
                        step={0.125}
                        className="w-full"
                      />
                    </div>
                  ),
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Layout */}
        <TabsContent value="layout" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Dimensões</CardTitle>
                <CardDescription>
                  Configure as dimensões do layout
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    Raio das Bordas: {themeData.layout.borderRadius}px
                  </Label>
                  <Slider
                    value={[themeData.layout.borderRadius]}
                    onValueChange={([value]) =>
                      handleLayoutChange("borderRadius", value)
                    }
                    min={0}
                    max={20}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Espaçamento: {themeData.layout.spacing}px</Label>
                  <Slider
                    value={[themeData.layout.spacing]}
                    onValueChange={([value]) =>
                      handleLayoutChange("spacing", value)
                    }
                    min={8}
                    max={32}
                    step={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Largura Máxima: {themeData.layout.maxWidth}px</Label>
                  <Slider
                    value={[themeData.layout.maxWidth]}
                    onValueChange={([value]) =>
                      handleLayoutChange("maxWidth", value)
                    }
                    min={800}
                    max={1600}
                    step={50}
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Altura do Header: {themeData.layout.headerHeight}px
                  </Label>
                  <Slider
                    value={[themeData.layout.headerHeight]}
                    onValueChange={([value]) =>
                      handleLayoutChange("headerHeight", value)
                    }
                    min={48}
                    max={96}
                    step={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>Configure a exibição da marca</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Posição do Logo</Label>
                  <Select
                    value={themeData.branding.logoPosition}
                    onValueChange={(value) =>
                      handleBrandingChange("logoPosition", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Esquerda</SelectItem>
                      <SelectItem value="center">Centro</SelectItem>
                      <SelectItem value="right">Direita</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tamanho do Logo</Label>
                  <Select
                    value={themeData.branding.logoSize}
                    onValueChange={(value) =>
                      handleBrandingChange("logoSize", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Pequeno</SelectItem>
                      <SelectItem value="medium">Médio</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mostrar Tagline</Label>
                    <p className="text-sm text-muted-foreground">
                      Exibir slogan junto ao logo
                    </p>
                  </div>
                  <Switch
                    checked={themeData.branding.showTagline}
                    onCheckedChange={(checked) =>
                      handleBrandingChange("showTagline", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cores da Marca</Label>
                    <p className="text-sm text-muted-foreground">
                      Usar cores da marca no logo
                    </p>
                  </div>
                  <Switch
                    checked={themeData.branding.brandColors}
                    onCheckedChange={(checked) =>
                      handleBrandingChange("brandColors", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Efeitos */}
        <TabsContent value="effects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Efeitos Visuais</CardTitle>
              <CardDescription>
                Configure os efeitos visuais do site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sombras</Label>
                      <p className="text-sm text-muted-foreground">
                        Adicionar sombras aos elementos
                      </p>
                    </div>
                    <Switch
                      checked={themeData.effects.shadows}
                      onCheckedChange={(checked) =>
                        handleEffectChange("shadows", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Animações</Label>
                      <p className="text-sm text-muted-foreground">
                        Ativar animações e transições
                      </p>
                    </div>
                    <Switch
                      checked={themeData.effects.animations}
                      onCheckedChange={(checked) =>
                        handleEffectChange("animations", checked)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Gradientes</Label>
                      <p className="text-sm text-muted-foreground">
                        Usar gradientes em elementos
                      </p>
                    </div>
                    <Switch
                      checked={themeData.effects.gradients}
                      onCheckedChange={(checked) =>
                        handleEffectChange("gradients", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Blur</Label>
                      <p className="text-sm text-muted-foreground">
                        Efeitos de desfoque em fundos
                      </p>
                    </div>
                    <Switch
                      checked={themeData.effects.blur}
                      onCheckedChange={(checked) =>
                        handleEffectChange("blur", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Preview do Tema
              </CardTitle>
              <CardDescription>
                Visualize como o tema ficará no site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border rounded-lg p-6 space-y-4"
                style={{
                  backgroundColor: themeData.colors.background,
                  color: themeData.colors.text,
                  fontFamily: themeData.typography.fontFamily,
                }}
              >
                <div
                  className="flex items-center justify-between p-4 rounded-lg"
                  style={{
                    backgroundColor: themeData.colors.surface,
                    borderRadius: themeData.layout.borderRadius,
                  }}
                >
                  <h2
                    style={{
                      fontFamily: themeData.typography.headingFont,
                      fontSize: themeData.typography.fontSize["2xl"],
                      color: themeData.colors.primary,
                    }}
                  >
                    FING 2024
                  </h2>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 rounded text-white"
                      style={{
                        backgroundColor: themeData.colors.primary,
                        borderRadius: themeData.layout.borderRadius,
                      }}
                    >
                      Inscreva-se
                    </button>
                    <button
                      className="px-4 py-2 rounded border"
                      style={{
                        borderColor: themeData.colors.border,
                        borderRadius: themeData.layout.borderRadius,
                      }}
                    >
                      Saiba mais
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: themeData.colors.surface,
                      borderRadius: themeData.layout.borderRadius,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: themeData.typography.fontSize.lg,
                        marginBottom: "8px",
                        color: themeData.colors.primary,
                      }}
                    >
                      Palestrantes
                    </h3>
                    <p
                      style={{
                        fontSize: themeData.typography.fontSize.sm,
                        color: themeData.colors.textSecondary,
                      }}
                    >
                      Os melhores profissionais da área
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: themeData.colors.surface,
                      borderRadius: themeData.layout.borderRadius,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: themeData.typography.fontSize.lg,
                        marginBottom: "8px",
                        color: themeData.colors.secondary,
                      }}
                    >
                      Programação
                    </h3>
                    <p
                      style={{
                        fontSize: themeData.typography.fontSize.sm,
                        color: themeData.colors.textSecondary,
                      }}
                    >
                      3 dias de muito conteúdo
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: themeData.colors.surface,
                      borderRadius: themeData.layout.borderRadius,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: themeData.typography.fontSize.lg,
                        marginBottom: "8px",
                        color: themeData.colors.accent,
                      }}
                    >
                      Networking
                    </h3>
                    <p
                      style={{
                        fontSize: themeData.typography.fontSize.sm,
                        color: themeData.colors.textSecondary,
                      }}
                    >
                      Conecte-se com profissionais
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
