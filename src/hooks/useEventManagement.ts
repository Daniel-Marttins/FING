import { useState, useCallback, useMemo } from "react";
import { ProgramEvent, EventType } from "@/types";
import { useToast } from "@/hooks/use-toast";

const eventTypes: EventType[] = [
  { value: "palestra", label: "Palestra", color: "bg-blue-500" },
  { value: "workshop", label: "Workshop", color: "bg-green-500" },
  { value: "painel", label: "Painel", color: "bg-purple-500" },
  { value: "networking", label: "Networking", color: "bg-orange-500" },
  { value: "break", label: "Intervalo", color: "bg-gray-500" },
];

const initialEvents: ProgramEvent[] = [
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
];

export function useEventManagement() {
  const { toast } = useToast();
  const [events, setEvents] = useState<ProgramEvent[]>(initialEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ProgramEvent | null>(null);
  const [formData, setFormData] = useState<Partial<ProgramEvent>>({});

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.startTime}`);
      const dateB = new Date(`${b.date} ${b.startTime}`);
      return dateA.getTime() - dateB.getTime();
    });
  }, [events]);

  const groupedEvents = useMemo(() => {
    return sortedEvents.reduce(
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
  }, [sortedEvents]);

  const getTypeColor = useCallback((type: string) => {
    return eventTypes.find((t) => t.value === type)?.color || "bg-gray-500";
  }, []);

  const getTypeLabel = useCallback((type: string) => {
    return eventTypes.find((t) => t.value === type)?.label || type;
  }, []);

  const handleOpenDialog = useCallback((event?: ProgramEvent) => {
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
  }, []);

  const handleSaveEvent = useCallback(() => {
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
  }, [formData, editingEvent, toast]);

  const handleDeleteEvent = useCallback(
    (eventId: string) => {
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
      toast({
        title: "Evento removido",
        description: "O evento foi removido da programação.",
      });
    },
    [toast],
  );

  const updateFormData = useCallback(
    (field: keyof ProgramEvent, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  return {
    events: sortedEvents,
    groupedEvents,
    eventTypes,
    isDialogOpen,
    editingEvent,
    formData,
    setIsDialogOpen,
    getTypeColor,
    getTypeLabel,
    handleOpenDialog,
    handleSaveEvent,
    handleDeleteEvent,
    updateFormData,
  };
}
