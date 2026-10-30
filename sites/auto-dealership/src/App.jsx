import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ComparisonFloatingBar } from './components/layout/ComparisonFloatingBar';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { FeaturedPage } from './pages/FeaturedPage';
import { FinancingPage } from './pages/FinancingPage';
import { TradeInPage } from './pages/TradeInPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ComparatorPage } from './pages/ComparatorPage';
import { ConciergePage } from './pages/ConciergePage';
import { AIConsultantPage } from './pages/AIConsultantPage';
import { AboutContactPage } from './pages/AboutContactPage';
import { VehicleDetailModal } from './components/vehicles/VehicleDetailModal';
import { VehicleComparatorModal } from './components/vehicles/VehicleComparatorModal';
import { vehiclesData } from './data/vehicles';
import { useFavorites } from './hooks/useFavorites';
import { useComparator } from './hooks/useComparator';
import { buildGeneralWhatsappLink } from './utils/whatsapp';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState(null);
  const [searchFilter, setSearchFilter] = useState({ term: '', category: 'todos' });
  const [financingPreselectedVehicle, setFinancingPreselectedVehicle] = useState(null);
  const [comparatorModalOpen, setComparatorModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const {
    favoriteIds,
    toggleFavorite,
    isFavorite,
    favoritesCount,
    favoriteVehicles
  } = useFavorites(vehiclesData);

  const {
    comparedIds,
    toggleCompare,
    isComparing,
    clearCompared,
    comparedCount,
    comparedVehicles
  } = useComparator(vehiclesData);

  const navigateTo = (page, params = {}) => {
    setCurrentPage(page);

    if (params.term !== undefined || params.category !== undefined) {
      setSearchFilter({
        term: params.term || '',
        category: params.category || 'todos'
      });
    }

    if (params.vehicle) {
      setFinancingPreselectedVehicle(params.vehicle);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContactFromModal = (vehicle) => {
    setSelectedVehicleForModal(null);
    navigateTo('sobre-contato');
  };

  const handleOpenFinancingFromModal = (vehicle) => {
    setSelectedVehicleForModal(null);
    navigateTo('simulador', { vehicle });
  };

  const floatingWhatsappUrl = buildGeneralWhatsappLink();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative">
      {/* Barra de Navegação no Topo */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        favoritesCount={favoritesCount}
        comparedCount={comparedCount}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Conteúdo Dinâmico da Página Ativa */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            vehicles={vehiclesData}
            onNavigate={navigateTo}
            onSelectVehicle={(v) => setSelectedVehicleForModal(v)}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            isComparing={isComparing}
            onToggleCompare={toggleCompare}
          />
        )}

        {currentPage === 'estoque' && (
          <InventoryPage
            vehicles={vehiclesData}
            searchFilter={searchFilter}
            onClearFilter={() => setSearchFilter({ term: '', category: 'todos' })}
            onSelectVehicle={(v) => setSelectedVehicleForModal(v)}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            isComparing={isComparing}
            onToggleCompare={toggleCompare}
          />
        )}

        {currentPage === 'destaques' && (
          <FeaturedPage
            vehicles={vehiclesData}
            onNavigate={navigateTo}
            onSelectVehicle={(v) => setSelectedVehicleForModal(v)}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            isComparing={isComparing}
            onToggleCompare={toggleCompare}
          />
        )}

        {currentPage === 'simulador' && (
          <FinancingPage
            vehicles={vehiclesData}
            preselectedVehicle={financingPreselectedVehicle}
          />
        )}

        {currentPage === 'troca' && (
          <TradeInPage />
        )}

        {currentPage === 'comparador' && (
          <ComparatorPage
            comparedVehicles={comparedVehicles}
            onRemoveFromCompare={toggleCompare}
            onNavigate={navigateTo}
            onOpenFinancing={handleOpenFinancingFromModal}
          />
        )}

        {currentPage === 'favoritos' && (
          <FavoritesPage
            favoriteVehicles={favoriteVehicles}
            onNavigate={navigateTo}
            onSelectVehicle={(v) => setSelectedVehicleForModal(v)}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            isComparing={isComparing}
            onToggleCompare={toggleCompare}
          />
        )}

        {currentPage === 'concierge' && (
          <ConciergePage />
        )}

        {currentPage === 'consultor-ia' && (
          <AIConsultantPage
            vehicles={vehiclesData}
            onSelectVehicle={(v) => setSelectedVehicleForModal(v)}
          />
        )}

        {currentPage === 'sobre-contato' && (
          <AboutContactPage />
        )}
      </main>

      {/* Rodapé com Links entre Páginas */}
      <Footer onNavigate={navigateTo} />

      {/* Barra Flutuante de Comparação Ativa */}
      {currentPage !== 'comparador' && (
        <ComparisonFloatingBar
          comparedVehicles={comparedVehicles}
          onOpenComparator={() => setComparatorModalOpen(true)}
          onClear={clearCompared}
        />
      )}

      {/* Modal Global de Detalhes & Galeria Expandida */}
      {selectedVehicleForModal && (
        <VehicleDetailModal
          vehicle={selectedVehicleForModal}
          onClose={() => setSelectedVehicleForModal(null)}
          onContact={handleOpenContactFromModal}
          onOpenFinancing={handleOpenFinancingFromModal}
        />
      )}

      {/* Modal de Comparação Lado a Lado */}
      {comparatorModalOpen && (
        <VehicleComparatorModal
          vehicles={comparedVehicles}
          onClose={() => setComparatorModalOpen(false)}
          onOpenFinancing={handleOpenFinancingFromModal}
        />
      )}

      {/* Botão Flutuante de WhatsApp — só no mobile (no desktop o CTA já fica fixo no header) */}
      <a
        href={floatingWhatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="sm:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 border border-emerald-400/40 transition-all duration-300 group"
        title="Falar com consultor no WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300"></span>
        </div>
      </a>
    </div>
  );
}
