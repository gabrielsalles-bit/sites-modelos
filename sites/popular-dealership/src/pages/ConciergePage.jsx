import React from 'react';
import { Bot, CalendarClock, Calculator, ShieldCheck, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { buildGeneralWhatsappLink } from '../utils/whatsapp';

export function ConciergePage() {
  const whatsappUrl = buildGeneralWhatsappLink('Olá, gostaria de falar com um consultor dedicado da DriveNow Motors.');

  const services = [
    {
      icon: Bot,
      title: 'Busca Inteligente sob Encomenda',
      desc: 'Não achou o modelo? Nosso time cruza várias fontes de estoque pra localizar o veículo exato que você procura.'
    },
    {
      icon: CalendarClock,
      title: 'Agendamento Expresso de Test-Drive',
      desc: 'Marque em poucos cliques e receba lembrete automático por WhatsApp — sem espera no showroom.'
    },
    {
      icon: Calculator,
      title: 'Suporte Total de Financiamento',
      desc: 'Um consultor acompanha sua proposta nos 10 bancos parceiros até a aprovação, sem você precisar repetir dados.'
    },
    {
      icon: ShieldCheck,
      title: 'Inspeção Técnica Prioritária',
      desc: 'Prioridade na fila de perícia cautelar pra quem já está em negociação avançada com a gente.'
    }
  ];

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Header */}
      <div className="border-b border-slate-800 bg-surface-band py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <Bot className="w-3.5 h-3.5" />
            <span>Atendimento Consultivo</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
            Concierge Digital DriveNow
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2 font-light">
            Tecnologia e um consultor humano dedicado trabalhando juntos pra agilizar sua compra.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="p-8 rounded-3xl bg-surface-page border border-slate-800 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/60 text-cyan-400 flex items-center justify-center border border-slate-700/50">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-ink">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-surface-page border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-heading text-2xl font-bold text-ink">Quer falar direto com um consultor?</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Atendimento combinando agilidade digital com gente de verdade do outro lado.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={MessageCircle}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            Falar com Consultor Dedicado
          </Button>
        </div>
      </div>
    </div>
  );
}
