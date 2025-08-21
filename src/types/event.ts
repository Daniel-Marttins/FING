export interface ProgramEvent {
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

export interface ProgramaItem {
  horario: string;
  titulo: string;
  palestrante: string;
  palco: string;
  descricao: string;
  tipo: "keynote" | "workshop" | "painel" | "networking";
}

export interface EventType {
  value: string;
  label: string;
  color: string;
}
