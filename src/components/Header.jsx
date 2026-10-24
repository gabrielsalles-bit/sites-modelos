import React from 'react';
import { Layers, Sparkles, LayoutGrid, CheckCircle2 } from 'lucide-react';

export const Header = () => {
  return (
    <header className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Badges */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Monorepo Multi-Sites • 3 Modelos de Alta Performance</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight mb-6">
        Catálogo de Sites <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">Modelos & Templates</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-8">
        Ecossistema com arquitetura modular projetada para abrigar 3 modelos de sites comerciais completos, otimizados para conversão, velocidade e experiência do usuário.
      </p>

      {/* Quick Metrics Bar */}
      <div className="inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-white">1 Modelo Ativo</span>
        </div>
        <div className="h-4 w-px bg-slate-700 hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="font-medium text-slate-300">2 Modelos em Expansão</span>
        </div>
        <div className="h-4 w-px bg-slate-700 hidden sm:block" />
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span className="font-medium text-slate-300">Deploy Integrado no GitHub Pages</span>
        </div>
      </div>
    </header>
  );
};

export default Header;