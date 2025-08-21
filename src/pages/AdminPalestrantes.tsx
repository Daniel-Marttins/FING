import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface Palestrante {
  id: string;
  nome: string;
  cargo: string;
  empresa: string;
  tema: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  tipo: 'keynote' | 'especialista';
  horario?: string;
  palco?: string;
}

export default function AdminPalestrantes() {
  const [palestrantes, setPalestrantes] = useState<Palestrante[]>([
    {
      id: '1',
      nome: 'Ana Silva',
      cargo: 'CEO Tech Innovations',
      empresa: 'Tech Innovations Corp',
      tema: 'O Futuro da Inteligência Artificial',
      bio: 'Ana é uma executiva experiente com mais de 15 anos no setor de tecnologia.',
      linkedin: 'https://linkedin.com/in/anasilva',
      tipo: 'keynote',
      horario: '09:30 - 10:30',
      palco: 'Auditório Principal'
    },
    {
      id: '2',
      nome: 'Carlos Santos',
      cargo: 'Founder StartupBR',
      empresa: 'StartupBR Aceleradora',
      tema: 'Empreendedorismo Digital no Nordeste',
      bio: 'Carlos é empreendedor serial e investidor anjo.',
      tipo: 'keynote',
      horario: '11:00 - 12:00',
      palco: 'Auditório Principal'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPalestrante, setEditingPalestrante] = useState<Palestrante | null>(null);
  const [formData, setFormData] = useState<Partial<Palestrante>>({
    nome: '',
    cargo: '',
    empresa: '',
    tema: '',
    bio: '',
    linkedin: '',
    twitter: '',
    tipo: 'especialista',
    horario: '',
    palco: ''
  });

  const filteredPalestrantes = palestrantes.filter(palestrante =>
    palestrante.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    palestrante.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    palestrante.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (palestrante: Palestrante) => {
    setEditingPalestrante(palestrante);
    setFormData(palestrante);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este palestrante?')) {
      setPalestrantes(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPalestrante) {
      // Editar
      setPalestrantes(prev => prev.map(p => 
        p.id === editingPalestrante.id 
          ? { ...p, ...formData } as Palestrante
          : p
      ));
    } else {
      // Adicionar
      const newPalestrante: Palestrante = {
        id: Date.now().toString(),
        ...formData as Palestrante
      };
      setPalestrantes(prev => [...prev, newPalestrante]);
    }

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPalestrante(null);
    setFormData({
      nome: '',
      cargo: '',
      empresa: '',
      tema: '',
      bio: '',
      linkedin: '',
      twitter: '',
      tipo: 'especialista',
      horario: '',
      palco: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Palestrantes</h1>
          <p className="text-muted-foreground">
            Gerencie os palestrantes e especialistas do evento
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPalestrante(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Palestrante
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPalestrante ? 'Editar Palestrante' : 'Adicionar Palestrante'}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do palestrante
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo *</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <Input
                    id="empresa"
                    value={formData.empresa || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, empresa: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo *</Label>
                  <Select 
                    value={formData.tipo} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, tipo: value as 'keynote' | 'especialista' }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keynote">Keynote Speaker</SelectItem>
                      <SelectItem value="especialista">Especialista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tema">Tema da Palestra</Label>
                <Input
                  id="tema"
                  value={formData.tema || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, tema: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="horario">Horário</Label>
                  <Input
                    id="horario"
                    placeholder="ex: 09:30 - 10:30"
                    value={formData.horario || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, horario: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="palco">Palco/Local</Label>
                  <Input
                    id="palco"
                    placeholder="ex: Auditório Principal"
                    value={formData.palco || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, palco: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={formData.bio || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    type="url"
                    placeholder="https://twitter.com/..."
                    value={formData.twitter || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingPalestrante ? 'Salvar Alterações' : 'Adicionar Palestrante'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar palestrantes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total</span>
            </div>
            <div className="text-2xl font-bold">{palestrantes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Keynotes</span>
            </div>
            <div className="text-2xl font-bold">
              {palestrantes.filter(p => p.tipo === 'keynote').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Especialistas</span>
            </div>
            <div className="text-2xl font-bold">
              {palestrantes.filter(p => p.tipo === 'especialista').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Palestrantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPalestrantes.map((palestrante) => (
          <Card key={palestrante.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{palestrante.nome}</CardTitle>
                  <CardDescription>{palestrante.cargo}</CardDescription>
                </div>
                <Badge variant={palestrante.tipo === 'keynote' ? 'default' : 'secondary'}>
                  {palestrante.tipo === 'keynote' ? 'Keynote' : 'Especialista'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {palestrante.empresa && (
                  <p className="text-sm text-muted-foreground">{palestrante.empresa}</p>
                )}
                {palestrante.tema && (
                  <p className="text-sm font-medium italic">"{palestrante.tema}"</p>
                )}
                {palestrante.horario && (
                  <p className="text-sm text-muted-foreground">⏰ {palestrante.horario}</p>
                )}
                {palestrante.palco && (
                  <p className="text-sm text-muted-foreground">📍 {palestrante.palco}</p>
                )}
              </div>
              
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(palestrante)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(palestrante.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredPalestrantes.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Nenhum palestrante encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Tente uma busca diferente' : 'Adicione o primeiro palestrante'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Palestrante
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
