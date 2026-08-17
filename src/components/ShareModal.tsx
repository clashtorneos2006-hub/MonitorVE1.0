import React, { useState, useMemo } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Globe, 
  QrCode, 
  Edit3, 
  Sparkles,
  Send,
  MessageCircle,
  Smartphone,
  Download
} from 'lucide-react';
import { ExchangeRate } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
  rates: ExchangeRate[];
  activeRateWithFee: number;
  usdVal: string;
  bsVal: string;
  selectedDate: string;
  themeClasses: any;
  isLight: boolean;
  showToast: (msg: string) => void;
  customDomain?: string;
  isStandaloneApp?: boolean;
  canInstall?: boolean;
  onInstallApp?: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  appName,
  rates,
  activeRateWithFee,
  usdVal,
  bsVal,
  selectedDate,
  themeClasses,
  isLight,
  showToast,
  customDomain = '',
  isStandaloneApp = false,
  canInstall = false,
  onInstallApp
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  // Compute final effective URL
  const effectiveUrl = useMemo(() => {
    if (customDomain && customDomain.trim()) {
      let clean = customDomain.trim();
      if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
        clean = `https://${clean}`;
      }
      return clean;
    }
    // Fallback to runtime URL
    if (typeof window !== 'undefined' && window.location) {
      return window.location.origin || window.location.href;
    }
    return 'https://monitor-ve.app';
  }, [customDomain]);

  // Current rate references
  const bcvRate = rates.find(r => r.id === 'bcv')?.rate || 563.29;
  const usdtRate = rates.find(r => r.id === 'usdt')?.rate || 735.37;
  const euroRate = rates.find(r => r.id === 'euro')?.rate || 654.87;

  // Preformatted share texts
  const shortShareText = `Consulta la tasa del Dólar BCV y USDT en vivo con ${appName}: ${effectiveUrl}`;

  const fullReportShareText = `🇻🇪 *${appName} - Tasas de Cambio Hoy*\n\n` +
    `• 💵 *Dólar BCV:* ${bcvRate.toFixed(2)} Bs.\n` +
    `• 💶 *Euro Oficial:* ${euroRate.toFixed(2)} Bs.\n` +
    `• 🪙 *USDT Binance:* ${usdtRate.toFixed(2)} Bs.\n\n` +
    `⚡ Calcula tus conversiones al instante aquí:\n👉 ${effectiveUrl}`;

  const calcReceiptText = `🧾 *${appName} - Conversión al Cambio*\n` +
    `Monto: $${usdVal || '1,00'} USD ➔ Bs. ${bsVal || bcvRate.toFixed(2)}\n` +
    `Tasa: ${activeRateWithFee.toFixed(2)} Bs/$\n\n` +
    `🔗 Enlace: ${effectiveUrl}`;

  if (!isOpen) return null;

  // Copy link action
  const handleCopyLink = () => {
    navigator.clipboard.writeText(effectiveUrl);
    setCopiedLink(true);
    showToast('¡Enlace copiado al portapapeles!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Copy full summary action
  const handleCopyFullReport = () => {
    navigator.clipboard.writeText(fullReportShareText);
    setCopiedSummary(true);
    showToast('¡Reporte completo copiado al portapapeles!');
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Native share handler
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${appName} - Monitor de Tasas`,
          text: `Consulta el dólar BCV y USDT en Venezuela en vivo con ${appName}`,
          url: effectiveUrl
        });
        showToast('¡Compartido con éxito!');
      } catch (_) {}
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-xs pointer-events-auto transition-opacity" 
        onClick={onClose} 
      />

      <div className={`relative ${themeClasses.modalBg} max-w-md w-full rounded-[2rem] p-5 sm:p-6 border ${themeClasses.borderColor} shadow-2xl space-y-4.5 z-10 ${themeClasses.textPrimary} max-h-[92vh] overflow-y-auto`}>
        
        {/* Modal Header */}
        <div className={`flex items-center justify-between pb-3 border-b ${themeClasses.borderColor}`}>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${themeClasses.accentBg} ${themeClasses.accentText} border ${themeClasses.accentBorder}`}>
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-display font-black text-xl ${themeClasses.textPrimary} leading-tight`}>
                Compartir Aplicación
              </h3>
              <p className={`text-[11px] ${themeClasses.textSecondary} font-medium`}>
                Enlace directo y cotizaciones para tus clientes
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className={`p-2 rounded-xl ${themeClasses.iconBtnBg} border transition-all active:scale-95`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* WEB LINK & COPY BANNER */}
        <div className={`${themeClasses.subCardBg} rounded-2xl p-3.5 border space-y-2 shadow-xs`}>
          <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-yellow-400" />
              <span>Enlace de la Aplicación</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">Web App</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden flex-1">
              <span className="font-mono text-xs font-bold text-yellow-400 truncate block select-all">
                {effectiveUrl}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setShowQrCode(!showQrCode)}
                className={`p-2 rounded-xl border transition-all ${showQrCode ? 'bg-yellow-400 text-neutral-950 font-bold' : `${themeClasses.iconBtnBg}`}`}
                title="Ver código QR"
              >
                <QrCode className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyLink}
                className={`p-2 rounded-xl border transition-all ${themeClasses.iconBtnBg} ${themeClasses.accentText}`}
                title="Copiar Enlace"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400 animate-pulse" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* QR CODE DISPLAY WHEN TOGGLED */}
        {showQrCode && (
          <div className={`${themeClasses.subCardBg} p-5 rounded-2xl border text-center space-y-3 animate-scale-up`}>
            <span className="text-xs font-extrabold text-zinc-300 block">
              Escanea para abrir en cualquier teléfono
            </span>

            {/* Crisp Pure SVG QR Representation */}
            <div className="bg-white p-3 rounded-2xl w-44 h-44 mx-auto flex items-center justify-center shadow-lg border border-zinc-200">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Corner Squares */}
                <rect x="5" y="5" width="28" height="28" fill="#09090b" rx="4" />
                <rect x="9" y="9" width="20" height="20" fill="#ffffff" rx="2" />
                <rect x="13" y="13" width="12" height="12" fill="#09090b" rx="2" />

                <rect x="67" y="5" width="28" height="28" fill="#09090b" rx="4" />
                <rect x="71" y="9" width="20" height="20" fill="#ffffff" rx="2" />
                <rect x="75" y="13" width="12" height="12" fill="#09090b" rx="2" />

                <rect x="5" y="67" width="28" height="28" fill="#09090b" rx="4" />
                <rect x="9" y="71" width="20" height="20" fill="#ffffff" rx="2" />
                <rect x="13" y="75" width="12" height="12" fill="#09090b" rx="2" />

                {/* Simulated dynamic QR matrix data patterns */}
                <rect x="38" y="8" width="6" height="6" fill="#09090b" />
                <rect x="50" y="12" width="6" height="6" fill="#09090b" />
                <rect x="42" y="24" width="6" height="6" fill="#09090b" />
                <rect x="54" y="26" width="6" height="6" fill="#09090b" />

                <rect x="8" y="38" width="6" height="6" fill="#09090b" />
                <rect x="18" y="44" width="6" height="6" fill="#09090b" />
                <rect x="28" y="40" width="6" height="6" fill="#09090b" />

                <rect x="38" y="40" width="8" height="8" fill="#eab308" rx="2" />
                <rect x="52" y="42" width="6" height="6" fill="#09090b" />
                <rect x="44" y="54" width="6" height="6" fill="#09090b" />
                <rect x="58" y="56" width="6" height="6" fill="#09090b" />

                <rect x="70" y="38" width="6" height="6" fill="#09090b" />
                <rect x="82" y="44" width="6" height="6" fill="#09090b" />
                <rect x="74" y="54" width="6" height="6" fill="#09090b" />
                <rect x="88" y="58" width="6" height="6" fill="#09090b" />

                <rect x="38" y="70" width="6" height="6" fill="#09090b" />
                <rect x="50" y="74" width="6" height="6" fill="#09090b" />
                <rect x="42" y="86" width="6" height="6" fill="#09090b" />
                <rect x="56" y="84" width="6" height="6" fill="#09090b" />
                <rect x="70" y="72" width="6" height="6" fill="#09090b" />
                <rect x="84" y="80" width="6" height="6" fill="#09090b" />
                <rect x="76" y="88" width="6" height="6" fill="#09090b" />
              </svg>
            </div>

            <p className="text-[10px] text-zinc-400 font-mono">
              {effectiveUrl}
            </p>
          </div>
        )}

        {/* 1-TAP SOCIAL & MESSAGING SHARE BUTTONS */}
        <div className="space-y-2">
          <span className={`text-[10px] font-extrabold ${themeClasses.textMuted} uppercase tracking-wider block pl-1`}>
            Compartir en Redes y Mensajería
          </span>

          <div className="grid grid-cols-2 gap-2">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(fullReportShareText)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-neutral-950 font-black text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 select-none"
            >
              <MessageCircle className="w-4 h-4 fill-current text-neutral-950" />
              <span>WhatsApp</span>
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(effectiveUrl)}&text=${encodeURIComponent(`Consulta el dólar BCV y USDT en vivo con ${appName}`)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#0088cc] hover:bg-[#0077b5] text-white font-black text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 select-none"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>Telegram</span>
            </a>

            {/* X / Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shortShareText)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 border border-zinc-700 transition-all active:scale-95 select-none"
            >
              <span className="font-mono font-black text-sm">𝕏</span>
              <span>Twitter / X</span>
            </a>

            {/* Native Mobile Share */}
            <button
              onClick={handleNativeShare}
              className={`font-bold text-xs py-2.5 px-3 rounded-xl border ${themeClasses.iconBtnBg} flex items-center justify-center gap-2 transition-all active:scale-95`}
            >
              <Smartphone className="w-4 h-4 text-yellow-400" />
              <span>Más opciones</span>
            </button>
          </div>
        </div>

        {/* PWA NATIVE INSTALL OPTION (Hidden if already installed or unavailable) */}
        {!isStandaloneApp && canInstall && onInstallApp && (
          <div className="space-y-1.5 pt-1">
            <span className={`text-[10px] font-extrabold ${themeClasses.textMuted} uppercase tracking-wider block pl-1`}>
              Aplicación Nativa (PWA)
            </span>
            <button
              onClick={() => {
                onClose();
                onInstallApp();
              }}
              className={`w-full p-3.5 rounded-2xl border transition-all flex items-center justify-between group text-left ${
                isLight
                  ? 'bg-amber-50 hover:bg-amber-100/80 border-amber-200 shadow-xs'
                  : 'bg-yellow-400/10 hover:bg-yellow-400/15 border-yellow-400/30 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 text-neutral-950 flex items-center justify-center font-bold shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black ${themeClasses.textPrimary}`}>
                      Instalar App
                    </span>
                    <span className="text-[9px] bg-yellow-400 text-neutral-950 font-black px-1.5 py-0.5 rounded-full uppercase">
                      PWA
                    </span>
                  </div>
                  <span className={`text-[10.5px] ${themeClasses.textSecondary} block leading-tight mt-0.5`}>
                    Acceso directo en pantalla de inicio y modo sin conexión
                  </span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-yellow-400 text-neutral-950 font-bold shrink-0 ml-2 group-hover:scale-105 transition-transform shadow-xs">
                <Download className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}

        {/* SHARE REPORT PRESETS (Quick Copy) */}
        <div className="space-y-2 pt-1">
          <span className={`text-[10px] font-extrabold ${themeClasses.textMuted} uppercase tracking-wider block pl-1`}>
            Copiar Reporte Formateado
          </span>

          <div className="space-y-2">
            <button
              onClick={handleCopyFullReport}
              className={`w-full ${themeClasses.subCardBg} hover:border-yellow-400/50 p-3 rounded-xl border text-left transition-all flex items-center justify-between group`}
            >
              <div className="space-y-0.5">
                <span className={`text-xs font-bold ${themeClasses.textPrimary} block`}>
                  Reporte del Día (BCV, Euro, USDT)
                </span>
                <span className={`text-[10px] ${themeClasses.textSecondary} block`}>
                  Incluye las cotizaciones oficiales, paralelas y tu enlace web
                </span>
              </div>
              <div className={`p-2 rounded-lg ${themeClasses.iconBtnBg} border text-yellow-400 shrink-0 ml-2`}>
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </div>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <button
          onClick={onClose}
          className={`w-full ${themeClasses.iconBtnBg} font-bold text-xs py-3 rounded-xl border transition-all text-center`}
        >
          Cerrar
        </button>

      </div>
    </div>
  );
};
