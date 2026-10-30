export function formatCurrency(value) {
  if (value === undefined || value === null) return 'R$ 0';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
}

export function formatKm(km) {
  if (km === undefined || km === null) return '0 km';
  return `${new Intl.NumberFormat('pt-BR').format(km)} km`;
}

export function formatNumber(num) {
  if (num === undefined || num === null) return '0';
  return new Intl.NumberFormat('pt-BR').format(num);
}

export function calculateFipeDiff(price, fipe) {
  if (!price || !fipe) return null;
  const diff = price - fipe;
  const pct = (diff / fipe) * 100;
  return {
    diff,
    pct,
    isBelow: diff < 0,
    formattedDiff: formatCurrency(Math.abs(diff)),
    label: diff < 0
      ? `${formatCurrency(Math.abs(diff))} abaixo da FIPE`
      : diff === 0
        ? 'Na Tabela FIPE'
        : `${formatCurrency(diff)} acima da FIPE`
  };
}
