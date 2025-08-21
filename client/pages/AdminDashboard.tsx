import React from 'react';
import { 
  Users, 
  Calendar, 
  Building, 
  MapPin, 
  Eye, 
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total de Palestrantes',
      value: '15',
      description: '3 keynotes + 12 especialistas',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Eventos na Programação',
      value: '12',
      description: 'Distribuídos em 3 dias',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Patrocinadores',
      value: '13',
      description: '3 Colinas + 6 Columinho + 4 Apoiadores',
      icon: Building,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Visualizações do Site',
      value: '2.4k',
      description: '+12% esta semana',
      icon: Eye,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const quickActions = [
    {
      title: 'Adicionar Palestrante',
      description: 'Cadastrar novo palestrante no evento',
      icon: Users,
      action: () => navigate('/admin/palestrantes'),
      color: 'primary'
    },
    {
      title: 'Gerenciar Programação',
      description: 'Atualizar horários e eventos',
      icon: Clock,
      action: () => navigate('/admin/programacao'),
      color: 'secondary'
    },
    {
      title: 'Configurar Local',
      description: 'Atualizar informações de localização',
      icon: MapPin,
      action: () => navigate('/admin/localizacao'),
      color: 'outline'
    }
  ];

  const recentActivity = [
    { action: 'Palestrante "Ana Silva" foi editado', time: '2 horas atrás', type: 'edit' },
    { action: 'Nova programação adicionada para Dia 2', time: '5 horas atrás', type: 'add' },
    { action: 'Informações de localização atualizadas', time: '1 dia atrás', type: 'update' },
    { action: 'Patrocinador "TechCorp" foi adicionado', time: '2 dias atrás', type: 'add' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Bem-vindo ao painel administrativo do FING 2024
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Ações Rápidas
            </CardTitle>
            <CardDescription>
              Acesso rápido às funcionalidades mais utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{action.title}</h4>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant={action.color as any} 
                    size="sm"
                    onClick={action.action}
                  >
                    Acessar
                  </Button>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Atividade Recente
            </CardTitle>
            <CardDescription>
              Últimas alterações no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'add' ? 'bg-green-500' :
                    activity.type === 'edit' ? 'bg-blue-500' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <Badge variant={
                    activity.type === 'add' ? 'default' :
                    activity.type === 'edit' ? 'secondary' : 'outline'
                  } className="text-xs">
                    {activity.type === 'add' ? 'Novo' :
                     activity.type === 'edit' ? 'Editado' : 'Atualizado'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral do Evento</CardTitle>
          <CardDescription>
            Status atual do FING 2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold mb-1">Data do Evento</h4>
              <p className="text-sm text-muted-foreground">15-17 de Novembro, 2024</p>
              <Badge className="mt-2">Em breve</Badge>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold mb-1">Local</h4>
              <p className="text-sm text-muted-foreground">Centro de Convenções</p>
              <p className="text-sm text-muted-foreground">Garanhuns - PE</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold mb-1">Capacidade</h4>
              <p className="text-sm text-muted-foreground">1000+ participantes</p>
              <Badge variant="secondary" className="mt-2">Confirmado</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
