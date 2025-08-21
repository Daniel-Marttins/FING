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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Clock, MapPin, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProgramEvent {
  id: string;
  title: string;
  description: string;
  speaker: string;
  speakerId?: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: "palestra" | "workshop" | "painel" | "networking" | "break";
  capacity?: number;
}

export default function AdminProgramacao() {
  const { toast } = useToast();
  const [events, setEvents] = useState<ProgramEvent[]>([
    {
      id: "1",
      title: "Abertura do Evento",
      description: "Cerimônia de abertura com apresentação da programação",
      speaker: "Organização FING",
      date: "2024-03-15",
      startTime: "09:00",
      endTime: "09:30",
      location: "Auditório Principal",
      type: "networking",
    },
    {
      id: "2",
      title: "O Futuro da Inteligência Artificial",
      description: "Palestra sobre as tendências e impactos da IA na sociedade",
      speaker: "Dr. João Silva",
      speakerId: "joao-silva",
      date: "2024-03-15",
      startTime: "10:00",
      endTime: "11:00",
      location: "Auditório Principal",
      type: "palestra",
      capacity: 200,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ProgramEvent | null>(null);
  const [formData, setFormData] = useState<Partial<ProgramEvent>>({});

  const eventTypes = [
    { value: "palestra", label: "Palestra", color: "bg-blue-500" },
    { value: "workshop", label: "Workshop", color: "bg-green-500" },
    { value: "painel", label: "Painel", color: "bg-purple-500" },
    { value: "networking", label: "Networking", color: "bg-orange-500" },
    { value: "break", label: "Intervalo", color: "bg-gray-500" },
  ];

  const getTypeColor = (type: string) => {
    return eventTypes.find((t) => t.value === type)?.color || "bg-gray-500";
  };

  const getTypeLabel = (type: string) => {
    return eventTypes.find((t) => t.value === type)?.label || type;
  };

  const handleOpenDialog = (event?: ProgramEvent) => {
    if (event) {
      setEditingEvent(event);
      setFormData(event);
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        description: "",
        speaker: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        type: "palestra",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveEvent = () => {
    if (
      !formData.title ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime
    ) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingEvent.id
            ? ({ ...event, ...formData } as ProgramEvent)
            : event,
        ),
      );
      toast({
        title: "Evento atualizado",
        description: "O evento foi atualizado com sucesso.",
      });
    } else {
      const newEvent: ProgramEvent = {
        id: Date.now().toString(),
        ...(formData as ProgramEvent),
      };
      setEvents((prev) => [...prev, newEvent]);
      toast({
        title: "Evento criado",
        description: "O evento foi criado com sucesso.",
      });
    }

    setIsDialogOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
    toast({
      title: "Evento removido",
      description: "O evento foi removido da programação.",
    });
  };

  const sortedEvents = events.sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.startTime}`);
    const dateB = new Date(`${b.date} ${b.startTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  const groupedEvents = sortedEvents.reduce(
    (groups, event) => {
      const date = event.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    },
    {} as Record<string, ProgramEvent[]>,
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Programação</h1>
          <p className="text-muted-foreground">
            Gerencie a programação completa do evento
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Novo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Editar Evento" : "Novo Evento"}
              </DialogTitle>
              <DialogDescription>
                {editingEvent
                  ? "Edite as informações do evento"
                  : "Adicione um novo evento à programação"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título*</Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Título do evento"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo*</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: value as ProgramEvent["type"],
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Descrição do evento"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="speaker">Palestrante</Label>
                  <Input
                    id="speaker"
                    value={formData.speaker || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        speaker: e.target.value,
                      }))
                    }
                    placeholder="Nome do palestrante"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Local</Label>
                  <Input
                    id="location"
                    value={formData.location || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="Local do evento"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data*</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Início*</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Fim*</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidade (opcional)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      capacity: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    }))
                  }
                  placeholder="Número máximo de participantes"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEvent}>
                {editingEvent ? "Atualizar" : "Criar"} Evento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de eventos por dia */}
      <div className="space-y-6">
        {Object.entries(groupedEvents).map(([date, dayEvents]) => (
          <Card key={date}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {new Date(date).toLocaleDateString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardTitle>
              <CardDescription>
                {dayEvents.length} evento(s) programado(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          className={`${getTypeColor(event.type)} text-white`}
                        >
                          {getTypeLabel(event.type)}
                        </Badge>
                        <span className="font-semibold">{event.title}</span>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-1">
                        {event.description && <p>{event.description}</p>}
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.startTime} - {event.endTime}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                          )}
                          {event.speaker && (
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {event.speaker}
                            </span>
                          )}
                          {event.capacity && (
                            <span className="text-xs">
                              Máx: {event.capacity} pessoas
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(event)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {Object.keys(groupedEvents).length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Clock className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Nenhum evento programado
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Comece criando o primeiro evento da programação
              </p>
              <Button
                onClick={() => handleOpenDialog()}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Criar Primeiro Evento
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
