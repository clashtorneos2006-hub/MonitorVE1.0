import React, { useEffect, useState } from 'react';
import { ADMOB_CONFIG, initializeMobileAds } from '../config/admob';
import { Sparkles, Info, ShieldCheck } from 'lucide-react';

interface AdMobBannerProps {
  themeClasses: any;
  isLight: boolean;
  className?: string;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({
  themeClasses,
  isLight,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Initialize native Android AdMob bridge if active in WebView or Capacitor
    initializeMobileAds();
  }, []);

  if (!isLoaded) return null;

  return (
    <aside 
      aria-label="Espacio Publicitario Google AdMob"
      className={`w-full max-w-lg mx-auto transition-all duration-300 select-none ${className}`}
    >
      {/* Container with AdMob standard aspect ratio & styling */}
      <div 
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
          isLight 
            ? 'bg-gradient-to-r from-zinc-100 via-amber-50/40 to-zinc-100 border-zinc-300/80 shadow-xs' 
            : 'bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-zinc-800/80 shadow-sm'
        }`}
      >
        {/* Top bar with AD tag and info button */}
        <div className="flex items-center justify-between px-3 pt-1.5 pb-0.5 border-b border-zinc-700/20 text-[9px]">
          <div className="flex items-center gap-1.5">
            <span className="bg-yellow-400 text-neutral-950 font-black px-1.5 py-0.5 rounded-[4px] tracking-wider text-[8px] uppercase leading-none shadow-2xs">
              ANUNCIO
            </span>
            <span className={`font-mono font-medium ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Google AdMob • Adaptive Banner
            </span>
          </div>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`flex items-center gap-1 text-[8.5px] font-semibold transition-colors px-1 py-0.5 rounded ${
              isLight ? 'text-zinc-500 hover:text-zinc-800' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Información de la unidad de anuncios"
            type="button"
          >
            <Info className="w-2.5 h-2.5 text-yellow-400" />
            <span>Info</span>
          </button>
        </div>

        {/* Banner Content Area: 320x50 standard mobile adaptive frame */}
        <div className="px-3 py-2 flex items-center justify-between gap-3 min-h-[50px]">
          {/* Ad Creative simulation / Official AdMob slot container */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
              isLight 
                ? 'bg-amber-100/80 border-amber-300 text-amber-900' 
                : 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400'
            }`}>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className={`text-[11px] font-black tracking-tight truncate ${themeClasses.textPrimary}`}>
                  Monitor VE Pro & Tasas al Instante
                </span>
                <span className="text-[8px] text-emerald-500 font-bold bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20 shrink-0">
                  Oficial
                </span>
              </div>
              <p className={`text-[9.5px] font-medium leading-tight truncate ${themeClasses.textSecondary}`}>
                Cotizaciones en tiempo real, alertas de variación y calculadora financiera.
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="shrink-0 flex items-center gap-1">
            <a
              href="#calculator"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-neutral-950 font-black text-[10px] px-2.5 py-1.5 rounded-xl shadow-xs transition-all flex items-center gap-1 whitespace-nowrap"
            >
              <span>Abrir</span>
            </a>
          </div>
        </div>

        {/* Collapsible Info Drawer with Official Unit IDs */}
        {showInfo && (
          <div className={`px-3 py-2 border-t ${
            isLight ? 'bg-zinc-200/60 border-zinc-300 text-zinc-700' : 'bg-black/60 border-zinc-800 text-zinc-300'
          } text-[9.5px] space-y-1.5 animate-fade-in`}>
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1 text-yellow-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Credenciales Oficiales Google AdMob</span>
              </span>
              <span className="text-[8px] font-mono text-emerald-400">Vinculado ✓</span>
            </div>

            <div className="grid grid-cols-1 gap-1 font-mono text-[9px] break-all">
              <div>
                <span className="text-zinc-400 block font-sans text-[8px] uppercase tracking-wider font-semibold">App ID (Manifest):</span>
                <code className="text-yellow-400 bg-neutral-950/40 px-1 py-0.5 rounded border border-zinc-700/40 block">
                  {ADMOB_CONFIG.APP_ID}
                </code>
              </div>
              <div>
                <span className="text-zinc-400 block font-sans text-[8px] uppercase tracking-wider font-semibold">Ad Unit ID (Banner):</span>
                <code className="text-yellow-400 bg-neutral-950/40 px-1 py-0.5 rounded border border-zinc-700/40 block">
                  {ADMOB_CONFIG.BANNER_AD_UNIT_ID}
                </code>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
