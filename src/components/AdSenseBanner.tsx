import React, { useEffect, useState } from 'react';
import { ADSENSE_CONFIG, pushAdSenseAd } from '../config/adsense';
import { Sparkles, Info, ShieldCheck, X } from 'lucide-react';

interface AdSenseBannerProps {
  themeClasses: any;
  isLight: boolean;
  className?: string;
  isSticky?: boolean;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  themeClasses,
  isLight,
  className = '',
  isSticky = true,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Trigger Google AdSense script ad slot push
    pushAdSenseAd();
  }, []);

  const bannerInnerContent = (
    <div 
      className={`relative overflow-hidden rounded-xl border transition-all duration-300 shadow-md ${
        isLight 
          ? 'bg-gradient-to-r from-zinc-50 via-amber-50/60 to-zinc-50 border-zinc-300/90' 
          : 'bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-zinc-800/90'
      }`}
    >
      {/* Top bar with official AD label tag and info trigger */}
      <div className={`flex items-center justify-between px-2.5 pt-1 pb-0.5 border-b ${isLight ? 'border-zinc-200/80 bg-zinc-100/50' : 'border-zinc-800/80 bg-neutral-900/50'} text-[8.5px]`}>
        <div className="flex items-center gap-1.5">
          <span className="bg-yellow-400 text-neutral-950 font-black px-1.5 py-0.2 rounded-[3px] tracking-wider text-[7.5px] uppercase leading-none shadow-2xs">
            ANUNCIO
          </span>
          <span className={`font-mono font-medium truncate ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Google AdSense • Sticky Bottom Banner
          </span>
        </div>

        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`flex items-center gap-1 text-[8px] font-semibold transition-colors px-1.5 py-0.5 rounded shrink-0 ${
            isLight ? 'text-zinc-600 hover:text-zinc-900 bg-zinc-200/60' : 'text-zinc-400 hover:text-zinc-200 bg-zinc-800/60'
          }`}
          title="Credenciales y estado de Google AdSense"
          type="button"
        >
          <Info className="w-2.5 h-2.5 text-yellow-400" />
          <span>Info IDs</span>
        </button>
      </div>

      {/* Banner Content Area / AdSlot Container */}
      <div className="px-2.5 py-1.5 flex items-center justify-between gap-2.5 min-h-[44px]">
        {/* Google AdSense container */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
            isLight 
              ? 'bg-amber-100/80 border-amber-300 text-amber-900' 
              : 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400'
          }`}>
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className={`text-[10.5px] font-black tracking-tight truncate ${themeClasses.textPrimary}`}>
                Monitor VE Pro • Tasas al Instante
              </span>
              <span className="text-[7.5px] text-emerald-500 font-bold bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20 shrink-0">
                Oficial
              </span>
            </div>
            <p className={`text-[8.5px] font-medium leading-tight truncate ${themeClasses.textSecondary}`}>
              Dólar BCV, Euro y Binance USDT en vivo.
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="shrink-0 flex items-center">
          <a
            href="#calculator"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-neutral-950 font-black text-[9.5px] px-2.5 py-1 rounded-lg shadow-2xs transition-all flex items-center gap-1 whitespace-nowrap"
          >
            <span>Abrir</span>
          </a>
        </div>
      </div>

      {/* Google AdSense ins element slot */}
      <ins
        className="adsbygoogle"
        style={{ display: 'none' }}
        data-ad-client={ADSENSE_CONFIG.CLIENT_ID}
        data-ad-slot={ADSENSE_CONFIG.SLOT_ID}
        data-ad-format={ADSENSE_CONFIG.FORMAT}
        data-full-width-responsive={ADSENSE_CONFIG.FULL_WIDTH_RESPONSIVE.toString()}
      />

      {/* Collapsible Info Drawer with Official Unit IDs */}
      {showInfo && (
        <div className={`px-2.5 py-2 border-t ${
          isLight ? 'bg-zinc-100 border-zinc-300 text-zinc-700' : 'bg-black/90 border-zinc-800 text-zinc-300'
        } text-[9px] space-y-1.5 animate-fade-in`}>
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1 text-yellow-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Credenciales Oficiales Google AdSense</span>
            </span>
            <button 
              onClick={() => setShowInfo(false)}
              className="text-zinc-400 hover:text-white text-[8px] p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1 font-mono text-[8.5px] break-all">
            <div>
              <span className="text-zinc-400 block font-sans text-[7.5px] uppercase tracking-wider font-semibold">Publisher Client ID (&lt;head&gt;):</span>
              <code className="text-yellow-400 bg-neutral-950/70 px-1.5 py-0.5 rounded border border-zinc-700/40 block">
                {ADSENSE_CONFIG.CLIENT_ID}
              </code>
            </div>
            <div>
              <span className="text-zinc-400 block font-sans text-[7.5px] uppercase tracking-wider font-semibold">Ad Unit Slot ID:</span>
              <code className="text-yellow-400 bg-neutral-950/70 px-1.5 py-0.5 rounded border border-zinc-700/40 block">
                {ADSENSE_CONFIG.SLOT_ID}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // If sticky bottom layout is enabled (default UI/UX & Web Layout):
  if (isSticky) {
    return (
      <aside
        id="adsense-sticky-bottom-container"
        aria-label="Espacio Publicitario Google AdSense Fijo Inferior"
        className={`fixed bottom-0 left-0 right-0 z-35 w-full pointer-events-auto border-t transition-colors duration-300 select-none pb-[env(safe-area-inset-bottom,0px)] ${
          isLight 
            ? 'bg-white/95 backdrop-blur-md border-zinc-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]' 
            : 'bg-neutral-950/95 backdrop-blur-md border-zinc-800/90 shadow-[0_-4px_16px_rgba(0,0,0,0.4)]'
        } ${className}`}
      >
        <div className="max-w-lg mx-auto px-3 sm:px-4 py-1.5">
          {bannerInnerContent}
        </div>
      </aside>
    );
  }

  // Inline non-sticky variant if ever requested
  return (
    <aside 
      aria-label="Espacio Publicitario Google AdSense"
      className={`w-full max-w-lg mx-auto transition-all duration-300 select-none ${className}`}
    >
      {bannerInnerContent}
    </aside>
  );
};

// Backwards compatibility alias
export const AdMobBanner = AdSenseBanner;
