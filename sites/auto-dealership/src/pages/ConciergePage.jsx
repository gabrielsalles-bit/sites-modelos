import React from 'react';
import { Search, CalendarCheck, FileCheck, ShieldCheck, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { buildGeneralWhatsappLink } from '../utils/whatsapp';

export function ConciergePage() {
  const whatsappUrl = buildGeneralWhatsappLink('Olá, gostaria de falar com um consultor dedicado da AutoElite Motors.');

  const services = [
    {
      icon: Search,
      title: 'Busca Personalizada de Veículo',
      desc: 'Não achou o modelo ideal no estoque? Localizamos o carro certo pra você, com o mesmo padrão de perícia cautelar da casa.'
    },
    {
      icon: CalendarCheck,
      title: 'Agendamento Assistido de Test-Drive',
      desc: 'Marque um horário com um consultor disponível pra tirar todas as dúvidas antes, durante e depois do test-drive.'
    },
    {
      icon: FileCheck,
      title: 'Suporte Completo de Documentação',
      desc: 'Cuidamos da burocracia de transferência, financiamento e seguro pra você não perder tempo com isso.'
    },
    {
      icon: ShieldCheck,
      title: 'Inspeção Prévia Acompanhada',
      desc: 'Quer levar seu mecânico de confiança? Agendamos um horário reservado pra avaliação externa antes do fechamento.'
    }
  ];

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Header */}
      <div className="border-b border-slate-800/80 bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Atendimento Consultivo</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
            Consultor Dedicado AutoElite
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2 font-light">
            Um consultor te acompanha do primeiro contato até a entrega das chaves — sem letras miúdas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="p-8 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/60 text-blue-400 flex items-center justify-center border border-slate-700/50">
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
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-heading text-2xl font-bold text-ink">Quer falar direto com um consultor?</h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Atendimento sem fila de espera, pelo WhatsApp, em horário comercial estendido.
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
