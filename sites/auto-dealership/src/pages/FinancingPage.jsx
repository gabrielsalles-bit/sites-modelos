import React from 'react';
import { FinancingSimulator } from '../components/home/FinancingSimulator';
import { Calculator, CheckCircle2, ShieldCheck, Clock, FileText, Building2 } from 'lucide-react';

export function FinancingPage({ vehicles, preselectedVehicle }) {
  const bankPartners = [
    { nome: "Santander Financiamentos", taxas: "A partir de 1,49% a.m." },
    { nome: "BV Financeira", taxas: "Até 60 dias para 1ª parcela" },
    { nome: "Itaú Auto", taxas: "Aprovação em até 15 minutos" },
    { nome: "Bradesco Financiamentos", taxas: "Condições especiais p/ correntistas" }
  ];

  const faqs = [
    {
      pergunta: "Quais documentos são necessários para aprovar o crédito?",
      resposta: "Apenas RG/CNH válida e comprovante de residência atualizado. Para a maioria dos cadastros, a aprovação é digital via CPF sem burocracia."
    },
    {
      pergunta: "Autônomos e MEI conseguem financiar?",
      resposta: "Sim! Possuímos linhas de crédito homologadas específicas para profissionais liberais, motoristas de app e microempreendedores individuais."
    },
    {
      pergunta: "Posso dar meu carro usado como entrada?",
      resposta: "Com certeza. Avaliamos seu veículo na hora e o valor correspondente entra como entrada integral ou parcial no financiamento."
    }
  ];

  return (
    <div className="pt-24 pb-20 space-y-12">
      {/* Page Header */}
      <div className="border-b border-slate-800/80 bg-gradient-to-b from-blue-950/20 via-slate-950 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Condições Especiais de Crédito</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Simulador de Financiamento
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2 font-light">
            Faça simulações em tempo real, ajuste a entrada e o número de parcelas, e envie seus dados diretamente para nossa mesa de crédito bancária.
          </p>
        </div>
      </div>

      {/* Simulador Interativo */}
      <FinancingSimulator
        vehicles={vehicles}
        selectedVehicleFromModal={preselectedVehicle}
      />

      {/* Bancos Parceiros */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Instituições Parceiras Homologadas</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Bancos Credenciados
            </h3>
            <p className="text-xs text-slate-400">
              Negociamos com os maiores bancos do país para garantir a menor parcela do mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bankPartners.map((banco, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-center space-y-1">
                <p className="font-bold text-sm text-white">{banco.nome}</p>
                <p className="text-xs text-emerald-400 font-medium">{banco.taxas}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dúvidas Frequentes sobre Financiamento */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="font-heading text-2xl font-bold text-white text-center">
          Dúvidas Frequentes sobre Financiamento
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="font-semibold text-sm sm:text-base text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{faq.pergunta}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 pl-6 leading-relaxed">
                {faq.resposta}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
