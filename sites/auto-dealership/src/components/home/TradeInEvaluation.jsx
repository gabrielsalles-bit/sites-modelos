import React, { useState } from 'react';
import { ArrowLeftRight, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { buildTradeInWhatsappLink } from '../../utils/whatsapp';

export function TradeInEvaluation() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = buildTradeInWhatsappLink(formData);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl relative overflow-hidden">
      <div className="max-w-3xl mx-auto space-y-6 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Troca Fácil</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-ink">
            Dê seu carro atual como parte do pagamento
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Conte pra gente sobre seu veículo e receba uma pré-avaliação pelo WhatsApp, sem compromisso.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div>
            <label className="text-xs text-slate-300 block mb-1">Seu Nome *</label>
            <input
              type="text"
              name="nome"
              required
              placeholder="Nome completo"
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-ink focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Telefone / WhatsApp *</label>
            <input
              type="text"
              name="telefone"
              required
              placeholder="(61) 99999-9999"
              value={formData.telefone}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-ink focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Marca do Veículo *</label>
            <input
              type="text"
              name="marca"
              required
              placeholder="Ex: Chevrolet, Toyota..."
              value={formData.marca}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-ink focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Modelo & Versão *</label>
            <input
              type="text"
              name="modelo"
              required
              placeholder="Ex: Tracker Premier, Corolla XRE..."
              value={formData.modelo}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-ink focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Ano de Fabricação</label>
            <input
              type="text"
              name="ano"
              placeholder="Ex: 2021/2022"
              value={formData.ano}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-ink focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Quilometragem Aproximada</label>
            <input
              type="text"
              name="km"
              placeholder="Ex: 45.000 km"
              value={formData.km}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-ink focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs text-slate-300 block mb-1">Carro de Interesse no Estoque</label>
            <input
              type="text"
              name="carroInteresse"
              placeholder="Ex: Chevrolet Tracker, Honda Civic..."
              value={formData.carroInteresse}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-ink focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={Send}
              className="w-full py-3.5"
            >
              Solicitar Avaliação no WhatsApp
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
