import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface AdminLayoutProps {
  children: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}
