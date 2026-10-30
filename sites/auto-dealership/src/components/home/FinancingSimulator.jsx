import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/formatters';
import { buildFinancingWhatsappLink } from '../../utils/whatsapp';

export function FinancingSimulator({ vehicles = [], preselectedVehicle = null }) {
  const defaultPrice = preselectedVehicle ? preselectedVehicle.preco : (vehicles[0]?.preco || 100000);
  const defaultVehicle = preselectedVehicle || vehicles[0] || null;

  const [selectedVehicle, setSelectedVehicle] = useState(defaultVehicle);
  const [vehicleValue, setVehicleValue] = useState(defaultPrice);
  const [downPayment, setDownPayment] = useState(Math.round(defaultPrice * 0.2));
  const [term, setTerm] = useState(48);

  const handleVehicleSelect = (e) => {
    const vId = Number(e.target.value);
    const found = vehicles.find((v) => v.id === vId);
    if (found) {
      setSelectedVehicle(found);
      setVehicleValue(found.preco);
      setDownPayment(Math.round(found.preco * 0.2));
    }
  };

  const financedAmount = Math.max(vehicleValue - downPayment, 0);
  const monthlyRate = 0.0169; // 1,69% ao mês, taxa padrão de referência
  const monthlyPayment = financedAmount > 0
    ? Math.round((financedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term)))
    : 0;

  const whatsappUrl = buildFinancingWhatsappLink(selectedVehicle, downPayment, term, monthlyPayment);

  return (
    <section className="relative p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Painel Esquerdo: Controles */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Simulação Rápida</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-ink">
              Simulador de Financiamento
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Monte uma simulação com as condições que cabem no seu bolso e já envie pra gente negociar.
            </p>
          </div>

          {vehicles.length > 0 && (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5 uppercase tracking-wider">
                Selecione o Veículo
              </label>
              <select
                value={selectedVehicle?.id || ''}
                onChange={handleVehicleSelect}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-ink focus:outline-none focus:border-blue-500 transition-colors"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id} className="bg-slate-900 text-ink">
                    {v.nome} - {formatCurrency(v.preco)} ({v.ano})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-2 font-medium">
                <span className="text-slate-400">Valor do Veículo:</span>
                <span className="font-bold text-blue-400 font-mono">{formatCurrency(vehicleValue)}</span>
              </div>
              <input
                type="range"
                min="40000"
                max="300000"
                step="5000"
                value={vehicleValue}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setVehicleValue(val);
                  if (downPayment > val) setDownPayment(Math.round(val * 0.2));
                }}
                className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs sm:text-sm mb-2 font-medium">
                <span className="text-slate-400">Entrada (Mín. 20%):</span>
                <span className="font-bold text-ink font-mono">{formatCurrency(downPayment)}</span>
              </div>
              <input
                type="range"
                min={Math.round(vehicleValue * 0.2)}
                max={Math.round(vehicleValue * 0.8)}
                step="1000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2 uppercase tracking-wider">
              Prazo de Financiamento
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48].map((meses) => (
                <button
                  key={meses}
                  onClick={() => setTerm(meses)}
                  className={`py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    term === meses
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/20'
                      : 'bg-slate-950/50 text-slate-300 border-slate-800 hover:border-blue-500/40'
                  }`}
                >
                  {meses}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Painel Direito: Resumo */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between space-y-6 shadow-lg">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block">
              Parcela Estimada ({term}x)
            </span>
            <div className="font-heading text-3xl sm:text-4xl font-black text-ink">
              {formatCurrency(monthlyPayment)}
              <span className="text-xs sm:text-sm text-slate-400 font-normal"> /mês</span>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Saldo a Financiar:</span>
                <span className="font-mono text-ink">{formatCurrency(financedAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Taxa Estimada:</span>
                <span className="text-blue-400 font-semibold">1,69% a.m.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pré-Aprovação:</span>
                <span className="text-emerald-400 font-semibold">Em até 15 min</span>
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 text-center justify-center"
          >
            Solicitar Pré-Aprovação
          </Button>
        </div>
      </div>
    </section>
  );
}
