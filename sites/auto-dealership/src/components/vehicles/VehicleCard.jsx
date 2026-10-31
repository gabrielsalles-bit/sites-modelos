import React, { useState } from 'react';
import { Calendar, Gauge, Fuel, Cog, MessageCircle, Eye, Heart, Scale } from 'lucide-react';
import { InspectionBadge } from './InspectionBadge';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCurrency, formatKm } from '../../utils/formatters';
import { withBase } from '../../utils/assetPath.js';
import { buildVehicleWhatsappLink } from '../../utils/whatsapp';

export function VehicleCard({
  vehicle,
  onSelect,
  isFavorite,
  onToggleFavorite,
  isComparing,
  onToggleCompare
}) {
  const [imgSrc, setImgSrc] = useState(vehicle.imagemPrincipal);

  const whatsappUrl = buildVehicleWhatsappLink(vehicle);

  return (
    <div className="group rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 hover:shadow-md flex flex-col overflow-hidden">
      {/* Container de Imagem */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={imgSrc}
          alt={`${vehicle.nome} ${vehicle.versao}`}
          onError={() => setImgSrc(withBase('images/placeholder-carro.jpg'))}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Gradiente de sobreposição sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

        {/* Badges Superiores: Perícia à esquerda, ações rápidas à direita */}
        <div className="absolute top-3 inset-x-3 z-10 flex items-start justify-between">
          <div className="flex flex-col items-start gap-1.5">
            <InspectionBadge text="Perícia Cautelar" compact={true} />
            <Badge variant="default" size="xs" className="uppercase">
              {vehicle.categoria}
            </Badge>
          </div>

          {(onToggleCompare || onToggleFavorite) && (
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              {onToggleCompare && (
                <button
                  onClick={() => onToggleCompare(vehicle.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                    isComparing
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'bg-black/60 text-slate-300 hover:text-white border border-white/10'
                  }`}
                  title={isComparing ? 'Remover da comparação' : 'Comparar este veículo'}
                >
                  <Scale className="w-4 h-4" />
                </button>
              )}

              {onToggleFavorite && (
                <button
                  onClick={() => onToggleFavorite(vehicle.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                    isFavorite
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-black/60 text-slate-300 hover:text-rose-400 border border-white/10'
                  }`}
                  title={isFavorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Ano e Km na base da imagem */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
          <span className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-medium">
            {vehicle.ano}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-medium">
            {formatKm(vehicle.km)}
          </span>
        </div>
      </div>

      {/* Corpo do Card */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Título & Versão */}
          <div className="mb-3">
            <h3 className="font-heading font-bold text-lg text-ink group-hover:text-blue-400 transition-colors line-clamp-1">
              {vehicle.nome}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-1">
              {vehicle.versao}
            </p>
          </div>

          {/* Grid de Specs Rápidas */}
          <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 truncate">
              <Cog className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">{vehicle.cambio}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Fuel className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">{vehicle.combustivel}</span>
            </div>
          </div>
        </div>

        {/* Bloco de Preços & Ações */}
        <div className="pt-3 border-t border-slate-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">
                Valor à Vista
              </span>
              <span className="font-heading text-xl font-extrabold text-ink">
                {formatCurrency(vehicle.preco)}
              </span>
            </div>

            {vehicle.parcela && (
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">
                  Ou entrada +
                </span>
                <span className="text-xs font-semibold text-blue-400">
                  {vehicle.parcela.vezes}x de {formatCurrency(vehicle.parcela.valor)}
                </span>
              </div>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Eye}
              onClick={() => onSelect(vehicle)}
              className="w-full"
            >
              Ficha & Laudo
            </Button>
            <Button
              variant="whatsapp"
              size="sm"
              icon={MessageCircle}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
