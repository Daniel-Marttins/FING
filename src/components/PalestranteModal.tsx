import React from 'react';
import { Modal } from './Modal';
import { Users, Linkedin, Twitter, ExternalLink, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PalestranteModalProps } from '@/types';

export function PalestranteModal({ isOpen, onClose, palestrante }: PalestranteModalProps) {
  if (!palestrante) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Foto e informações básicas */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mx-auto md:mx-0">
              <Users className="w-16 h-16 text-primary" />
            </div>
            
            {/* Redes sociais */}
            <div className="flex gap-2 mt-4 justify-center md:justify-start">
              {palestrante.linkedin && (
                <Button variant="outline" size="sm" asChild>
                  <a href={palestrante.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {palestrante.twitter && (
                <Button variant="outline" size="sm" asChild>
                  <a href={palestrante.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Informações detalhadas */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{palestrante.nome}</h3>
              <p className="text-primary font-medium text-lg">{palestrante.cargo}</p>
              {palestrante.empresa && (
                <p className="text-muted-foreground">{palestrante.empresa}</p>
              )}
            </div>

            {/* Tema da palestra */}
            {palestrante.tema && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Palestra
                </h4>
                <p className="text-muted-foreground italic">"{palestrante.tema}"</p>
              </div>
            )}

            {/* Horário e local */}
            {(palestrante.horario || palestrante.palco) && (
              <div className="flex flex-wrap gap-4 text-sm">
                {palestrante.horario && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{palestrante.horario}</span>
                  </div>
                )}
                {palestrante.palco && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{palestrante.palco}</span>
                  </div>
                )}
              </div>
            )}

            {/* Especialidades */}
            {palestrante.especialidades && (
              <div>
                <h4 className="font-semibold mb-2">Especialidades</h4>
                <div className="flex flex-wrap gap-2">
                  {palestrante.especialidades.map((especialidade, index) => (
                    <Badge key={index} variant="secondary">
                      {especialidade}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Biografia */}
        {palestrante.bio && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold mb-3">Biografia</h4>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>{palestrante.bio}</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
