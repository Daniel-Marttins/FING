import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Building, Users, Upload, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Organization {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  type: 'organizador' | 'apoio' | 'patrocinador';
  category?: 'ouro' | 'prata' | 'bronze' | 'apoio';
}

export default function AdminRealizacao() {
  const { toast } = useToast();
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'Tech University',
      description: 'Universidade responsável pela organização do evento',
      type: 'organizador',
      website: 'https://techuniversity.edu.br'
    },
    {
      id: '2',
      name: 'TechCorp Solutions',
      description: 'Empresa de tecnologia patrocinadora do evento',
      type: 'patrocinador',
      category: 'ouro',
      website: 'https://techcorp.com.br'
    },
    {
      id: '3',
      name: 'DevTools Inc',
      description: 'Fornecedor de ferramentas de desenvolvimento',
      type: 'patrocinador',
      category: 'prata',
      website: 'https://devtools.com'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [formData, setFormData] = useState<Partial<Organization>>({});

  const organizationTypes = [
    { value: 'organizador', label: 'Organizador', color: 'bg-blue-500' },
    { value: 'apoio', label: 'Apoio', color: 'bg-green-500' },
    { value: 'patrocinador', label: 'Patrocinador', color: 'bg-purple-500' }
  ];

  const sponsorCategories = [
    { value: 'ouro', label: 'Ouro', color: 'bg-yellow-500' },
    { value: 'prata', label: 'Prata', color: 'bg-gray-400' },
    { value: 'bronze', label: 'Bronze', color: 'bg-orange-600' },
    { value: 'apoio', label: 'Apoio', color: 'bg-blue-500' }
  ];

  const getTypeColor = (type: string) => {
    return organizationTypes.find(t => t.value === type)?.color || 'bg-gray-500';
  };

  const getTypeLabel = (type: string) => {
    return organizationTypes.find(t => t.value === type)?.label || type;
  };

  const getCategoryColor = (category?: string) => {
    if (!category) return 'bg-gray-500';
    return sponsorCategories.find(c => c.value === category)?.color || 'bg-gray-500';
  };

  const getCategoryLabel = (category?: string) => {
    if (!category) return '';
    return sponsorCategories.find(c => c.value === category)?.label || category;
  };

  const handleOpenDialog = (org?: Organization) => {
    if (org) {
      setEditingOrg(org);
      setFormData(org);
    } else {
      setEditingOrg(null);
      setFormData({
        name: '',
        description: '',
        type: 'organizador',
        website: ''
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveOrganization = () => {
    if (!formData.name || !formData.type) {
      toast({
        title: "Erro",
        description: "Preencha pelo menos o nome e tipo da organização.",
        variant: "destructive"
      });
      return;
    }

    if (editingOrg) {
      setOrganizations(prev => prev.map(org => 
        org.id === editingOrg.id 
          ? { ...org, ...formData } as Organization
          : org
      ));
      toast({
        title: "Organização atualizada",
        description: "A organização foi atualizada com sucesso.",
      });
    } else {
      const newOrg: Organization = {
        id: Date.now().toString(),
        ...formData as Organization
      };
      setOrganizations(prev => [...prev, newOrg]);
      toast({
        title: "Organização criada",
        description: "A organização foi adicionada com sucesso.",
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleDeleteOrganization = (orgId: string) => {
    setOrganizations(prev => prev.filter(org => org.id !== orgId));
    toast({
      title: "Organização removida",
      description: "A organização foi removida da lista.",
    });
  };

  const groupedOrganizations = organizations.reduce((groups, org) => {
    const type = org.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(org);
    return groups;
  }, {} as Record<string, Organization[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Realização</h1>
          <p className="text-muted-foreground">Gerencie organizadores, apoiadores e patrocinadores</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nova Organização
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingOrg ? 'Editar Organização' : 'Nova Organização'}
              </DialogTitle>
              <DialogDescription>
                {editingOrg ? 'Edite as informações da organização' : 'Adicione uma nova organização'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome*</Label>
                  <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nome da organização"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo*</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as Organization['type'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.type === 'patrocinador' && (
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria do Patrocínio</Label>
                  <Select
                    value={formData.category || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as Organization['category'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {sponsorCategories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição da organização"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://exemplo.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Image className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Logo da organização</p>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveOrganization}>
                {editingOrg ? 'Atualizar' : 'Criar'} Organização
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="organizador">Organizadores</TabsTrigger>
          <TabsTrigger value="patrocinador">Patrocinadores</TabsTrigger>
          <TabsTrigger value="apoio">Apoio</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {organizationTypes.map(type => {
            const orgs = groupedOrganizations[type.value] || [];
            if (orgs.length === 0) return null;

            return (
              <Card key={type.value}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    {type.label}s
                  </CardTitle>
                  <CardDescription>
                    {orgs.length} {type.label.toLowerCase()}(s) cadastrado(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {orgs.map((org) => (
                      <div key={org.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge className={`${getTypeColor(org.type)} text-white`}>
                              {getTypeLabel(org.type)}
                            </Badge>
                            {org.category && (
                              <Badge className={`${getCategoryColor(org.category)} text-white`}>
                                {getCategoryLabel(org.category)}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDialog(org)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteOrganization(org.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold">{org.name}</h3>
                          {org.description && (
                            <p className="text-sm text-muted-foreground">{org.description}</p>
                          )}
                          {org.website && (
                            <a
                              href={org.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              {org.website}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {organizationTypes.map(type => (
          <TabsContent key={type.value} value={type.value} className="space-y-6">
            {(() => {
              const orgs = groupedOrganizations[type.value] || [];
              return (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      {type.label}s
                    </CardTitle>
                    <CardDescription>
                      {orgs.length} {type.label.toLowerCase()}(s) cadastrado(s)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orgs.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {orgs.map((org) => (
                          <div key={org.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Badge className={`${getTypeColor(org.type)} text-white`}>
                                  {getTypeLabel(org.type)}
                                </Badge>
                                {org.category && (
                                  <Badge className={`${getCategoryColor(org.category)} text-white`}>
                                    {getCategoryLabel(org.category)}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleOpenDialog(org)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteOrganization(org.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h3 className="font-semibold">{org.name}</h3>
                              {org.description && (
                                <p className="text-sm text-muted-foreground">{org.description}</p>
                              )}
                              {org.website && (
                                <a
                                  href={org.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline"
                                >
                                  {org.website}
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Users className="w-12 h-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Nenhum {type.label.toLowerCase()} cadastrado</h3>
                        <p className="text-muted-foreground text-center mb-4">
                          Comece adicionando o primeiro {type.label.toLowerCase()}
                        </p>
                        <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Adicionar {type.label}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })()}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
