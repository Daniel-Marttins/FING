import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Calendar,
  MapPin,
  Users,
  Clock,
  Info,
  Building,
} from "lucide-react";
import { Button } from "./ui/button";
import { useActiveSection } from "@/hooks";
import { LayoutProps, NavigationItem } from "@/types";

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Memoize navigation to prevent re-creation on every render
  const navigation: NavigationItem[] = useMemo(
    () => [
      { name: "Início", href: "#inicio", icon: Calendar },
      { name: "Sobre", href: "#sobre", icon: Info },
      { name: "Realização", href: "#realizacao", icon: Building },
      { name: "Localização", href: "#localizacao", icon: MapPin },
      { name: "Palestrantes", href: "#palestrantes", icon: Users },
      { name: "Programação", href: "#programacao", icon: Clock },
    ],
    [],
  );

  // Use optimized hook for active section management
  const { activeSection, handleNavClick } = useActiveSection({
    sections: navigation,
    offset: 100,
  });

  const isActivePath = (hash: string) => {
    return activeSection === hash;
  };

  const handleNavClickWithMenu = (href: string) => {
    handleNavClick(href);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets%2F42e34fe79f13424399d236fc2c7311f6%2Feb31e9232fe94232aad18320963e5242?format=webp&width=800"
                  alt="FING 2024 Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-xl text-gradient">
                FING 2024
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="nav-link group relative px-2 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out ${
                    isActivePath(item.href) 
                      ? 'w-full' 
                      : 'w-0 group-hover:w-full'
                  }`}></div>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-primary/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/40">
              <nav className="flex flex-col space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavClickWithMenu(item.href)}
                      className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg mx-2 ${
                        isActivePath(item.href)
                          ? "bg-primary/10 text-primary border-l-2 border-primary"
                          : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                  <img 
                    src="https://cdn.builder.io/api/v1/image/assets%2F42e34fe79f13424399d236fc2c7311f6%2Feb31e9232fe94232aad18320963e5242?format=webp&width=800"
                    alt="FING 2024 Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-bold text-xl text-gradient">
                  FING 2024
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Festival de Inovação e Negócios de Garanhuns - Um evento
                transformador que conecta empreendedores, inovadores e
                visionários.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📧 contato@fing2024.com.br</p>
                <p>📱 (87) 99999-9999</p>
                <p>📍 Garanhuns - PE</p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
                >
                  <span>Instagram</span>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
                >
                  <span>LinkedIn</span>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
                >
                  <span>Facebook</span>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 FING - Festival de Inovação e Negócios. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
