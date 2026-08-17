import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  isDataLoaded: boolean;
  onFinish: () => void;
  minDuration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  isDataLoaded,
  onFinish,
  minDuration = 2200,
}) => {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Iniciando Monitor VE...');
  const [animationStage, setAnimationStage] = useState<'intro' | 'reveal' | 'ready' | 'exit'>('intro');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    // Staged progress simulation coordinated with actual load state
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStatusText('Sincronizando Dólar BCV y Euro Oficial...');
      setAnimationStage('reveal');
    }, 500);

    const timer2 = setTimeout(() => {
      setProgress(80);
      setStatusText('Consultando USDT Binance y brecha cambiaria...');
    }, 1200);

    // Check completion once minimum display duration and data readiness are both fulfilled
    const checkCompletion = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= minDuration && isDataLoaded) {
        clearInterval(checkCompletion);
        setProgress(100);
        setStatusText('¡Tasas en tiempo real verificadas!');
        setAnimationStage('ready');

        // Start smooth exit fade-out
        const exitTimer = setTimeout(() => {
          setIsFadingOut(true);
          setAnimationStage('exit');

          // Clean unmount after transition completes
          const unmountTimer = setTimeout(() => {
            onFinish();
          }, 650);

          return () => clearTimeout(unmountTimer);
        }, 350);

        return () => clearTimeout(exitTimer);
      }
    }, 100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(checkCompletion);
    };
  }, [isDataLoaded, minDuration, onFinish]);

  return (
    <div
      id="splash-screen-container"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-between p-6 bg-[#09090b] select-none overflow-hidden transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Gold Radial Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-yellow-500/15 rounded-full blur-3xl animate-pulse-glow" />
        {/* Center Tricolor Ambient Spheres */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
        {/* Bottom Gold Reflection */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-yellow-400/10 rounded-full blur-3xl" />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#facc15 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Top Bar / Status Tag */}
      <div className="w-full max-w-sm flex items-center justify-between z-10 pt-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-semibold text-zinc-300 tracking-wide uppercase">
            Venezuela • En Vivo
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-500">v2.5 PWA</span>
      </div>

      {/* Center Animated Logo & Emblems */}
      <div className="relative flex flex-col items-center justify-center z-10 my-auto">
        {/* Expanding Ring Waves */}
        <div className="absolute w-44 h-44 rounded-full border border-yellow-400/20 animate-ping opacity-25" style={{ animationDuration: '3s' }} />
        <div className="absolute w-52 h-52 rounded-full border border-yellow-500/10 animate-pulse-glow" />

        {/* Master Animated SVG Emblem */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center animate-float-gentle">
          {/* Shimmer Light Flare Sweep */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-20">
            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-light" />
          </div>

          <svg
            className="w-full h-full drop-shadow-[0_12px_32px_rgba(250,204,21,0.25)]"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Outer Golden Gradient */}
              <linearGradient id="splashGoldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="25%" stopColor="#FACC15" />
                <stop offset="50%" stopColor="#CA8A04" />
                <stop offset="75%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#FDE047" />
              </linearGradient>

              {/* Coin Base Gradient */}
              <radialGradient id="splashCoinBg" cx="50%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#1c1917" />
                <stop offset="50%" stopColor="#0c0a09" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>

              {/* Tricolor Ribbon Gradients */}
              <linearGradient id="splashYellow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#EAB308" />
              </linearGradient>

              <linearGradient id="splashBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#1D4ED8" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>

              <linearGradient id="splashRed" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>

              {/* Embossed Dollar Gradient */}
              <linearGradient id="splashDollar" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="20%" stopColor="#FEF08A" />
                <stop offset="55%" stopColor="#FACC15" />
                <stop offset="85%" stopColor="#CA8A04" />
                <stop offset="100%" stopColor="#854D0E" />
              </linearGradient>

              {/* Drop Shadows */}
              <filter id="splashShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.9" />
              </filter>
            </defs>

            {/* Base Coin Circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="url(#splashCoinBg)"
              className="transition-transform duration-1000 ease-out"
            />

            {/* Inner Concentric Rim */}
            <circle
              cx="80"
              cy="80"
              r="63"
              stroke="#27272a"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />

            {/* Animated Outer Golden Border (Draw Stroke Effect) */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#splashGoldRing)"
              strokeWidth="4"
              className="animate-draw-stroke"
            />

            {/* 3 Venezuelan Flag Waves */}
            <g className="transition-all duration-700 ease-out">
              {/* Yellow Wave */}
              <path
                d="M 24 75 C 50 55, 110 95, 136 75 L 131 82 C 105 102, 45 62, 19 82 Z"
                fill="url(#splashYellow)"
                opacity="0.95"
              />
              {/* Blue Wave */}
              <path
                d="M 26 82 C 52 62, 112 102, 138 82 L 133 89 C 107 109, 47 69, 21 89 Z"
                fill="url(#splashBlue)"
                opacity="0.95"
              />
              {/* Red Wave */}
              <path
                d="M 28 89 C 54 69, 114 109, 140 89 L 135 96 C 109 116, 49 76, 23 96 Z"
                fill="url(#splashRed)"
                opacity="0.95"
              />
            </g>

            {/* 8 White Constellation Stars in Arc */}
            <g fill="#FFFFFF" className="animate-star-twinkle">
              <circle cx="48" cy="80" r="1.8" />
              <circle cx="57" cy="83" r="1.8" />
              <circle cx="67" cy="86" r="1.8" />
              <circle cx="77" cy="87.5" r="1.8" />
              <circle cx="87" cy="87.5" r="1.8" />
              <circle cx="97" cy="86" r="1.8" />
              <circle cx="107" cy="83" r="1.8" />
              <circle cx="116" cy="80" r="1.8" />
            </g>

            {/* Central Golden '$' Symbol with 3D Depth */}
            <text
              x="80"
              y="85"
              fill="#000000"
              opacity="0.6"
              fontSize="60"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              $
            </text>
            <text
              x="80"
              y="82"
              fill="url(#splashDollar)"
              stroke="#78350F"
              strokeWidth="1.5"
              fontSize="60"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              dominantBaseline="middle"
              filter="url(#splashShadow)"
            >
              $
            </text>

            {/* Specular Light Reflection Arc */}
            <ellipse
              cx="80"
              cy="32"
              rx="42"
              ry="12"
              fill="#FFFFFF"
              opacity="0.08"
            />
          </svg>
        </div>

        {/* Brand Name Typography */}
        <div className="mt-8 text-center">
          <h1 className="text-3xl md:text-4xl font-black font-display tracking-wider text-white flex items-center justify-center gap-2">
            <span>MONITOR</span>
            <span className="text-yellow-400 drop-shadow-[0_0_16px_rgba(250,204,21,0.5)]">
              VE
            </span>
          </h1>
          <p className="mt-1 text-xs md:text-sm font-medium text-zinc-400 tracking-widest uppercase">
            Calculadora de Divisas & Tasas Oficiales
          </p>
        </div>
      </div>

      {/* Bottom Progress Bar & Live Status Indicator */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3 z-10 pb-4">
        {/* Progress Bar with Shimmer */}
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden p-[1px] border border-zinc-800/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 transition-all duration-300 ease-out relative overflow-hidden shadow-[0_0_12px_rgba(250,204,21,0.5)]"
            style={{ width: `${progress}%` }}
          >
            {/* Inner Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-light" />
          </div>
        </div>

        {/* Dynamic Status Text */}
        <div className="flex items-center justify-between w-full text-[11px] text-zinc-400 font-mono">
          <span className="truncate pr-2">{statusText}</span>
          <span className="text-yellow-400 font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
