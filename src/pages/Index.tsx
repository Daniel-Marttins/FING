import React, { useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Sparkles,
  Target,
  History,
  Building,
  Award,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PalestranteModal } from "@/components/PalestranteModal";
import { ProgramacaoModal } from "@/components/ProgramacaoModal";
import { useParallax } from "@/hooks";
import { Palestrante, Especialista } from "@/types";

const palestrantesData: Palestrante[] = [
  {
    nome: "Ana Silva",
    cargo: "CEO Tech Innovations",
    empresa: "Tech Innovations Corp",
    tema: "O Futuro da Inteligência Artificial",
    bio: "Ana é uma executiva experiente com mais de 15 anos no setor de tecnologia. Ela liderou transformações digitais em grandes corporações e é reconhecida como uma das principais vozes em IA no Brasil. Possui mestrado em Ciência da Computação pela USP e MBA pela Stanford.",
    linkedin: "https://linkedin.com/in/anasilva",
    twitter: "https://twitter.com/anasilvatech",
    especialidades: [
      "Inteligência Artificial",
      "Transformação Digital",
      "Liderança",
      "Inovação",
    ],
    horario: "09:30 - 10:30",
    palco: "Auditório Principal",
  },
  {
    nome: "Carlos Santos",
    cargo: "Founder StartupBR",
    empresa: "StartupBR Aceleradora",
    tema: "Empreendedorismo Digital no Nordeste",
    bio: "Carlos é empreendedor serial e investidor anjo. Fundou 3 startups exitosas e hoje lidera uma das principais aceleradoras do Nordeste. É mentor de centenas de empreendedores e palestrante em eventos nacionais e internacionais.",
    linkedin: "https://linkedin.com/in/carlossantos",
    especialidades: [
      "Empreendedorismo",
      "Investimentos",
      "Startups",
      "Ecossistema",
    ],
    horario: "11:00 - 12:00",
    palco: "Auditório Principal",
  },
  {
    nome: "Maria Oliveira",
    cargo: "Diretora de Inovação",
    empresa: "Corporate Innovation Inc",
    tema: "Transformação Digital nas Empresas",
    bio: "Maria lidera iniciativas de inovação em grandes corporações há mais de 10 anos. Especialista em design thinking e metodologias ágeis, ela já implementou processos de transformação digital em mais de 50 empresas.",
    linkedin: "https://linkedin.com/in/mariaoliveira",
    especialidades: [
      "Transformação Digital",
      "Design Thinking",
      "Metodologias Ágeis",
      "Inovação Corporativa",
    ],
    horario: "09:00 - 10:00",
    palco: "Auditório Principal",
  },
];

const especialistas: Especialista[] = [
  { nome: "João Pereira", cargo: "Innovation Manager", empresa: "TechCorp" },
  { nome: "Fernanda Costa", cargo: "UX Designer", empresa: "Design Studio" },
  { nome: "Ricardo Lima", cargo: "Data Scientist", empresa: "DataLab" },
  { nome: "Camila Torres", cargo: "Product Manager", empresa: "ProductCo" },
  { nome: "Eduardo Rocha", cargo: "Tech Lead", empresa: "DevTeam" },
  {
    nome: "Beatriz Alves",
    cargo: "Marketing Digital",
    empresa: "MarketingPro",
  },
  {
    nome: "Paulo Henrique",
    cargo: "Business Analyst",
    empresa: "BizAnalytics",
  },
  { nome: "Larissa Moura", cargo: "Growth Hacker", empresa: "GrowthLab" },
  { nome: "Gabriel Nunes", cargo: "DevOps Engineer", empresa: "CloudTech" },
  { nome: "Isabela Ferreira", cargo: "Venture Capital", empresa: "VCFund" },
  {
    nome: "Thiago Barbosa",
    cargo: "Blockchain Expert",
    empresa: "BlockchainBR",
  },
  { nome: "Amanda Souza", cargo: "Sustainability Lead", empresa: "GreenTech" },
];

