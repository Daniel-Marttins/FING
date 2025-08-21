import React, { useState } from 'react';
import { Modal } from './Modal';
import { Clock, MapPin, Users, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface ProgramaItem {
  id: string;
  horario: string;
  titulo: string;
  palestrante: string;
  palco: string;
  descricao: string;
  tipo: 'keynote' | 'workshop' | 'painel' | 'networking';
  dia: string;
}

interface ProgramacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const programaCompleto: ProgramaItem[] = [
  // Dia 1 - 15 de Novembro
  {
    id: '1',
    dia: '15 de Novembro',
    horario: '08:00 - 09:00',
    titulo: 'Credenciamento e Coffee Networking',
    palestrante: 'Equipe Organizadora',
    palco: 'Hall Principal',
    descricao: 'Recepção dos participantes com café da manhã e oportunidades de networking.',
    tipo: 'networking'
  },
  {
    id: '2',
    dia: '15 de Novembro',
    horario: '09:00 - 09:30',
    titulo: 'Cerimônia de Abertura',
    palestrante: 'Comissão Organizadora',
    palco: 'Auditório Principal',
    descricao: 'Abertura oficial do FING 2024 com apresentação da programação e palestrantes.',
    tipo: 'keynote'
  },
  {
    id: '3',
    dia: '15 de Novembro',
    horario: '09:30 - 10:30',
    titulo: 'O Futuro da Inteligência Artificial',
    palestrante: 'Ana Silva',
    palco: 'Auditório Principal',
    descricao: 'Como a IA está transformando os negócios e criando novas oportunidades de mercado.',
    tipo: 'keynote'
  },
  {
    id: '4',
    dia: '15 de Novembro',
    horario: '10:30 - 11:00',
    titulo: 'Coffee Break',
    palestrante: 'Livre',
    palco: 'Hall Principal',
    descricao: 'Pausa para café e networking entre os participantes.',
    tipo: 'networking'
  },
  {
    id: '5',
    dia: '15 de Novembro',
    horario: '11:00 - 12:00',
    titulo: 'Empreendedorismo Digital no Nordeste',
    palestrante: 'Carlos Santos',
    palco: 'Auditório Principal',
    descricao: 'Oportunidades e desafios para startups no ecossistema nordestino.',
    tipo: 'keynote'
  },
  {
    id: '6',
    dia: '15 de Novembro',
    horario: '14:00 - 15:30',
    titulo: 'Workshop: Design Thinking para Inovação',
    palestrante: 'Fernanda Costa',
    palco: 'Sala Workshop 1',
    descricao: 'Metodologia prática para desenvolver soluções inovadoras centradas no usuário.',
    tipo: 'workshop'
  },
  // Dia 2 - 16 de Novembro
  {
    id: '7',
    dia: '16 de Novembro',
    horario: '09:00 - 10:00',
    titulo: 'Transformação Digital nas Empresas',
    palestrante: 'Maria Oliveira',
    palco: 'Auditório Principal',
    descricao: 'Como liderar a transformação digital e criar cultura de inovação.',
    tipo: 'keynote'
  },
  {
    id: '8',
    dia: '16 de Novembro',
    horario: '10:30 - 11:30',
    titulo: 'Painel: O Futuro dos Negócios',
    palestrante: 'Ana Silva, Carlos Santos, Maria Oliveira',
    palco: 'Auditório Principal',
    descricao: 'Discussão entre especialistas sobre tendências e o futuro do empreendedorismo.',
    tipo: 'painel'
  },
  {
    id: '9',
    dia: '16 de Novembro',
    horario: '14:00 - 15:30',
    titulo: 'Workshop: Growth Hacking',
    palestrante: 'Larissa Moura',
    palco: 'Sala Workshop 2',
    descricao: 'Estratégias de crescimento acelerado para startups e empresas digitais.',
    tipo: 'workshop'
  },
  // Dia 3 - 17 de Novembro
  {
    id: '10',
    dia: '17 de Novembro',
    horario: '09:00 - 10:00',
    titulo: 'Sustentabilidade e Inovação',
    palestrante: 'Amanda Souza',
    palco: 'Auditório Principal',
    descricao: 'Como a tecnologia pode contribuir para um futuro mais sustentável.',
    tipo: 'keynote'
  },
  {
    id: '11',
    dia: '17 de Novembro',
    horario: '10:30 - 11:30',
    titulo: 'Blockchain e Web3: Oportunidades Reais',
    palestrante: 'Thiago Barbosa',
    palco: 'Auditório Principal',
    descricao: 'Além do hype: aplicações práticas da blockchain nos negócios.',
    tipo: 'keynote'
  },
  {
    id: '12',
    dia: '17 de Novembro',
    horario: '16:00 - 17:00',
    titulo: 'Cerimônia de Encerramento',
    palestrante: 'Comissão Organizadora',
    palco: 'Auditório Principal',
    descricao: 'Encerramento oficial com premiações e próximos passos.',
    tipo: 'keynote'
  }
];

const tipoColors = {
  keynote: 'bg-primary text-primary-foreground',
  workshop: 'bg-accent text-accent-foreground',
  painel: 'bg-secondary text-secondary-foreground',
  networking: 'bg-muted text-muted-foreground'
};

export function ProgramacaoModal({ isOpen, onClose }: ProgramacaoModalProps) {
  const [selectedDay, setSelectedDay] = useState('15 de Novembro');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const dias = ['15 de Novembro', '16 de Novembro', '17 de Novembro'];
  
  const programaDoDia = programaCompleto.filter(item => item.dia === selectedDay);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Programação Completa - FING 2024"
      size="xl"
    >
      <div className="p-6">
        {/* Seletor de dias */}
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b">
          {dias.map((dia) => (
            <Button
              key={dia}
              variant={selectedDay === dia ? 'default' : 'outline'}
              onClick={() => setSelectedDay(dia)}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              {dia}
            </Button>
          ))}
        </div>

        {/* Timeline do dia */}
        <div className="space-y-4">
          {programaDoDia.map((item) => {
            const isExpanded = expandedItems.has(item.id);
            
            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{item.horario}</span>
                        </div>
                        <Badge className={tipoColors[item.tipo]}>
                          {item.tipo}
                        </Badge>
                      </div>
                      
                      <h4 className="font-semibold text-lg mb-1">{item.titulo}</h4>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{item.palestrante}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{item.palco}</span>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.descricao}
                          </p>
                        </div>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(item.id)}
                      className="flex-shrink-0"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Informações adicionais */}
        <div className="mt-6 pt-6 border-t bg-muted/30 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Informações importantes:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Chegue com 15 minutos de antecedência para workshops</li>
            <li>• Vagas limitadas para workshops - ordem de chegada</li>
            <li>• Coffee breaks e almoço inclusos na inscrição</li>
            <li>• Material dos workshops disponível digitalmente</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
