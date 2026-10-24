import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Calculator, BadgePercent, Zap, MessageSquare, Car, ArrowRight } from 'lucide-react';

export function App() {
  const [carPrice, setCarPrice] = useState(65000);
  const [downPayment, setDownPayment] = useState(15000);
  const financed = Math.max(carPrice - downPayment, 0);
  const monthly = Math.round((financed * 1.0185) / 48);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Banner Navigation */}
      <nav className="border-b border-slate-800 bg-[#090d16]/90 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/sites-modelos/" className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors mr-3">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Hub</span>
          </a>
          <span className="text-xl font-black font-heading tracking-tight text-white flex items-center gap-1.5">
            <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            DRIVENOW <span className="text-emerald-400">MOTORS</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
          <a href="#simulador" className="hover:text-emerald-400 transition-colors">Simular Financiamento</a>
          <a href="#estoque" className="hover:text-emerald-400 transition-colors">Estoque Fácil</a>
          <a href="#troca" className="hover:text-emerald-400 transition-colors">Troca com Troco</a>
        </div>

        <a
          href="https://wa.me/"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
        >
          Aprovar Meu Crédito
        </a>
      </nav>

      {/* Hero Header */}
      <header className="relative pt-20 pb-16 px-4 sm:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <BadgePercent className="w-4 h-4" />
          <span>Modelo 03 • Revenda com Foco em Financiamento & Conversão</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-tight mb-6">
          Seu Carro Novo com <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Aprovação em até 15 Minutos
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-8">
          Aceitamos seu veículo usado com avaliação acima da média, parcelamos a entrada no cartão e trabalhamos com todos os bancos com as melhores taxas do mercado.
        </p>

        {/* Benefits Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300 mb-10">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sem CNH ou Comprovante de Renda
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Troca com Troco no Pix
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1ª Parcela para até 60 Dias
          </span>
        </div>
      </header>

      {/* Simulator Section */}
      <section id="simulador" className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-heading text-white">Simulador de Parcelas Rápido</h2>
              <p className="text-xs text-slate-400">Veja como fica a sua mensalidade estimada em tempo real</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Valor do Veículo:</span>
                  <span className="font-bold text-white">R$ {carPrice.toLocaleString('pt-BR')}</span>
                </div>
                <input
                  type="range"
                  min="30000"
                  max="150000"
                  step="5000"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Valor da Entrada:</span>
                  <span className="font-bold text-white">R$ {downPayment.toLocaleString('pt-BR')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={carPrice}
                  step="2000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#090d16] border border-slate-800 flex flex-col justify-between text-center">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                  Parcela Estimada (48x)
                </span>
                <span className="text-4xl font-extrabold text-emerald-400 font-heading">
                  R$ {monthly.toLocaleString('pt-BR')}<span className="text-base text-slate-400 font-normal">/mês</span>
                </span>
                <p className="text-[11px] text-slate-500 mt-2">
                  *Sujeito a análise cadastral e score de crédito bancário.
                </p>
              </div>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="mt-6 w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm inline-flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
              >
                <span>Enviar Simulação no WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500 mt-12">
        © 2026 DriveNow Motors — Modelo 03 integrante do ecossistema de sites modelos.
      </footer>
    </div>
  );
}

export default App;