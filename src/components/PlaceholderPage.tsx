import React from 'react';
import { Construction } from 'lucide-react';
import { Button } from './ui/button';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Esta página está em desenvolvimento.
          </p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}
