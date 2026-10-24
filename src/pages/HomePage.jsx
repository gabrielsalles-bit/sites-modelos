import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StatsSection } from '../components/home/StatsSection';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { Button } from '../components/ui/Button';
import { ArrowRight, Sparkles, Calculator, ArrowLeftRight, ShieldCheck } from 'lucide-react';

export function HomePage({ vehicles, onNavigate, onSelectVehicle }) {
  // 3 veículos em maior destaque para a home
  const topVehicles = vehicles.filter(v => v.destaque).slice(0, 3);

  const handleHeroSearch = ({ term, category }) => {
    onNavigate('estoque', { term, category });
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero com busca rápida */}
      <HeroSection onSearch={handleHeroSearch} />

      {/* Régua de Estatísticas */}
      <StatsSection />

      {/* Vitrine de Destaques Rápidos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Seleção da Semana</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              Veículos em Destaque
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Modelos com laudo cautelar 100% aprovado e garantia total.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            icon={ArrowRight}
            onClick={() => onNavigate('estoque')}
          >
            Ver Todo o Estoque ({vehicles.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topVehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onSelect={onSelectVehicle}
            />
          ))}
        </div>
      </section>

      {/* Banners Duplos de Ação Rápida (Financiamento & Troca) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Simulador */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-slate-900 border border-blue-500/30 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">
                Simulador de Financiamento
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                Calcule o valor das parcelas em tempo real com taxas especiais dos principais bancos parceiros e receba a pré-aprovação no WhatsApp.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              onClick={() => onNavigate('simulador')}
              className="w-full sm:w-auto self-start"
            >
              Simular Parcelas Agora
            </Button>
          </div>

          {/* Card Avaliação de Usado */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <ArrowLeftRight className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">
                Avalie seu Usado na Troca
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                Quer dar seu carro atual como entrada? Avaliamos seu seminovo com valor justo e fazemos troca com troco caso sobre valor.
              </p>
            </div>
            <Button
              variant="whatsapp"
              size="md"
              icon={ArrowRight}
              onClick={() => onNavigate('troca')}
              className="w-full sm:w-auto self-start"
            >
              Solicitar Avaliação do Usado
            </Button>
          </div>
        </div>
      </section>

      {/* Por que escolher a AutoElite */}
      <WhyUsSection />
    </div>
  );
}
