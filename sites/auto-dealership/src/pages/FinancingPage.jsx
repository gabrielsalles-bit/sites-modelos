import React from 'react';
import { FinancingSimulator } from '../components/home/FinancingSimulator';
import { Calculator, ShieldCheck, Clock3, FileCheck } from 'lucide-react';

export function FinancingPage({ vehicles, preselectedVehicle }) {
  return (
    <div className="pt-24 pb-20 space-y-12">
      {/* Page Header */}
      <div className="border-b border-slate-800/80 bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulação Rápida</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
            Simulador de Financiamento
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2 font-light">
            Veja uma estimativa de parcelas em segundos e já envie pra um consultor finalizar a aprovação.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <FinancingSimulator vehicles={vehicles} preselectedVehicle={preselectedVehicle} />

        {/* Pilares do Financiamento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
            <h4 className="font-bold text-ink text-sm">Bancos Parceiros</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trabalhamos com as principais instituições financeiras para garantir a melhor taxa pro seu perfil.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <Clock3 className="w-6 h-6 text-blue-400" />
            <h4 className="font-bold text-ink text-sm">Pré-Aprovação em 15 Minutos</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Análise de crédito rápida, com documentação simplificada para pessoa física.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <FileCheck className="w-6 h-6 text-blue-400" />
            <h4 className="font-bold text-ink text-sm">Sem Letras Miúdas</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Simulação transparente, sem pegadinhas — o valor que você vê é o que entra no contrato.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
