import { Toaster } from "@/components/ui/toaster";
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
import AdminInfo from "./pages/AdminInfo";
import AdminProgramacao from "./pages/AdminProgramacao";
import AdminRealizacao from "./pages/AdminRealizacao";
import AdminLocalizacao from "./pages/AdminLocalizacao";
import AdminTema from "./pages/AdminTema";
import AdminConfiguracoes from "./pages/AdminConfiguracoes";
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
          <Route
            path="/"
            element={
              <Layout>
                <Index />
              </Layout>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route
                      path="palestrantes"
                      element={<AdminPalestrantes />}
                    />
                    <Route path="info" element={<AdminInfo />} />
                    <Route path="programacao" element={<AdminProgramacao />} />
                    <Route path="realizacao" element={<AdminRealizacao />} />
                    <Route path="localizacao" element={<AdminLocalizacao />} />
                    <Route path="tema" element={<AdminTema />} />
                    <Route
                      path="configuracoes"
                      element={<AdminConfiguracoes />}
                    />
                    <Route path="*" element={<AdminDashboard />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
