import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, RotateCcw, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export function AIChatBox({ vehicles = [], onSelectVehicle }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Olá! Sou o Consultor Virtual com Inteligência Artificial da Apex Luxury Motors. Posso te ajudar a encontrar o superesportivo ideal pelo seu investimento, perfil de uso ou comparar custos de manutenção. O que você procura hoje?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    'Qual superesportivo é mais indicado para o dia a dia?',
    'Modelos com parcelas de até R$ 50.000?',
    'Qual carro tem menor custo anual (TCO)?',
    'Vocês têm veículos blindados no acervo?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let responseText = '';
      let recommendedCars = [];

      if (lower.includes('blindado') || lower.includes('blindagem') || lower.includes('proteção') || lower.includes('protecao')) {
        recommendedCars = vehicles.filter(v => v.blindado).slice(0, 2);
        responseText = recommendedCars.length > 0
          ? `Sim! Temos superesportivos com **blindagem Nível III-A** certificada em nosso acervo, como o **${recommendedCars[0]?.nome}**. Confira os detalhes abaixo:`
          : `No momento não há unidades blindadas disponíveis no acervo, mas posso acionar nosso Concierge VIP para localizar uma em coleções privadas.`;
      } else if (lower.includes('dia a dia') || lower.includes('suv') || lower.includes('conforto')) {
        recommendedCars = vehicles.filter(v => v.categoria === 'suv').slice(0, 2);
        responseText = `Para uso diário com todo o refinamento Apex, recomendamos o **${recommendedCars[0]?.nome}**, que une conforto de SUV de luxo com desempenho de superesportivo. Veja os detalhes abaixo:`;
      } else if (lower.includes('parcela') || lower.includes('50.000') || lower.includes('50000') || lower.includes('investimento')) {
        recommendedCars = vehicles.filter(v => v.parcela && v.parcela.valor <= 50000).slice(0, 2);
        responseText = `Temos opções selecionadas com entrada VIP e parcelas a partir de ${formatCurrency(recommendedCars[0]?.parcela?.valor || 15400)}/mês em até 48 meses:`;
      } else if (lower.includes('tco') || lower.includes('manutenção') || lower.includes('manutencao') || lower.includes('custo')) {
        recommendedCars = vehicles.slice(0, 2);
        responseText = `Pelo nosso algoritmo de TCO (Custo Total de Posse), que considera IPVA, seguro e manutenção especializada em concessionária oficial, o **${recommendedCars[0]?.nome}** apresenta o melhor equilíbrio custo-benefício. Confira a Calculadora de TCO na ficha de cada veículo para uma simulação completa.`;
      } else if (lower.includes('laudo') || lower.includes('cautelar') || lower.includes('procedência') || lower.includes('procedencia')) {
        responseText = `Todo o acervo Apex possui **Certificação de Procedência & Laudo Cautelar** com perícia de concessionária oficial, sem sinistro ou leilão, e importação ou nacionalização 100% regularizada.`;
      } else {
        recommendedCars = vehicles.slice(0, 2);
        responseText = `Compreendi! Separei estas recomendações do nosso acervo privativo, com procedência certificada e condições exclusivas:`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: responseText,
          cars: recommendedCars
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="flex flex-col h-[560px] rounded-3xl bg-surface-card-alt border border-amber-500/30 shadow-2xl overflow-hidden">
      {/* Header do Chat */}
      <div className="p-4 sm:px-6 bg-surface-page/90 border-b border-ink/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-black shadow-lg shadow-amber-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-sm sm:text-base font-bold text-ink">Apex AI Consultant</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/30">
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Inteligência Artificial conectada ao acervo em tempo real</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([{ id: 1, sender: 'ai', text: 'Chat reiniciado! Como posso ajudar você a escolher seu próximo superesportivo hoje?' }])}
          className="p-2 rounded-xl bg-ink/5 text-slate-400 hover:text-ink text-xs flex items-center gap-1 transition-colors"
          title="Reiniciar conversa"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Área de Mensagens com Scroll */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[85%] space-y-3 ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black rounded-2xl rounded-tr-sm p-3.5 text-xs sm:text-sm shadow-md font-medium'
                : 'bg-surface-page border border-ink/10 text-slate-200 rounded-2xl rounded-tl-sm p-4 text-xs sm:text-sm leading-relaxed shadow-md'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>

              {/* Cards de Veículos Recomendados dentro do Chat */}
              {msg.cars && msg.cars.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {msg.cars.map(c => (
                    <div
                      key={c.id}
                      className="p-3 rounded-xl bg-surface-page/80 border border-amber-500/30 flex flex-col justify-between hover:border-amber-400 transition-all cursor-pointer group"
                      onClick={() => onSelectVehicle && onSelectVehicle(c)}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] text-amber-400 font-semibold uppercase">{c.marca}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{c.ano}</span>
                        </div>
                        <h4 className="font-bold text-ink text-xs group-hover:text-amber-300 transition-colors line-clamp-1">{c.nome}</h4>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">{formatCurrency(c.preco)}</p>
                      </div>
                      <span className="text-[10px] text-amber-400 flex items-center gap-1 mt-2 pt-1 border-t border-ink/10">
                        <span>Ver detalhes & laudo</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-surface-page/60 p-3 rounded-2xl w-fit">
            <Bot className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Apex AI está consultando o acervo...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Dúvidas Rápidas Sugeridas */}
      <div className="p-2 sm:px-6 bg-surface-page/80 border-t border-ink/10 flex gap-1.5 overflow-x-auto">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1 rounded-full bg-surface-page border border-ink/10 text-[11px] text-slate-300 hover:text-amber-300 hover:border-amber-500/40 whitespace-nowrap transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Campo de Envio */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 sm:p-4 bg-surface-page border-t border-ink/10 flex gap-2">
        <input
          type="text"
          placeholder="Pergunte sobre investimento, blindagem, TCO ou modelo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-surface-page/60 border border-ink/10 text-sm text-ink focus:outline-none focus:border-amber-500 placeholder-slate-500"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 text-black font-bold text-sm flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shadow-amber-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
