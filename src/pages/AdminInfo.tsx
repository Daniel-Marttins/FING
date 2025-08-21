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
import { Save, Upload, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminInfo() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    eventName: "FING 2024",
    subtitle: "Festival de Inovação e Tecnologia",
    description:
      "O maior evento de tecnologia da região, reunindo profissionais, estudantes e entusiastas para compartilhar conhecimento e networking.",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    website: "https://fing2024.com.br",
    email: "contato@fing2024.com.br",
    phone: "(11) 9999-9999",
    isActive: true,
    registrationOpen: true,
    maxParticipants: 500,
    currentParticipants: 0,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Aqui você integraria com sua API
    toast({
      title: "Informações salvas",
      description: "As informações gerais foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Informações Gerais</h1>
          <p className="text-muted-foreground">
            Gerencie as informações básicas do evento
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Salvar Alterações
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informações do Evento */}
        <Card>
          <CardHeader>
            <CardTitle>Dados do Evento</CardTitle>
            <CardDescription>Informações principais do evento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Nome do Evento</Label>
              <Input
                id="eventName"
                value={formData.eventName}
                onChange={(e) => handleInputChange("eventName", e.target.value)}
                placeholder="Nome do evento"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtítulo</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                placeholder="Subtítulo do evento"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Descrição do evento"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Data de Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Data de Término</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contato e Configurações */}
        <Card>
          <CardHeader>
            <CardTitle>Contato e Configurações</CardTitle>
            <CardDescription>
              Informações de contato e configurações gerais
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://exemplo.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail de Contato</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="contato@evento.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(11) 9999-9999"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxParticipants">Máximo de Participantes</Label>
              <Input
                id="maxParticipants"
                type="number"
                value={formData.maxParticipants}
                onChange={(e) =>
                  handleInputChange("maxParticipants", parseInt(e.target.value))
                }
                placeholder="500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Evento Ativo</Label>
                <p className="text-sm text-muted-foreground">
                  Torna o evento visível publicamente
                </p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  handleInputChange("isActive", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Inscrições Abertas</Label>
                <p className="text-sm text-muted-foreground">
                  Permite novas inscrições
                </p>
              </div>
              <Switch
                checked={formData.registrationOpen}
                onCheckedChange={(checked) =>
                  handleInputChange("registrationOpen", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Logo e Imagens */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Logo e Imagens</CardTitle>
            <CardDescription>Gerencie as imagens do evento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-4">
                <Label>Logo Principal</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Logo principal do evento
                  </p>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Banner Principal</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Banner para a página inicial
                  </p>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Banner
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Imagem de Fundo</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Imagem de fundo do site
                  </p>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Imagem
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
