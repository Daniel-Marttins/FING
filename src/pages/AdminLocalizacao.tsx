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
  Save,
  MapPin,
  Navigation,
  Clock,
  Phone,
  Mail,
  Car,
  Bus,
  Train,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminLocalizacao() {
  const { toast } = useToast();
  const [locationData, setLocationData] = useState({
    venue: {
      name: "Centro de Convenções TechCenter",
      address: "Rua da Tecnologia, 123",
      neighborhood: "Distrito Tecnológico",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      country: "Brasil",
      latitude: "-23.550520",
      longitude: "-46.633308",
      phone: "(11) 3333-4444",
      email: "contato@techcenter.com.br",
      website: "https://techcenter.com.br",
    },
    details: {
      capacity: 500,
      floors: 3,
      accessibility: true,
      parking: true,
      parkingSpaces: 200,
      publicTransport: true,
      wifi: true,
      airConditioning: true,
      security: true,
      catering: true,
    },
    instructions: {
      arrivalInstructions:
        "Entre pela portaria principal e dirija-se ao balcão de recepção para retirar sua credencial.",
      parkingInstructions:
        "Estacionamento gratuito disponível no subsolo. Acesso pela Rua dos Eventos.",
      publicTransportInstructions:
        'Estação de metrô "Tecnologia" (Linha Azul) fica a 200m do local. Várias linhas de ônibus param em frente ao centro de convenções.',
      emergencyInstructions:
        "Em caso de emergência, procure os funcionários identificados ou dirija-se às saídas de emergência sinalizadas.",
    },
    schedule: {
      eventStart: "08:00",
      eventEnd: "18:00",
      registrationStart: "07:30",
      venueOpen: "07:00",
      venueClose: "19:00",
    },
  });

  const handleInputChange = (section: string, field: string, value: any) => {
    setLocationData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    toast({
      title: "Localização salva",
      description:
        "As informações de localização foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Localização</h1>
          <p className="text-muted-foreground">
            Gerencie informações do local do evento
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="venue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="venue">Local</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="instructions">Instruções</TabsTrigger>
          <TabsTrigger value="schedule">Horários</TabsTrigger>
        </TabsList>

        {/* Informações do Local */}
        <TabsContent value="venue" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Endereço
                </CardTitle>
                <CardDescription>Informações básicas do local</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="venueName">Nome do Local</Label>
                  <Input
                    id="venueName"
                    value={locationData.venue.name}
                    onChange={(e) =>
                      handleInputChange("venue", "name", e.target.value)
                    }
                    placeholder="Nome do local"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={locationData.venue.address}
                    onChange={(e) =>
                      handleInputChange("venue", "address", e.target.value)
                    }
                    placeholder="Rua, número"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input
                      id="neighborhood"
                      value={locationData.venue.neighborhood}
                      onChange={(e) =>
                        handleInputChange(
                          "venue",
                          "neighborhood",
                          e.target.value,
                        )
                      }
                      placeholder="Bairro"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input
                      id="zipCode"
                      value={locationData.venue.zipCode}
                      onChange={(e) =>
                        handleInputChange("venue", "zipCode", e.target.value)
                      }
                      placeholder="00000-000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={locationData.venue.city}
                      onChange={(e) =>
                        handleInputChange("venue", "city", e.target.value)
                      }
                      placeholder="Cidade"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      value={locationData.venue.state}
                      onChange={(e) =>
                        handleInputChange("venue", "state", e.target.value)
                      }
                      placeholder="UF"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">País</Label>
                  <Input
                    id="country"
                    value={locationData.venue.country}
                    onChange={(e) =>
                      handleInputChange("venue", "country", e.target.value)
                    }
                    placeholder="País"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Coordenadas e Contato
                </CardTitle>
                <CardDescription>
                  Coordenadas GPS e informações de contato
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      value={locationData.venue.latitude}
                      onChange={(e) =>
                        handleInputChange("venue", "latitude", e.target.value)
                      }
                      placeholder="-23.550520"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      value={locationData.venue.longitude}
                      onChange={(e) =>
                        handleInputChange("venue", "longitude", e.target.value)
                      }
                      placeholder="-46.633308"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={locationData.venue.phone}
                    onChange={(e) =>
                      handleInputChange("venue", "phone", e.target.value)
                    }
                    placeholder="(11) 3333-4444"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={locationData.venue.email}
                    onChange={(e) =>
                      handleInputChange("venue", "email", e.target.value)
                    }
                    placeholder="contato@local.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={locationData.venue.website}
                    onChange={(e) =>
                      handleInputChange("venue", "website", e.target.value)
                    }
                    placeholder="https://local.com"
                  />
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Navigation className="w-4 h-4 mr-2" />
                    Visualizar no Mapa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Detalhes do Local */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Capacidade e Estrutura</CardTitle>
                <CardDescription>
                  Informações sobre a capacidade e estrutura física
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacidade Total</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={locationData.details.capacity}
                    onChange={(e) =>
                      handleInputChange(
                        "details",
                        "capacity",
                        parseInt(e.target.value),
                      )
                    }
                    placeholder="500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="floors">Número de Andares</Label>
                  <Input
                    id="floors"
                    type="number"
                    value={locationData.details.floors}
                    onChange={(e) =>
                      handleInputChange(
                        "details",
                        "floors",
                        parseInt(e.target.value),
                      )
                    }
                    placeholder="3"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parkingSpaces">Vagas de Estacionamento</Label>
                  <Input
                    id="parkingSpaces"
                    type="number"
                    value={locationData.details.parkingSpaces}
                    onChange={(e) =>
                      handleInputChange(
                        "details",
                        "parkingSpaces",
                        parseInt(e.target.value),
                      )
                    }
                    placeholder="200"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facilidades</CardTitle>
                <CardDescription>
                  Serviços e facilidades disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Acessibilidade</Label>
                    <p className="text-sm text-muted-foreground">
                      Acesso para pessoas com deficiência
                    </p>
                  </div>
                  <Switch
                    checked={locationData.details.accessibility}
                    onCheckedChange={(checked) =>
                      handleInputChange("details", "accessibility", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Estacionamento</Label>
                    <p className="text-sm text-muted-foreground">
                      Estacionamento disponível
                    </p>
                  </div>
                  <Switch
                    checked={locationData.details.parking}
                    onCheckedChange={(checked) =>
                      handleInputChange("details", "parking", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Transporte Público</Label>
                    <p className="text-sm text-muted-foreground">
                      Acesso por transporte público
                    </p>
                  </div>
                  <Switch
                    checked={locationData.details.publicTransport}
                    onCheckedChange={(checked) =>
                      handleInputChange("details", "publicTransport", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Wi-Fi</Label>
                    <p className="text-sm text-muted-foreground">
                      Internet sem fio
                    </p>
                  </div>
                  <Switch
                    checked={locationData.details.wifi}
                    onCheckedChange={(checked) =>
                      handleInputChange("details", "wifi", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Ar Condicionado</Label>
                    <p className="text-sm text-muted-foreground">
                      Climatização
                    </p>
                  </div>
                  <Switch
                    checked={locationData.details.airConditioning}
                    onCheckedChange={(checked) =>
                      handleInputChange("details", "airConditioning", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Segurança</Label>
                    <p className="text-sm text-muted-foreground">
                      Segurança 24h
                    </p>
                  </div>
                  <Switch
                    checked={locationData.details.security}
                    onCheckedChange={(checked) =>
                      handleInputChange("details", "security", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Catering</Label>
                    <p className="text-sm text-muted-foreground">
                      Serviço de alimentação
                    </p>
                  </div>
                  <Switch
                    checked={locationData.details.catering}
                    onCheckedChange={(checked) =>
                      handleInputChange("details", "catering", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Instruções */}
        <TabsContent value="instructions" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Como Chegar
                </CardTitle>
                <CardDescription>
                  Instruções de chegada e transporte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="arrivalInstructions">
                    Instruções de Chegada
                  </Label>
                  <Textarea
                    id="arrivalInstructions"
                    value={locationData.instructions.arrivalInstructions}
                    onChange={(e) =>
                      handleInputChange(
                        "instructions",
                        "arrivalInstructions",
                        e.target.value,
                      )
                    }
                    placeholder="Como chegar e onde se apresentar"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parkingInstructions">
                    <Car className="w-4 h-4 inline mr-2" />
                    Estacionamento
                  </Label>
                  <Textarea
                    id="parkingInstructions"
                    value={locationData.instructions.parkingInstructions}
                    onChange={(e) =>
                      handleInputChange(
                        "instructions",
                        "parkingInstructions",
                        e.target.value,
                      )
                    }
                    placeholder="Instruções sobre estacionamento"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publicTransportInstructions">
                    <Bus className="w-4 h-4 inline mr-2" />
                    Transporte Público
                  </Label>
                  <Textarea
                    id="publicTransportInstructions"
                    value={
                      locationData.instructions.publicTransportInstructions
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "instructions",
                        "publicTransportInstructions",
                        e.target.value,
                      )
                    }
                    placeholder="Como chegar de transporte público"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações Importantes</CardTitle>
                <CardDescription>
                  Orientações gerais e emergência
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyInstructions">
                    Instruções de Emergência
                  </Label>
                  <Textarea
                    id="emergencyInstructions"
                    value={locationData.instructions.emergencyInstructions}
                    onChange={(e) =>
                      handleInputChange(
                        "instructions",
                        "emergencyInstructions",
                        e.target.value,
                      )
                    }
                    placeholder="Procedimentos em caso de emergência"
                    rows={4}
                  />
                </div>

                <div className="space-y-4 pt-4">
                  <h4 className="font-semibold">
                    Informações de Contato de Emergência
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Bombeiros: 193</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>SAMU: 192</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Polícia: 190</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Local: {locationData.venue.phone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Horários */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Horários de Funcionamento
              </CardTitle>
              <CardDescription>
                Defina os horários do evento e do local
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Horários do Evento</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventStart">Início do Evento</Label>
                      <Input
                        id="eventStart"
                        type="time"
                        value={locationData.schedule.eventStart}
                        onChange={(e) =>
                          handleInputChange(
                            "schedule",
                            "eventStart",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventEnd">Fim do Evento</Label>
                      <Input
                        id="eventEnd"
                        type="time"
                        value={locationData.schedule.eventEnd}
                        onChange={(e) =>
                          handleInputChange(
                            "schedule",
                            "eventEnd",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationStart">
                      Início das Inscrições
                    </Label>
                    <Input
                      id="registrationStart"
                      type="time"
                      value={locationData.schedule.registrationStart}
                      onChange={(e) =>
                        handleInputChange(
                          "schedule",
                          "registrationStart",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Horários do Local</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="venueOpen">Abertura</Label>
                      <Input
                        id="venueOpen"
                        type="time"
                        value={locationData.schedule.venueOpen}
                        onChange={(e) =>
                          handleInputChange(
                            "schedule",
                            "venueOpen",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venueClose">Fechamento</Label>
                      <Input
                        id="venueClose"
                        type="time"
                        value={locationData.schedule.venueClose}
                        onChange={(e) =>
                          handleInputChange(
                            "schedule",
                            "venueClose",
                            e.target.value,
                          )
                        }
                      />
                    </div>
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
