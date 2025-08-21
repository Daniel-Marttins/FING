import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AdminLayout } from "./components/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPalestrantes from "./pages/AdminPalestrantes";
import { PlaceholderPage } from "./components/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <Layout>
              <Index />
            </Layout>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="palestrantes" element={<AdminPalestrantes />} />
                  <Route path="info" element={
                    <PlaceholderPage
                      title="Informações Gerais"
                      description="Gerencie informações básicas do evento"
                    />
                  } />
                  <Route path="programacao" element={
                    <PlaceholderPage
                      title="Programação"
                      description="Gerencie a programação do evento"
                    />
                  } />
                  <Route path="realizacao" element={
                    <PlaceholderPage
                      title="Realização"
                      description="Gerencie organizadores e patrocinadores"
                    />
                  } />
                  <Route path="localizacao" element={
                    <PlaceholderPage
                      title="Localização"
                      description="Gerencie informações de localização"
                    />
                  } />
                  <Route path="tema" element={
                    <PlaceholderPage
                      title="Tema Visual"
                      description="Customize cores e estilos do site"
                    />
                  } />
                  <Route path="configuracoes" element={
                    <PlaceholderPage
                      title="Configurações"
                      description="Configurações gerais do sistema"
                    />
                  } />
                  <Route path="*" element={<AdminDashboard />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
