import React from 'react';
import { AIChatBox } from '../components/ai/AIChatBox';
import { Bot, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export function AIConsultantPage({ vehicles, onSelectVehicle }) {
  return (
    <div className="pt-24 pb-20 space-y-12">
      <div className="border-b border-ink/10 bg-surface-band py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>Consultoria Especializada por IA</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
            Consultor Automotivo Inteligente
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2 font-light">
            Tire dúvidas em tempo real, descubra qual superesportivo cabe no seu investimento e compare custos de manutenção especializada.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <AIChatBox vehicles={vehicles} onSelectVehicle={onSelectVehicle} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-surface-card border border-ink/10 space-y-1">
            <span className="font-bold text-ink flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" /> Comparação de TCO
            </span>
            <p className="text-slate-400">Analisa despesas anuais com IPVA, seguro e manutenção especializada.</p>
          </div>
          <div className="p-4 rounded-2xl bg-surface-card border border-ink/10 space-y-1">
            <span className="font-bold text-ink flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Laudo Cautelar
            </span>
            <p className="text-slate-400">Recomenda apenas veículos com procedência certificada.</p>
          </div>
          <div className="p-4 rounded-2xl bg-surface-card border border-ink/10 space-y-1">
            <span className="font-bold text-ink flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" /> Perfil Customizado
            </span>
            <p className="text-slate-400">Indicações para colecionismo, uso diário ou blindagem.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
