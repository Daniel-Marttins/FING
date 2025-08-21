export interface Palestrante {
  nome: string;
  cargo: string;
  empresa?: string;
  tema?: string;
  bio?: string;
  linkedin?: string;
  twitter?: string;
  foto?: string;
  especialidades?: string[];
  horario?: string;
  palco?: string;
}

export interface Especialista {
  nome: string;
  cargo: string;
  empresa: string;
}

export interface PalestranteModalProps {
  isOpen: boolean;
  onClose: () => void;
  palestrante: Palestrante | null;
}
