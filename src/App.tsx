import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Home } from "@/pages/Home";
import { Explore } from "@/pages/Explore";
import { About } from "@/pages/About";
import NotFound from "./pages/NotFound";
import Publicar from './pages/Publicar';
import ContentDetail from './pages/ContentDetail';
import ContentList from './pages/ContentList';
import ContentForm from './pages/ContentForm';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nextProvider i18n={i18n}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/about" element={<About />} />
                <Route path="/publicar" element={<Publicar />} />
                <Route path="/content/:id" element={<ContentDetail />} />
                
                {/* Rotas de Administração */}
                <Route path="/admin/conteudos" element={<ContentList />} />
                <Route path="/admin/conteudos/novo" element={<ContentForm />} />
                <Route path="/admin/conteudos/:id/editar" element={<ContentForm />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </I18nextProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