export default function Index() {
  const [selectedPalestrante, setSelectedPalestrante] =
    React.useState<Palestrante | null>(null);
  const [isPalestranteModalOpen, setIsPalestranteModalOpen] =
    React.useState(false);
  const [isProgramacaoModalOpen, setIsProgramacaoModalOpen] =
    React.useState(false);

  // Optimized parallax hooks
  const { parallaxStyle: parallaxStyleSlow } = useParallax({
    speed: 0.1,
    targetElementId: "inicio",
    maxOffset: 100,
  });

  const { parallaxStyle: parallaxStyleFast } = useParallax({
    speed: -0.05,
    targetElementId: "inicio",
    maxOffset: 50,
  });

  // Memoized handlers
  const openPalestranteModal = useCallback((palestrante: Palestrante) => {
    setSelectedPalestrante(palestrante);
    setIsPalestranteModalOpen(true);
  }, []);

  const closePalestranteModal = useCallback(() => {
    setIsPalestranteModalOpen(false);
    setSelectedPalestrante(null);
  }, []);

  const openProgramacaoModal = useCallback(() => {
    setIsProgramacaoModalOpen(true);
  }, []);

  const closeProgramacaoModal = useCallback(() => {
    setIsProgramacaoModalOpen(false);
  }, []);

  // Optimized useInView with better thresholds
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: aboutRef, inView: aboutInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: highlightsRef, inView: highlightsInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: realizacaoRef, inView: realizacaoInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: localizacaoRef, inView: localizacaoInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { ref: palestrantesRef, inView: palestrantesInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Memoized transition classes for better performance
  const fadeInClass = useMemo(() => "transition-all duration-500 ease-out", []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        id="inicio"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 z-10"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-grid-pattern bg-center"></div>
        </div>

        {/* Optimized Floating Elements with Parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-2xl will-change-transform"
            style={parallaxStyleSlow}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-2xl will-change-transform"
            style={parallaxStyleFast}
          ></div>
        </div>

        <div
          className={`container mx-auto px-4 text-center z-10 ${fadeInClass} ${
            heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-primary mr-3" />
              <span className="text-primary font-semibold tracking-wide uppercase text-sm">
                Festival de Inovação e Negócios
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent leading-tight">
              FING 2024
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Conectando empreendedores, inovadores e visionários no coração de
              Pernambuco
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
              <div className="flex items-center text-foreground">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                <span className="font-medium">15-17 de Novembro</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border"></div>
              <div className="flex items-center text-foreground">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <span className="font-medium">Garanhuns, PE</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-border"></div>
              <div className="flex items-center text-foreground">
                <Users className="w-5 h-5 mr-2 text-primary" />
                <span className="font-medium">1000+ Participantes</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group transition-all duration-300">
                Garanta sua vaga
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="transition-all duration-300"
              >
                Ver programação
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Removed animate-bounce for better performance */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section
        id="sobre"
        ref={aboutRef}
        className="relative py-24 bg-muted/30 z-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`${fadeInClass} delay-100 ${
              aboutInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sobre o FING
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                O Festival de Inovação e Negócios de Garanhuns é o maior evento
                de empreendedorismo do Agreste pernambucano
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-6">Nossa História</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Nascido da visão de transformar Garanhuns em um hub de
                  inovação, o FING começou como um pequeno encontro de
                  empreendedores locais e evoluiu para o principal evento de
                  negócios da região.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Ao longo dos anos, o festival se consolidou como uma
                  plataforma essencial para o desenvolvimento do ecossistema
                  empreendedor, conectando startups, investidores, corporações e
                  talentos em busca de soluções inovadoras.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Cada edição do FING marca um novo capítulo na história do
                  empreendedorismo regional, gerando impactos duradouros que
                  transcendem os três dias de evento.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Imagem do evento</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Missão</h3>
                <p className="text-muted-foreground">
                  Fomentar o ecossistema de inovação e empreendedorismo,
                  conectando pessoas e ideias que transformam realidades e
                  impulsionam o desenvolvimento regional.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Visão</h3>
                <p className="text-muted-foreground">
                  Ser reconhecido como o principal evento de inovação do
                  Nordeste, inspirando uma nova geração de empreendedores e
                  líderes transformadores.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <History className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Valores</h3>
                <p className="text-muted-foreground">
                  Inovação, colaboração, sustentabilidade e impacto social.
                  Acreditamos no poder da tecnologia para criar um futuro melhor
                  para todos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Realização Section */}
      <section
        id="realizacao"
        ref={realizacaoRef}
        className="relative py-24 bg-background z-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`${fadeInClass} delay-150 ${
              realizacaoInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Realização
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Conheça quem torna o FING 2024 possível
              </p>
            </div>

            {/* Organizadores */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">
                Organizadores
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[1, 2, 3, 4].map((org) => (
                  <div key={org} className="text-center group">
                    <div className="aspect-square bg-muted/50 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Building className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">Organizador {org}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Patrocinadores Principais */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">
                Patrocinadores Colinas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[1, 2, 3].map((sponsor) => (
                  <div key={sponsor} className="text-center group">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Award className="w-16 h-16 text-primary" />
                    </div>
                    <p className="text-lg font-semibold">
                      Patrocinador Principal {sponsor}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Categoria Colinas
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Patrocinadores Columinho */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">
                Patrocinadores Columinho
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[1, 2, 3, 4, 5, 6].map((sponsor) => (
                  <div key={sponsor} className="text-center group">
                    <div className="aspect-square bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Award className="w-10 h-10 text-accent" />
                    </div>
                    <p className="text-sm font-medium">
                      Patrocinador {sponsor}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Categoria Columinho
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Apoiadores */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8">
                Apoiadores
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((apoiador) => (
                  <div key={apoiador} className="text-center group">
                    <div className="aspect-square bg-muted/30 rounded-lg mb-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Heart className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-xs font-medium">Apoiador {apoiador}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section
        ref={highlightsRef}
        className="relative py-24 bg-background z-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`${fadeInClass} delay-200 ${
              highlightsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Destaques do FING 2024
              </h2>
              <p className="text-xl text-muted-foreground">
                Uma experiência única de aprendizado e conexão
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Palestrantes especialistas
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-accent/10 to-accent/5 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">30</div>
                  <div className="text-sm text-muted-foreground">
                    Horas de conteúdo
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    20+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Workshops práticos
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-accent/10 to-accent/5 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    1000+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Oportunidades de networking
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Localização Section */}
      <section
        id="localizacao"
        ref={localizacaoRef}
        className="relative py-24 bg-muted/30 z-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`${fadeInClass} delay-100 ${
              localizacaoInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Localização
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Venha nos encontrar no coração de Garanhuns
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Mapa */}
              <div className="relative">
                <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Mapa do Google Maps aqui
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">
                    Centro de Convenções de Garanhuns
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Endereço</p>
                        <p className="text-muted-foreground">
                          Av. Rui Barbosa, 123 - Centro
                          <br />
                          Garanhuns - PE, 55295-000
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Data e Horário</p>
                        <p className="text-muted-foreground">
                          15 a 17 de Novembro de 2024
                          <br />
                          08:00 às 18:00
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Capacidade</p>
                        <p className="text-muted-foreground">
                          Auditório principal: 800 pessoas
                          <br />
                          Salas de workshop: 100 pessoas cada
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-xl border">
                  <h4 className="font-semibold mb-4">Como chegar</h4>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong>De carro:</strong> Acesso pela BR-424, saída para
                      o centro da cidade
                    </p>
                    <p>
                      <strong>De ônibus:</strong> Terminal rodoviário a 500m do
                      local
                    </p>
                    <p>
                      <strong>Estacionamento:</strong> Gratuito no local e ruas
                      adjacentes
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
                  <h4 className="font-semibold mb-4 text-primary">
                    Informações importantes
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Chegue com 30 minutos de antecedência</p>
                    <p>• Traga documento de identificação</p>
                    <p>• Local acessível para pessoas com deficiência</p>
                    <p>• Wi-Fi gratuito disponível</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Palestrantes Section */}
      <section
        id="palestrantes"
        ref={palestrantesRef}
        className="relative py-24 bg-background z-20"
      >
        <div className="container mx-auto px-4">
          <div
            className={`${fadeInClass} delay-100 ${
              palestrantesInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Palestrantes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Especialistas renomados que compartilharão conhecimento e
                inspiração
              </p>
            </div>

            {/* Palestrantes Principais */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">
                Keynote Speakers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {palestrantesData.map((palestrante, index) => (
                  <div
                    key={index}
                    className="text-center group cursor-pointer"
                    onClick={() => openPalestranteModal(palestrante)}
                  >
                    <div className="relative mb-6">
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 w-48 h-48 mx-auto">
                        <Users className="w-20 h-20 text-primary" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs font-medium">
                          Clique para ver detalhes
                        </div>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold mb-2">
                      {palestrante.nome}
                    </h4>
                    <p className="text-primary font-medium mb-2">
                      {palestrante.cargo}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      "{palestrante.tema}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Outros Palestrantes */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8">
                Especialistas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
                {especialistas.map((especialista, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className="aspect-square bg-muted/30 rounded-xl mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 group-hover:bg-primary/10">
                      <Users className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <h5 className="font-semibold text-sm mb-1">
                      {especialista.nome}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      {especialista.cargo}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA para ver programação */}
            <div className="text-center mt-16">
              <p className="text-muted-foreground mb-6">
                Quer saber quando cada palestrante apresenta?
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={openProgramacaoModal}
                className="transition-all duration-300"
              >
                Ver programação completa
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="programacao"
        className="relative py-24 bg-gradient-to-r from-primary to-primary/80 z-20"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Pronto para transformar sua jornada?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Junte-se a nós no FING 2024 e faça parte da maior rede de inovação
            do Agreste
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="group transition-all duration-300"
          >
            Inscreva-se agora
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </section>

      {/* Modais */}
      <PalestranteModal
        isOpen={isPalestranteModalOpen}
        onClose={closePalestranteModal}
        palestrante={selectedPalestrante}
      />

      <ProgramacaoModal
        isOpen={isProgramacaoModalOpen}
        onClose={closeProgramacaoModal}
      />
    </div>
  );
}
