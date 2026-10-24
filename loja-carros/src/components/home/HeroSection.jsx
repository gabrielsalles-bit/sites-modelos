import React, { useState } from 'react';
import { Search, ShieldCheck, Sparkles, ChevronRight, ArrowDown } from 'lucide-react';
import { Button } from '../ui/Button';

export function HeroSection({ onSearch, categories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ term: searchTerm, category: selectedCategory });
    }
    const estoqueEl = document.getElementById('estoque');
    if (estoqueEl) {
      estoqueEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background com Efeito Radial e Imagem Automotiva */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
          alt="Showroom Automotivo"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Badge Flutuante de Credibilidade */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg shadow-blue-950/40 animate-fade-in">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Showroom Certificado com Perícia Cautelar Digital</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>

        {/* Título Principal de Alto Impacto */}
        <div className="space-y-4">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Encontre o seu próximo carro com <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">garantia e procedência total</span>.
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Mais de 100 veículos seminovos rigorosamente avaliados, 100% aprovados em laudo cautelar e prontos para rodar.
          </p>
        </div>

        {/* Barra de Busca Rápida Integrada */}
        <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={handleSearchSubmit}
            className="p-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl shadow-black/60 backdrop-blur-xl flex flex-col sm:flex-row gap-2"
          >
            {/* Input de Busca */}
            <div className="flex-1 flex items-center px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
              <input
                type="text"
                placeholder="Qual modelo você procura? (ex: Tracker, Corolla, Polo...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Select de Categoria */}
            <div className="sm:w-48 px-3 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="todos" className="bg-slate-900 text-white">Todas Categorias</option>
                <option value="suv" className="bg-slate-900 text-white">SUVs</option>
                <option value="sedan" className="bg-slate-900 text-white">Sedans</option>
                <option value="hatch" className="bg-slate-900 text-white">Hatches</option>
                <option value="pickup" className="bg-slate-900 text-white">Picapes</option>
                <option value="esportivo" className="bg-slate-900 text-white">Esportivos</option>
              </select>
            </div>

            {/* Botão de Envio */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Search}
              className="sm:w-36 py-3"
            >
              Buscar
            </Button>
          </form>
        </div>

        {/* Badges de Confiança em Linha */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span>Laudo Cautelar 100% Aprovado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span>1 Ano de Garantia Completa</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span>Troca com Troco & Financiamento</span>
          </div>
        </div>

        {/* Indicador de Rolagem */}
        <div className="pt-6">
          <a
            href="#estoque"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>Ver nosso estoque completo</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
