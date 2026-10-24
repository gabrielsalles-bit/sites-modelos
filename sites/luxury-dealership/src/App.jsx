import React from 'react';
import { Shield, Sparkles, ChevronRight, PhoneCall, Award, Eye, KeyRound, ArrowLeft } from 'lucide-react';

export function App() {
  const cars = [
    { name: 'Porsche 911 GT3 RS', year: '2024', price: 'R$ 2.450.000', power: '525 cv', tag: 'Pronta Entrega' },
    { name: 'Ferrari F8 Tributo', year: '2023', price: 'R$ 3.890.000', power: '720 cv', tag: 'Exclusivo' },
    { name: 'Lamborghini Huracán Evo', year: '2023', price: 'R$ 3.650.000', power: '640 cv', tag: 'Blindagem Nível III-A' },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Bar Navigation */}
      <nav className="border-b border-white/10 bg-[#050508]/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/sites-modelos/" className="inline-flex items-center gap-1.5 text-xs text-amber-400/80 hover:text-amber-300 transition-colors mr-4">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Hub</span>
          </a>
          <span className="text-xl font-black font-heading tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
            APEX MOTORS
          </span>
          <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Luxury & Exotic
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
          <a href="#showroom" className="hover:text-amber-400 transition-colors">Showroom VIP</a>
          <a href="#concierge" className="hover:text-amber-400 transition-colors">Concierge</a>
          <a href="#blindados" className="hover:text-amber-400 transition-colors">Blindados</a>
        </div>

        <a
          href="https://wa.me/"
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20"
        >
          Agendar Atendimento VIP
        </a>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-24 pb-20 px-4 sm:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs tracking-wider uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Modelo 02 • Concessionária de Luxo e Exóticos</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-tight mb-6">
          A Máxima Expressão da <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
            Engenharia Automotiva
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Acervo selecionado de superesportivos, modelos exóticos e veículos blindados com procedência rastreada internacionalmente e entrega personalizada em todo o Brasil.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#showroom"
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all shadow-xl shadow-amber-500/20"
          >
            Explorar Coleção VIP
          </a>
          <a
            href="#concierge"
            className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium text-sm transition-all"
          >
            Serviço de Concierge
          </a>
        </div>
      </header>

      {/* Showroom Preview Grid */}
      <section id="showroom" className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Acervo Exclusivo</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">Veículos Disponíveis</h2>
          </div>
          <span className="text-xs text-slate-400">Entrega imediata em transportadora fechada</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.map((car, idx) => (
            <div key={idx} className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 font-medium border border-amber-500/20">
                    {car.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{car.year}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {car.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-4 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" /> Potência: {car.power}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Valor</span>
                  <span className="text-lg font-bold text-amber-300 font-heading">{car.price}</span>
                </div>
                <button className="p-2 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-black text-slate-300 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars Section */}
      <section id="concierge" className="max-w-6xl mx-auto px-4 sm:px-8 py-16 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <Shield className="w-8 h-8 text-amber-400 mb-4" />
            <h4 className="font-bold text-white mb-2">Blindagem Certificada</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Veículos com proteção balística nível III-A inspecionados com laudo e garantia de vidros sem delaminação.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <Award className="w-8 h-8 text-amber-400 mb-4" />
            <h4 className="font-bold text-white mb-2">Curadoria & Procedência</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Todos os modelos passam por verificação minuciosa de histórico, revisões em concessionária oficial e baixa quilometragem.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <Eye className="w-8 h-8 text-amber-400 mb-4" />
            <h4 className="font-bold text-white mb-2">Showroom Privativo</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Agendamento de visitas com total discrição e consultoria individualizada com horário reservado exclusivo.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-xs text-slate-500">
        © 2026 Apex Luxury Motors — Modelo 02 integrante do ecossistema de sites modelos.
      </footer>
    </div>
  );
}

export default App;