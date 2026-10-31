import React from 'react';
import { TradeInEvaluation } from '../components/home/TradeInEvaluation';
import { ArrowLeftRight } from 'lucide-react';

export function TradeInPage() {
  return (
    <div className="pt-24 pb-20 space-y-12">
      {/* Page Header */}
      <div className="border-b border-slate-800/80 bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Troca Fácil</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
            Dê seu Carro como Entrada
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2 font-light">
            Avaliamos seu veículo usado com critério justo e usamos o valor direto na entrada do seu próximo carro.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TradeInEvaluation />
      </div>
    </div>
  );
}
