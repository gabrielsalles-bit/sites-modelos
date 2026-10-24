import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, MessageCircle, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { buildTradeInWhatsappLink } from '../../utils/whatsapp';

export function TradeInEvaluation({ vehicles = [] }) {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    marca: '',
    modelo: '',
    ano: '',
    km: '',
    carroInteresse: '',
    observacoes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = buildTradeInWhatsappLink(formData);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="troca" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Lado Esquerdo: Chamada & Vantagens */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Troca com a Melhor Avaliação de Brasília</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Quer dar o seu carro como entrada no novo?
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed">
            Avaliamos seu veículo usado com base no mercado real, pagando um valor justo para você sair de carro novo hoje mesmo.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Avaliação Rápida e Transparente</p>
                <p className="text-xs text-slate-400">Inspeção física ou pré-avaliação online em até 30 minutos.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Troca com Troco</p>
                <p className="text-xs text-slate-400">Pegue um carro de menor valor e saia com dinheiro na conta.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white">Quitamos seu Financiamento</p>
                <p className="text-xs text-slate-400">Seu carro tem parcelas a vencer? Cuidamos de toda a quitação bancária.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Formulário */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-700/80 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-md">
          <h3 className="font-heading font-bold text-xl text-white mb-2">
            Preencha os dados do seu veículo
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Nossa equipe comercial receberá sua solicitação imediatamente no WhatsApp.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Seu Nome *</label>
                <input
                  type="text"
                  name="nome"
                  required
                  placeholder="Ex: Carlos Eduardo"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">WhatsApp de Contato *</label>
                <input
                  type="tel"
                  name="telefone"
                  required
                  placeholder="Ex: (61) 99999-9999"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Marca do seu Carro *</label>
                <input
                  type="text"
                  name="marca"
                  required
                  placeholder="Ex: Chevrolet, Toyota, Volkswagen"
                  value={formData.marca}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Modelo e Versão *</label>
                <input
                  type="text"
                  name="modelo"
                  required
                  placeholder="Ex: Onix 1.0 Turbo LTZ"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Ano *</label>
                <input
                  type="text"
                  name="ano"
                  required
                  placeholder="Ex: 2021/2022"
                  value={formData.ano}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Km Aproximado</label>
                <input
                  type="text"
                  name="km"
                  placeholder="Ex: 45.000"
                  value={formData.km}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Carro Desejado</label>
                <select
                  name="carroInteresse"
                  value={formData.carroInteresse}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Ainda decidindo</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={`${v.nome} ${v.versao}`}>
                      {v.nome} ({v.ano})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1">Observações ou Opcionais</label>
              <textarea
                name="observacoes"
                rows="2"
                placeholder="Ex: Único dono, todas revisões na concessionária, bancos de couro..."
                value={formData.observacoes}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500 resize-none"
              ></textarea>
            </div>

            <Button
              type="submit"
              variant="whatsapp"
              size="lg"
              icon={MessageCircle}
              className="w-full py-3.5 font-bold text-sm"
            >
              Enviar Veículo para Avaliação no WhatsApp
            </Button>

            {submitted && (
              <p className="text-xs text-emerald-400 text-center font-medium animate-fade-in">
                ✓ Mensagem montada com sucesso! Redirecionando para o WhatsApp...
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
