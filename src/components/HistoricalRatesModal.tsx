import React, { useState, useMemo } from 'react';
import { 
  X, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calculator, 
  Download, 
  Copy, 
  Check, 
  Sparkles,
  BarChart3,
  Layers,
  ArrowRight
} from 'lucide-react';
import { HistoricalRateEntry, HistoryTimeframe, ExchangeRate } from '../types';
import { 
  FULL_HISTORICAL_DATA, 
  filterHistoryByTimeframe, 
  calculateRateStats 
} from '../data/historicalData';

interface HistoricalRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRateForCalculator: (rateValue: number, rateName: string, dateLabel: string) => void;
  themeClasses: any;
  isLight: boolean;
  appName: string;
  currentRates: ExchangeRate[];
  showToast: (msg: string) => void;
}

export const HistoricalRatesModal: React.FC<HistoricalRatesModalProps> = ({
  isOpen,
  onClose,
  onSelectRateForCalculator,
  themeClasses,
  isLight,
  appName,
  currentRates,
  showToast
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<'bcv' | 'euro' | 'usdt' | 'all'>('bcv');
  const [timeframe, setTimeframe] = useState<HistoryTimeframe>('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredEntry, setHoveredEntry] = useState<HistoricalRateEntry | null>(null);
  const [copiedData, setCopiedData] = useState(false);

  // Filtered dataset according to timeframe
  const timeframeData = useMemo(() => {
    return filterHistoryByTimeframe(timeframe, FULL_HISTORICAL_DATA);
  }, [timeframe]);

  // Search filtered records
  const displayRecords = useMemo(() => {
    if (!searchQuery.trim()) return timeframeData;
    const q = searchQuery.toLowerCase().trim();
    return timeframeData.filter(item => 
      item.date.toLowerCase().includes(q) ||
      item.dateLabel.toLowerCase().includes(q) ||
      item.dayName.toLowerCase().includes(q) ||
      item.bcv.toString().includes(q) ||
      item.usdt.toString().includes(q)
    );
  }, [timeframeData, searchQuery]);

  // Stats calculation
  const statsKey = selectedCurrency === 'all' ? 'bcv' : selectedCurrency;
  const stats = useMemo(() => {
    return calculateRateStats(timeframeData, statsKey);
  }, [timeframeData, statsKey]);

  // Currency metadata
  const currencyLabels: Record<'bcv' | 'euro' | 'usdt' | 'all', { name: string; symbol: string; color: string }> = {
    bcv: { name: 'Dólar BCV', symbol: '$', color: isLight ? '#d97706' : '#facc15' },
    euro: { name: 'Euro Oficial', symbol: '€', color: isLight ? '#2563eb' : '#60a5fa' },
    usdt: { name: 'USDT Binance', symbol: '₮', color: isLight ? '#059669' : '#34d399' },
    all: { name: 'Comparativa General', symbol: '📊', color: '#a855f7' }
  };

  // SVG Chart rendering calculation
  const chartPoints = useMemo(() => {
    if (timeframeData.length < 2) return null;
    
    // Ordered from oldest to newest for chronological chart (left to right)
    const chronological = [...timeframeData].reverse();
    const width = 500;
    const height = 180;
    const padding = { top: 20, right: 20, bottom: 30, left: 45 };

    const bcvValues = chronological.map(d => d.bcv);
    const usdtValues = chronological.map(d => d.usdt);
    const euroValues = chronological.map(d => d.euro);

    const allValues = selectedCurrency === 'all' 
      ? [...bcvValues, ...usdtValues, ...euroValues]
      : chronological.map(d => d[statsKey]);

    const minVal = Math.min(...allValues) * 0.98;
    const maxVal = Math.max(...allValues) * 1.02;
    const valRange = maxVal - minVal || 1;

    const getX = (index: number) => {
      return padding.left + (index / (chronological.length - 1)) * (width - padding.left - padding.right);
    };

    const getY = (val: number) => {
      return height - padding.bottom - ((val - minVal) / valRange) * (height - padding.top - padding.bottom);
    };

    const buildPath = (key: 'bcv' | 'euro' | 'usdt') => {
      return chronological.map((d, i) => {
        const x = getX(i);
        const y = getY(d[key]);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      }).join(' ');
    };

    const buildAreaPath = (key: 'bcv' | 'euro' | 'usdt') => {
      const line = buildPath(key);
      const firstX = getX(0);
      const lastX = getX(chronological.length - 1);
      const bottomY = height - padding.bottom;
      return `${line} L ${lastX.toFixed(1)} ${bottomY} L ${firstX.toFixed(1)} ${bottomY} Z`;
    };

    return {
      width,
      height,
      padding,
      chronological,
      minVal,
      maxVal,
      getX,
      getY,
      bcvPath: buildPath('bcv'),
      bcvArea: buildAreaPath('bcv'),
      usdtPath: buildPath('usdt'),
      usdtArea: buildAreaPath('usdt'),
      euroPath: buildPath('euro'),
      euroArea: buildAreaPath('euro'),
      activePath: selectedCurrency !== 'all' ? buildPath(statsKey) : null,
      activeArea: selectedCurrency !== 'all' ? buildAreaPath(statsKey) : null,
    };
  }, [timeframeData, selectedCurrency, statsKey]);

  if (!isOpen) return null;

  // Handle export data as CSV
  const handleExportCSV = () => {
    const headers = 'Fecha,Dia,Dolar_BCV,Euro_Oficial,USDT_Binance,Brecha_Porcentaje\n';
    const rows = FULL_HISTORICAL_DATA.map(d => 
      `"${d.date}","${d.dayName}",${d.bcv},${d.euro},${d.usdt},"${d.brechaPercent}%"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `historial_tasas_${appName.replace(/\s+/g, '_')}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Historial exportado en formato CSV ✓');
  };

  // Handle Copy summary
  const handleCopySummary = () => {
    const summaryText = `📊 *Historial de Tasas - ${appName}*\n` +
      `Período: ${timeframe.toUpperCase()} (${timeframeData[timeframeData.length - 1]?.dateLabel} - ${timeframeData[0]?.dateLabel})\n\n` +
      `• Dólar BCV Actual: ${timeframeData[0]?.bcv.toFixed(2)} Bs.\n` +
      `• USDT Binance Actual: ${timeframeData[0]?.usdt.toFixed(2)} Bs.\n` +
      `• Euro Oficial Actual: ${timeframeData[0]?.euro.toFixed(2)} Bs.\n` +
      `• Tasa Máxima Período: ${stats.high.toFixed(2)} Bs.\n` +
      `• Tasa Mínima Período: ${stats.low.toFixed(2)} Bs.\n` +
      `• Variación Período: +${stats.changeBs.toFixed(2)} Bs. (+${stats.changePercent}%)\n` +
      `• Brecha Cambiaria Promedio: ${stats.avgBrecha}%\n\n` +
      `Consulta en vivo en: ${window.location.origin}`;
    
    navigator.clipboard.writeText(summaryText);
    setCopiedData(true);
    showToast('Resumen del historial copiado al portapapeles');
    setTimeout(() => setCopiedData(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-xs pointer-events-auto transition-opacity" 
        onClick={onClose} 
      />

      <div className={`relative ${themeClasses.modalBg} max-w-xl w-full rounded-[2rem] p-5 sm:p-6 border ${themeClasses.borderColor} shadow-2xl space-y-4.5 z-10 ${themeClasses.textPrimary} max-h-[92vh] overflow-y-auto flex flex-col`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between pb-3 border-b ${themeClasses.borderColor}`}>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-xl ${themeClasses.accentBg} ${themeClasses.accentText} border ${themeClasses.accentBorder}`}>
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`font-display font-black text-xl ${themeClasses.textPrimary} leading-tight`}>
                  Historial de Cotizaciones
                </h2>
                <p className={`text-[11px] ${themeClasses.textSecondary} font-medium`}>
                  Registro histórico real diario y mensual en Venezuela
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className={`p-2 rounded-xl ${themeClasses.iconBtnBg} border transition-all active:scale-95`}
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Currency Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-2xl bg-zinc-950/40 border border-zinc-800/80">
          {(['bcv', 'usdt', 'euro', 'all'] as const).map((currKey) => {
            const isSelected = selectedCurrency === currKey;
            return (
              <button
                key={currKey}
                onClick={() => setSelectedCurrency(currKey)}
                className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  isSelected 
                    ? 'bg-yellow-400 text-neutral-950 shadow-md font-black scale-102' 
                    : `${themeClasses.textSecondary} hover:text-zinc-100 hover:bg-zinc-900/50`
                }`}
              >
                <span>{currencyLabels[currKey].symbol}</span>
                <span className="truncate">{currencyLabels[currKey].name}</span>
              </button>
            );
          })}
        </div>

        {/* Timeframe Filter Chips */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-0.5">
          <span className={`text-[10px] font-extrabold ${themeClasses.textMuted} uppercase tracking-wider pl-1 hidden sm:inline`}>
            Rango:
          </span>
          <div className="flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-start">
            {(['7d', '30d', '90d', '6m', '1y', 'all'] as const).map((tf) => {
              const isTfActive = timeframe === tf;
              const tfLabels: Record<HistoryTimeframe, string> = {
                '7d': '7 Días',
                '30d': '30 Días',
                '90d': '3 Meses',
                '6m': '6 Meses',
                '1y': '1 Año',
                'all': 'Todo'
              };
              return (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                    isTfActive
                      ? `${themeClasses.accentBg} ${themeClasses.accentBorder} ${themeClasses.accentText} shadow-xs`
                      : `${themeClasses.inputBg} ${themeClasses.borderColor} ${themeClasses.textSecondary} hover:text-zinc-200`
                  }`}
                >
                  {tfLabels[tf]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Statistical Summary Metric Cards (4 Bento Badges) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Max Rate */}
          <div className={`${themeClasses.subCardBg} p-2.5 rounded-xl border space-y-0.5`}>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${themeClasses.textMuted} block`}>
              Tasa Máxima
            </span>
            <div className="flex items-center justify-between">
              <span className={`font-mono font-black text-sm ${themeClasses.textPrimary}`}>
                {stats.high.toFixed(2)} Bs
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
            </div>
          </div>

          {/* Min Rate */}
          <div className={`${themeClasses.subCardBg} p-2.5 rounded-xl border space-y-0.5`}>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${themeClasses.textMuted} block`}>
              Tasa Mínima
            </span>
            <div className="flex items-center justify-between">
              <span className={`font-mono font-black text-sm ${themeClasses.textSecondary}`}>
                {stats.low.toFixed(2)} Bs
              </span>
              <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />
            </div>
          </div>

          {/* Average */}
          <div className={`${themeClasses.subCardBg} p-2.5 rounded-xl border space-y-0.5`}>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${themeClasses.textMuted} block`}>
              Promedio
            </span>
            <span className={`font-mono font-black text-sm ${themeClasses.accentText} block`}>
              {stats.avg.toFixed(2)} Bs
            </span>
          </div>

          {/* Variation in period */}
          <div className={`${themeClasses.subCardBg} p-2.5 rounded-xl border space-y-0.5`}>
            <span className={`text-[9px] font-bold uppercase tracking-wider ${themeClasses.textMuted} block`}>
              Variación
            </span>
            <div className="flex items-center gap-1 font-mono text-xs font-black text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{stats.changePercent}%</span>
            </div>
          </div>
        </div>

        {/* Interactive Dynamic SVG Trend Chart */}
        {chartPoints && (
          <div className={`${themeClasses.subCardBg} p-3.5 rounded-2xl border space-y-2 relative overflow-hidden`}>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${themeClasses.textPrimary}`}>
                  Curva de Tendencia ({currencyLabels[selectedCurrency].name})
                </span>
                {hoveredEntry && (
                  <span className="font-mono text-[10px] bg-yellow-400 text-neutral-950 font-bold px-2 py-0.5 rounded-md animate-fade-in">
                    {hoveredEntry.dateLabel}: {selectedCurrency === 'usdt' ? hoveredEntry.usdt : selectedCurrency === 'euro' ? hoveredEntry.euro : hoveredEntry.bcv} Bs
                  </span>
                )}
              </div>

              {selectedCurrency === 'all' && (
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> BCV
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> USDT
                  </span>
                  <span className="flex items-center gap-1 text-blue-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Euro
                  </span>
                </div>
              )}
            </div>

            {/* SVG Canvas */}
            <div className="w-full aspect-[21/8] sm:aspect-[21/7] relative">
              <svg 
                viewBox={`0 0 ${chartPoints.width} ${chartPoints.height}`}
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient id="bcvGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#facc15" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#facc15" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="usdtGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="euroGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Subtle horizontal grid guide lines */}
                <line 
                  x1={chartPoints.padding.left} 
                  y1={chartPoints.getY(chartPoints.maxVal)} 
                  x2={chartPoints.width - chartPoints.padding.right} 
                  y2={chartPoints.getY(chartPoints.maxVal)} 
                  stroke={isLight ? '#e4e4e7' : '#27272a'} 
                  strokeDasharray="3 3" 
                />
                <line 
                  x1={chartPoints.padding.left} 
                  y1={chartPoints.getY((chartPoints.maxVal + chartPoints.minVal) / 2)} 
                  x2={chartPoints.width - chartPoints.padding.right} 
                  y2={chartPoints.getY((chartPoints.maxVal + chartPoints.minVal) / 2)} 
                  stroke={isLight ? '#e4e4e7' : '#27272a'} 
                  strokeDasharray="3 3" 
                />
                <line 
                  x1={chartPoints.padding.left} 
                  y1={chartPoints.height - chartPoints.padding.bottom} 
                  x2={chartPoints.width - chartPoints.padding.right} 
                  y2={chartPoints.height - chartPoints.padding.bottom} 
                  stroke={isLight ? '#d4d4d8' : '#3f3f46'} 
                />

                {/* Y Axis numeric labels */}
                <text x="5" y={chartPoints.padding.top + 5} fontSize="9" fill={isLight ? '#71717a' : '#a1a1aa'} fontFamily="monospace" fontWeight="bold">
                  {chartPoints.maxVal.toFixed(0)}
                </text>
                <text x="5" y={chartPoints.height - chartPoints.padding.bottom} fontSize="9" fill={isLight ? '#71717a' : '#a1a1aa'} fontFamily="monospace" fontWeight="bold">
                  {chartPoints.minVal.toFixed(0)}
                </text>

                {/* Paths according to selection */}
                {selectedCurrency === 'all' ? (
                  <>
                    <path d={chartPoints.bcvArea} fill="url(#bcvGrad)" />
                    <path d={chartPoints.bcvPath} fill="none" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
                    <path d={chartPoints.usdtPath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                    <path d={chartPoints.euroPath} fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 3" />
                  </>
                ) : (
                  <>
                    {chartPoints.activeArea && (
                      <path 
                        d={chartPoints.activeArea} 
                        fill={selectedCurrency === 'usdt' ? 'url(#usdtGrad)' : selectedCurrency === 'euro' ? 'url(#euroGrad)' : 'url(#bcvGrad)'} 
                      />
                    )}
                    {chartPoints.activePath && (
                      <path 
                        d={chartPoints.activePath} 
                        fill="none" 
                        stroke={currencyLabels[selectedCurrency].color} 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    )}
                  </>
                )}

                {/* Interactive Points on curve */}
                {chartPoints.chronological.map((item, idx) => {
                  const x = chartPoints.getX(idx);
                  const val = item[statsKey];
                  const y = chartPoints.getY(val);
                  return (
                    <circle
                      key={item.date}
                      cx={x}
                      cy={y}
                      r="4"
                      className="cursor-pointer transition-all hover:r-6 fill-zinc-950 stroke-yellow-400 stroke-2"
                      onMouseEnter={() => setHoveredEntry(item)}
                      onMouseLeave={() => setHoveredEntry(null)}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Bottom date endpoints */}
            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-zinc-500 pt-1">
              <span>{chartPoints.chronological[0]?.dateLabel}</span>
              <span>{chartPoints.chronological[chartPoints.chronological.length - 1]?.dateLabel}</span>
            </div>
          </div>
        )}

        {/* Search & Records Table Bar */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className={`relative flex items-center flex-1 ${themeClasses.inputBg} rounded-xl border ${themeClasses.borderColor} px-3 py-1.5`}>
            <Search className={`w-3.5 h-3.5 ${themeClasses.textMuted} mr-2`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por fecha (ej: 14 Feb, Enero, 2025)..."
              className={`bg-transparent text-xs font-semibold ${themeClasses.textPrimary} outline-none w-full border-none p-0 focus:ring-0`}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-zinc-400 hover:text-zinc-200">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopySummary}
              className={`p-2 rounded-xl border ${themeClasses.iconBtnBg} transition-all`}
              title="Copiar Resumen"
            >
              {copiedData ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleExportCSV}
              className={`p-2 rounded-xl border ${themeClasses.iconBtnBg} transition-all`}
              title="Descargar CSV"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Daily & Monthly Historical Records Table */}
        <div className="flex-1 overflow-y-auto space-y-2 max-h-[300px] pr-1">
          {displayRecords.length === 0 ? (
            <div className={`text-center p-8 ${themeClasses.subCardBg} rounded-2xl border space-y-1`}>
              <Calendar className="w-6 h-6 mx-auto text-zinc-500 mb-1" />
              <p className="text-xs font-bold text-zinc-300">No se encontraron registros</p>
              <p className="text-[10px] text-zinc-500">Prueba con otra fecha o cambia el rango de tiempo seleccionado.</p>
            </div>
          ) : (
            displayRecords.map((record) => {
              const activeVal = selectedCurrency === 'usdt' ? record.usdt : selectedCurrency === 'euro' ? record.euro : record.bcv;
              const activeName = selectedCurrency === 'usdt' ? 'USDT Binance' : selectedCurrency === 'euro' ? 'Euro Oficial' : 'Dólar BCV';
              
              return (
                <div
                  key={record.date}
                  className={`${themeClasses.subCardBg} p-3 rounded-2xl border transition-all flex items-center justify-between hover:scale-[1.01] hover:border-yellow-400/50 group select-none`}
                >
                  {/* Left Date Info */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`font-extrabold text-xs ${themeClasses.textPrimary}`}>
                        {record.dateLabel}
                      </span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded font-mono ${isLight ? 'bg-zinc-200 text-zinc-700' : 'bg-zinc-800 text-zinc-300'}`}>
                        {record.dayName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="text-zinc-400">BCV: <strong className="text-zinc-200">{record.bcv.toFixed(2)}</strong></span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-zinc-400">USDT: <strong className="text-emerald-400">{record.usdt.toFixed(2)}</strong></span>
                      {record.brechaPercent !== undefined && record.brechaPercent > 0 && (
                        <>
                          <span className="text-zinc-500">•</span>
                          <span className="text-amber-400/90 font-bold">Brecha: {record.brechaPercent}%</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Actions & Rate display */}
                  <div className="flex items-center gap-3">
                    <div className="text-right font-mono">
                      <span className={`font-black text-sm sm:text-base ${themeClasses.accentText} block`}>
                        {activeVal.toLocaleString('es-VE', { minimumFractionDigits: 2 })} Bs
                      </span>
                      {record.bcvChange !== undefined && record.bcvChange !== 0 && (
                        <span className={`text-[10px] font-bold ${record.bcvChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {record.bcvChange > 0 ? '+' : ''}{record.bcvChange.toFixed(2)} ({record.bcvChangePercent}%)
                        </span>
                      )}
                    </div>

                    {/* Button to load this exact historical rate into calculator */}
                    <button
                      onClick={() => {
                        onSelectRateForCalculator(activeVal, `${activeName} (${record.dateLabel})`, record.date);
                        onClose();
                        showToast(`Cargada tasa de ${record.dateLabel} (${activeVal.toFixed(2)} Bs.) en la calculadora ✓`);
                      }}
                      className="p-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-neutral-950 font-black text-xs transition-all active:scale-95 flex items-center gap-1 shadow-sm"
                      title="Cargar esta tasa histórica en la calculadora"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Usar</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/60">
          <button
            onClick={handleCopySummary}
            className={`font-bold text-xs py-2.5 rounded-xl transition-all border ${themeClasses.iconBtnBg} flex items-center justify-center gap-1.5`}
          >
            {copiedData ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>Copiar Resumen</span>
          </button>

          <button
            onClick={onClose}
            className="bg-yellow-400 hover:bg-yellow-500 text-neutral-950 font-black text-xs py-2.5 rounded-xl transition-all text-center shadow-md active:scale-95"
          >
            Cerrar Historial
          </button>
        </div>

      </div>
    </div>
  );
};
