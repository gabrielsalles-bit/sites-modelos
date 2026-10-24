import React, { useState, useMemo, useEffect } from 'react';
import { Calculator, MessageCircle, Percent, DollarSign, Calendar, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/formatters';
import { buildFinancingWhatsappLink } from '../../utils/whatsapp';

export function FinancingSimulator({ vehicles = [], selectedVehicleFromModal }) {
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || 1);
  const [entradaPercent, setEntradaPercent] = useState(30); // 30% padrão
  const [prazo, setPrazo] = useState(48); // 48x padrão

  useEffect(() => {
    if (selectedVehicleFromModal) {
      setSelectedVehicleId(selectedVehicleFromModal.id);
    }
  }, [selectedVehicleFromModal]);

  const currentVehicle = useMemo(() => {
    return vehicles.find(v => v.id === Number(selectedVehicleId)) || vehicles[0];
  }, [vehicles, selectedVehicleId]);

  const valorTotal = currentVehicle?.preco || 100000;
  const valorEntrada = useMemo(() => {
    return Math.round((valorTotal * entradaPercent) / 100);
  }, [valorTotal, entradaPercent]);

  const valorFinanciado = valorTotal - valorEntrada;

  // Cálculo da parcela (Tabela Price simplificada com juros médios de 1.69% a.m.)
  const parcelaEstimada = useMemo(() => {
    const taxa = 0.0169;
    if (valorFinanciado <= 0) return 0;
    const coef = (taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
    return Math.round(valorFinanciado * coef);
  }, [valorFinanciado, prazo]);

  const whatsappUrl = buildFinancingWhatsappLink(currentVehicle, valorEntrada, prazo, parcelaEstimada);

  return (
    <section id="simulador" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/30 border border-slate-700/80 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador de Financiamento Online</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            Planeje as parcelas do seu novo carro
          </h2>
          <p className="text-slate-400 text-sm">
            Simule em tempo real com as melhores taxas dos principais bancos parceiros (Santander, BV, Itaú, Bradesco).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Controles de Simulação */}
          <div className="lg:col-span-7 space-y-6 bg-slate-950/60 p-6 sm:p-8 rounded-2xl border border-slate-800">
            {/* Escolha do Veículo */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                Selecione o Veículo
              </label>
              <select
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.nome} {v.versao} ({v.ano}) — {formatCurrency(v.preco)}
                  </option>
                ))}
              </select>
            </div>

            {/* Slider de Entrada */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Valor da Entrada ({entradaPercent}%)
                </label>
                <span className="text-sm font-bold text-emerald-400">
                  {formatCurrency(valorEntrada)}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={entradaPercent}
                onChange={(e) => setEntradaPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Mín. 10% ({formatCurrency(valorTotal * 0.1)})</span>
                <span>Máx. 80% ({formatCurrency(valorTotal * 0.8)})</span>
              </div>
            </div>

            {/* Prazo de Financiamento */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                Prazo em Meses
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[24, 36, 48, 60].map((meses) => (
                  <button
                    key={meses}
                    type="button"
                    onClick={() => setPrazo(meses)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                      prazo === meses
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {meses}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resultado & CTA */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-950/40 to-slate-900 p-6 sm:p-8 rounded-2xl border border-blue-500/30 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold block">
                Resultado Estimado
              </span>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 block">Parcela Estimada Mensal</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-3xl sm:text-4xl font-black text-white">
                    {formatCurrency(parcelaEstimada)}
                  </span>
                  <span className="text-xs text-slate-400">/mês</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Em {prazo}x parcelas com entrada de {formatCurrency(valorEntrada)}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Valor do Carro</span>
                  <span className="font-medium text-white">{formatCurrency(valorTotal)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Saldo a Financiar</span>
                  <span className="font-medium text-white">{formatCurrency(valorFinanciado)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Bancos Homologados</span>
                  <span className="font-medium text-emerald-400">Até 60 dias p/ 1ª parcela</span>
                </div>
              </div>
            </div>

            <Button
              variant="whatsapp"
              size="lg"
              icon={MessageCircle}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 text-sm font-bold"
            >
              Simular CPF no WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
