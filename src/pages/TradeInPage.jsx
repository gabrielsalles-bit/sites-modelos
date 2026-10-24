import React from 'react';
import { TradeInEvaluation } from '../components/home/TradeInEvaluation';
import { ArrowLeftRight, CheckCircle2, ShieldCheck, DollarSign, FileCheck, Sparkles } from 'lucide-react';

export function TradeInPage({ vehicles }) {
  const steps = [
    {
      num: "01",
      titulo: "Preencha o Formulário",
      descricao: "Informe os dados básicos do seu carro (marca, modelo, ano e km) e o modelo que deseja levar."
    },
    {
      num: "02",
      titulo: "Pré-avaliação Online",
      descricao: "Nossa equipe calcula o valor de mercado e envia a proposta diretamente para o seu WhatsApp."
    },
    {
      num: "03",
      titulo: "Inspeção Cautelar Rápida",
      descricao: "Traga o carro ao nosso showroom no SIA para uma checagem expressa de 20 minutos."
    },
    {
      num: "04",
      titulo: "Saia de Carro Novo",
      descricao: "O valor entra como entrada integral ou troco na sua conta bancária na mesma hora."
    }
  ];

  return (
    <div className="pt-24 pb-20 space-y-12">
      {/* Page Header */}
      <div className="border-b border-slate-800/80 bg-gradient-to-b from-emerald-950/20 via-slate-950 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Avaliação Justa & Transparente</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Avalie seu Veículo na Troca
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2 font-light">
            Dê o seu carro usado como entrada para sair com um modelo novo, periciado e com 1 ano de garantia. Avaliação expressa e pagamento imediato.
          </p>
        </div>
      </div>

      {/* Como Funciona a Troca (4 Passos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Passo a Passo</span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Como funciona a troca na AutoElite?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((passo, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 relative overflow-hidden">
              <span className="font-heading font-black text-4xl text-emerald-500/20 absolute top-3 right-4 select-none">
                {passo.num}
              </span>
              <h3 className="font-heading font-bold text-lg text-white">
                {passo.titulo}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {passo.descricao}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Formulário Principal de Troca */}
      <TradeInEvaluation vehicles={vehicles} />
    </div>
  );
}
