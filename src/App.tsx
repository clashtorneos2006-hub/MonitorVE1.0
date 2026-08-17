/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Menu, 
  RefreshCw, 
  Share2, 
  Copy, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  X, 
  ChevronDown, 
  Check, 
  Settings, 
  Plus, 
  Info, 
  List, 
  Sparkles, 
  ArrowRightLeft, 
  History,
  ExternalLink,
  BookOpen,
  Star,
  Shield,
  Zap,
  Globe,
  Coins,
  Sun,
  Moon,
  BarChart3,
  Smartphone,
  Download
} from 'lucide-react';
import { INITIAL_RATES } from './data/initialData';
import { ExchangeRate, CalculationHistory } from './types';
import { HistoricalRatesModal } from './components/HistoricalRatesModal';
import { ShareModal } from './components/ShareModal';
import { AdSenseBanner } from './components/AdSenseBanner';
import { lookupRateByDate, formatDateToSpanish } from './data/historicalData';

export default function App() {
  // Core state
  const [rates, setRates] = useState<ExchangeRate[]>(INITIAL_RATES);
  const [activeRateId, setActiveRateId] = useState<'bcv' | 'euro' | 'usdt' | 'personalizada'>('bcv');
  const [history, setHistory] = useState<CalculationHistory[]>(() => {
    const saved = localStorage.getItem('conversion_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Customizable Brand State
  const [appName, setAppName] = useState<string>(() => {
    return localStorage.getItem('app_name') || 'Monitor VE';
  });
  const [selectedLogoId, setSelectedLogoId] = useState<'tricolor' | 'star' | 'shield' | 'zap' | 'globe' | 'coins'>(() => {
    return (localStorage.getItem('app_logo_id') as any) || 'tricolor';
  });
  
  // Theme Mode State: 'dark' or 'light'
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme_mode') as 'dark' | 'light') || 'dark';
  });

  // Visual Theme Skin Selection
  const [appTheme, setAppTheme] = useState<'obsidian' | 'fintech-mint' | 'cosmic-lavender'>(() => {
    return (localStorage.getItem('app_skin') as any) || 'obsidian';
  });

  // Persist settings
  useEffect(() => {
    localStorage.setItem('app_name', appName);
    localStorage.setItem('app_logo_id', selectedLogoId);
    localStorage.setItem('theme_mode', themeMode);
    localStorage.setItem('app_skin', appTheme);
  }, [appName, selectedLogoId, themeMode, appTheme]);

  useEffect(() => {
    localStorage.setItem('conversion_history', JSON.stringify(history));
  }, [history]);

  // Dynamic color configuration based on selected visual theme skin and mode (Light / Dark)
  const getThemeColorClasses = () => {
    const isLight = themeMode === 'light';

    if (isLight) {
      switch (appTheme) {
        case 'fintech-mint':
          return {
            bg: 'bg-emerald-50/40',
            cardBg: 'bg-white',
            inputBg: 'bg-zinc-50',
            borderColor: 'border-zinc-200',
            borderAccentColor: 'border-emerald-500/30',
            headerBg: 'bg-white/95 border-zinc-200',
            drawerBg: 'bg-white border-zinc-200',
            sheetBg: 'bg-white border-emerald-500',
            modalBg: 'bg-white border-zinc-200',
            textPrimary: 'text-zinc-900',
            textSecondary: 'text-zinc-600',
            textMuted: 'text-zinc-400',
            accentText: 'text-emerald-600',
            accentBg: 'bg-emerald-50',
            accentBorder: 'border-emerald-300',
            accentHover: 'hover:border-emerald-500',
            buttonBg: 'bg-emerald-500 hover:bg-emerald-600',
            buttonText: 'text-white font-black',
            titleSpan: 'text-emerald-600',
            bulletColor: 'bg-emerald-500',
            pingColor: 'bg-emerald-500',
            badgeText: 'text-emerald-700',
            chipBg: 'bg-zinc-100 hover:bg-emerald-100 text-zinc-800 border-zinc-200',
            iconBtnBg: 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200',
            subCardBg: 'bg-zinc-50 border-zinc-200',
            speedBg: '#e4e4e7',
            speedGauge: '#10b981'
          };
        case 'cosmic-lavender':
          return {
            bg: 'bg-violet-50/40',
            cardBg: 'bg-white',
            inputBg: 'bg-zinc-50',
            borderColor: 'border-zinc-200',
            borderAccentColor: 'border-violet-500/30',
            headerBg: 'bg-white/95 border-zinc-200',
            drawerBg: 'bg-white border-zinc-200',
            sheetBg: 'bg-white border-violet-500',
            modalBg: 'bg-white border-zinc-200',
            textPrimary: 'text-zinc-900',
            textSecondary: 'text-zinc-600',
            textMuted: 'text-zinc-400',
            accentText: 'text-violet-600',
            accentBg: 'bg-violet-50',
            accentBorder: 'border-violet-300',
            accentHover: 'hover:border-violet-500',
            buttonBg: 'bg-violet-600 hover:bg-violet-700',
            buttonText: 'text-white font-black',
            titleSpan: 'text-violet-600',
            bulletColor: 'bg-violet-500',
            pingColor: 'bg-violet-500',
            badgeText: 'text-violet-700',
            chipBg: 'bg-zinc-100 hover:bg-violet-100 text-zinc-800 border-zinc-200',
            iconBtnBg: 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200',
            subCardBg: 'bg-zinc-50 border-zinc-200',
            speedBg: '#e4e4e7',
            speedGauge: '#8b5cf6'
          };
        case 'obsidian':
        default:
          return {
            bg: 'bg-zinc-100',
            cardBg: 'bg-white',
            inputBg: 'bg-zinc-50',
            borderColor: 'border-zinc-200',
            borderAccentColor: 'border-amber-400/40',
            headerBg: 'bg-white/95 border-zinc-200',
            drawerBg: 'bg-white border-zinc-200',
            sheetBg: 'bg-white border-amber-400',
            modalBg: 'bg-white border-zinc-200',
            textPrimary: 'text-zinc-900',
            textSecondary: 'text-zinc-600',
            textMuted: 'text-zinc-400',
            accentText: 'text-amber-600',
            accentBg: 'bg-amber-50',
            accentBorder: 'border-amber-300',
            accentHover: 'hover:border-amber-500',
            buttonBg: 'bg-amber-400 hover:bg-amber-500',
            buttonText: 'text-neutral-950 font-black',
            titleSpan: 'text-amber-600',
            bulletColor: 'bg-amber-500',
            pingColor: 'bg-amber-400',
            badgeText: 'text-amber-700',
            chipBg: 'bg-zinc-100 hover:bg-amber-100 text-zinc-800 border-zinc-200',
            iconBtnBg: 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200',
            subCardBg: 'bg-zinc-50 border-zinc-200',
            speedBg: '#e4e4e7',
            speedGauge: '#f59e0b'
          };
      }
    }

    // Dark mode configurations
    switch (appTheme) {
      case 'fintech-mint':
        return {
          bg: 'bg-[#080d0c]',
          cardBg: 'bg-zinc-900/95',
          inputBg: 'bg-zinc-950',
          borderColor: 'border-zinc-800',
          borderAccentColor: 'border-emerald-500/30',
          headerBg: 'bg-neutral-950/95 border-zinc-900',
          drawerBg: 'bg-[#0d0d0d] border-zinc-900',
          sheetBg: 'bg-[#0d0d0d] border-emerald-500',
          modalBg: 'bg-[#0d0d0d] border-zinc-800',
          textPrimary: 'text-zinc-100',
          textSecondary: 'text-zinc-400',
          textMuted: 'text-zinc-500',
          accentText: 'text-emerald-400',
          accentBg: 'bg-emerald-500/10',
          accentBorder: 'border-emerald-500/20',
          accentHover: 'hover:border-emerald-400/55',
          buttonBg: 'bg-emerald-400 hover:bg-emerald-500',
          buttonText: 'text-neutral-950 font-black',
          titleSpan: 'text-emerald-400',
          bulletColor: 'bg-emerald-500',
          pingColor: 'bg-emerald-400',
          badgeText: 'text-emerald-400',
          chipBg: 'bg-zinc-950 hover:bg-emerald-500/20 text-zinc-200 border-zinc-800',
          iconBtnBg: 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-850',
          subCardBg: 'bg-zinc-950 border-zinc-800',
          speedBg: '#1f1f1d',
          speedGauge: '#10b981'
        };
      case 'cosmic-lavender':
        return {
          bg: 'bg-[#0b0a12]',
          cardBg: 'bg-zinc-900/95',
          inputBg: 'bg-zinc-950',
          borderColor: 'border-zinc-800',
          borderAccentColor: 'border-violet-500/30',
          headerBg: 'bg-neutral-950/95 border-zinc-900',
          drawerBg: 'bg-[#0d0d0d] border-zinc-900',
          sheetBg: 'bg-[#0d0d0d] border-violet-500',
          modalBg: 'bg-[#0d0d0d] border-zinc-800',
          textPrimary: 'text-zinc-100',
          textSecondary: 'text-zinc-400',
          textMuted: 'text-zinc-500',
          accentText: 'text-violet-400',
          accentBg: 'bg-violet-500/10',
          accentBorder: 'border-violet-500/20',
          accentHover: 'hover:border-violet-400/55',
          buttonBg: 'bg-violet-400 hover:bg-violet-500',
          buttonText: 'text-neutral-950 font-black',
          titleSpan: 'text-violet-400',
          bulletColor: 'bg-violet-500',
          pingColor: 'bg-violet-400',
          badgeText: 'text-violet-400',
          chipBg: 'bg-zinc-950 hover:bg-violet-500/20 text-zinc-200 border-zinc-800',
          iconBtnBg: 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-850',
          subCardBg: 'bg-zinc-950 border-zinc-800',
          speedBg: '#1f1f1d',
          speedGauge: '#8b5cf6'
        };
      case 'obsidian':
      default:
        return {
          bg: 'bg-[#090909]',
          cardBg: 'bg-zinc-900/90',
          inputBg: 'bg-zinc-950',
          borderColor: 'border-zinc-800/80',
          borderAccentColor: 'border-yellow-500/30',
          headerBg: 'bg-neutral-950/95 border-zinc-900',
          drawerBg: 'bg-[#0d0d0d] border-zinc-900',
          sheetBg: 'bg-[#0d0d0d] border-yellow-400',
          modalBg: 'bg-[#0d0d0d] border-zinc-800',
          textPrimary: 'text-zinc-100',
          textSecondary: 'text-zinc-400',
          textMuted: 'text-zinc-500',
          accentText: 'text-yellow-400',
          accentBg: 'bg-yellow-400/10',
          accentBorder: 'border-yellow-400/20',
          accentHover: 'hover:border-yellow-400/55',
          buttonBg: 'bg-yellow-400 hover:bg-yellow-500',
          buttonText: 'text-neutral-950 font-black',
          titleSpan: 'text-yellow-400',
          bulletColor: 'bg-yellow-400',
          pingColor: 'bg-yellow-400',
          badgeText: 'text-yellow-400',
          chipBg: 'bg-zinc-950 hover:bg-yellow-400 hover:text-zinc-950 text-zinc-200 border-zinc-800',
          iconBtnBg: 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-850',
          subCardBg: 'bg-zinc-950 border-zinc-800',
          speedBg: '#1f1f1d',
          speedGauge: '#facc15'
        };
    }
  };

  const themeClasses = getThemeColorClasses();

  // Theme toggle action
  const toggleThemeMode = () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextMode);
    showToast(nextMode === 'light' ? '☀️ Modo Claro activado' : '🌙 Modo Oscuro activado');
  };

  // Input fields state (bidirectional conversion with ATM decimal shift)
  const [usdCents, setUsdCents] = useState<number>(100);
  const [bsCents, setBsCents] = useState<number>(() => Math.round(100 * (INITIAL_RATES[0]?.rate || 772.54)));
  const [usdVal, setUsdVal] = useState<string>('1,00');
  const [bsVal, setBsVal] = useState<string>(() => (INITIAL_RATES[0]?.rate || 772.54).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  const [isInitialUsd, setIsInitialUsd] = useState<boolean>(true);
  const [isInitialBs, setIsInitialBs] = useState<boolean>(true);
  const [isSwapped, setIsSwapped] = useState<boolean>(false);

  // UI state overlays
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRatesSheetOpen, setIsRatesSheetOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isHistoricalRatesOpen, setIsHistoricalRatesOpen] = useState(false);

  // Custom interactive systems
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [premiumActive, setPremiumActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandaloneApp, setIsStandaloneApp] = useState<boolean>(() => {
    return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
  });

  // Listen for PWA beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // Custom rate form state
  const [tempCustomRate, setTempCustomRate] = useState<string>('780.00');

  // Helper to render the customizable logo
  const renderLogo = (size: 'small' | 'large') => {
    if (size === 'small') {
      switch (selectedLogoId) {
        case 'star':
          return (
            <div className="w-5 h-5 rounded bg-yellow-400 flex items-center justify-center shadow-xs shrink-0 text-neutral-950">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
          );
        case 'shield':
          return (
            <div className="w-5 h-5 rounded bg-zinc-900 border border-yellow-400 flex items-center justify-center shadow-xs shrink-0 text-yellow-400">
              <Shield className="w-3.5 h-3.5 fill-yellow-400/20" />
            </div>
          );
        case 'zap':
          return (
            <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center shadow-xs shrink-0 text-neutral-950 animate-pulse">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </div>
          );
        case 'globe':
          return (
            <div className="w-5 h-5 rounded bg-zinc-900 border border-yellow-400 flex items-center justify-center shadow-xs shrink-0 text-yellow-500 animate-spin" style={{ animationDuration: '6s' }}>
              <Globe className="w-3.5 h-3.5" />
            </div>
          );
        case 'coins':
          return (
            <div className="w-5 h-5 rounded bg-yellow-400 flex items-center justify-center shadow-xs shrink-0 text-neutral-950">
              <Coins className="w-3.5 h-3.5" />
            </div>
          );
        case 'tricolor':
        default:
          return (
            <div className="w-5 h-5 relative flex items-center justify-center shrink-0">
              <svg className="w-full h-full relative" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10.5" stroke="#FACC15" strokeWidth="1" className="fill-zinc-950" />
                <path d="M 4 11 C 8 8, 16 14, 20 11 L 20 13 C 16 16, 8 10, 4 13 Z" fill="#FACC15" />
                <path d="M 4 13 C 8 10, 16 16, 20 13 L 20 15 C 16 18, 8 12, 4 15 Z" fill="#2563EB" />
                <path d="M 4 15 C 8 12, 16 18, 20 15 L 20 17 C 16 20, 8 14, 4 17 Z" fill="#DC2626" />
                <text x="12" y="13" fill="#FDE047" fontSize="10.5" fontWeight="950" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">$</text>
              </svg>
            </div>
          );
      }
    } else {
      // Large logo versions
      switch (selectedLogoId) {
        case 'star':
          return (
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-xl text-neutral-950 mb-1 animate-pulse">
              <Star className="w-9 h-9 fill-current" />
            </div>
          );
        case 'shield':
          return (
            <div className="w-16 h-16 rounded-2xl bg-zinc-950 border-2 border-yellow-400 flex items-center justify-center shadow-xl text-yellow-400 mb-1">
              <Shield className="w-9 h-9 fill-yellow-400/10" />
            </div>
          );
        case 'zap':
          return (
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-xl text-neutral-950 mb-1 animate-bounce" style={{ animationDuration: '2s' }}>
              <Zap className="w-9 h-9 fill-current" />
            </div>
          );
        case 'globe':
          return (
            <div className="w-16 h-16 rounded-2xl bg-zinc-950 border-2 border-yellow-400 flex items-center justify-center shadow-xl text-yellow-400 mb-1 animate-spin" style={{ animationDuration: '10s' }}>
              <Globe className="w-9 h-9" />
            </div>
          );
        case 'coins':
          return (
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-xl text-neutral-950 mb-1 hover:rotate-12 transition-transform">
              <Coins className="w-9 h-9" />
            </div>
          );
        case 'tricolor':
        default:
          return (
            <div className="w-16 h-16 relative flex items-center justify-center mb-1 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-500/10 via-blue-600/10 to-red-500/10 blur-md" />
              <svg className="w-full h-full relative" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="35" stroke="url(#goldGradientLarge)" strokeWidth="2.5" className="fill-zinc-950" />
                <circle cx="40" cy="40" r="31" stroke="#27272a" strokeWidth="1" />
                
                <path d="M 12 40 C 25 30, 55 50, 68 40 L 65 44 C 52 54, 22 34, 9 44 Z" fill="#FACC15" opacity="0.9" />
                <path d="M 13 44 C 26 34, 56 54, 69 44 L 66 48 C 53 58, 23 38, 10 48 Z" fill="#2563EB" opacity="0.9" />
                <path d="M 14 48 C 27 38, 57 58, 70 48 L 67 52 C 54 62, 24 42, 11 52 Z" fill="#DC2626" opacity="0.9" />

                <text x="40" y="43" fill="url(#goldTextGradient)" fontSize="32" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle" filter="url(#dropShadow)">$</text>

                <defs>
                  <linearGradient id="goldGradientLarge" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FEF08A" />
                    <stop offset="30%" stopColor="#CA8A04" />
                    <stop offset="70%" stopColor="#EAB308" />
                    <stop offset="100%" stopColor="#FDE047" />
                  </linearGradient>
                  <linearGradient id="goldTextGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#A16207" />
                  </linearGradient>
                  <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.8" />
                  </filter>
                </defs>
              </svg>
            </div>
          );
      }
    }
  };

  // Helper to format integer cents to Venezuelan localized currency format (e.g. 100 -> "1,00", 125000 -> "1.250,00")
  const formatCents = (cents: number): string => {
    const value = cents / 100;
    return value.toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Helper to extract only numbers/digits and convert into integer cents (ATM / decimal shift style)
  const parseDigitsToCents = (val: string): number => {
    const digitsOnly = val.replace(/\D/g, '');
    if (!digitsOnly) return 0;
    const num = parseInt(digitsOnly, 10);
    return isNaN(num) ? 0 : Math.min(num, 999999999999);
  };

  // Discards the initial 1.00 USD / initial Bs sample and captures strictly the newly typed keystroke(s)
  const extractNewDigitsOnInitial = (newRawValue: string, previousFormattedValue: string): number => {
    const newDigits = newRawValue.replace(/\D/g, '');
    if (!newDigits) return 0;

    const oldDigits = previousFormattedValue.replace(/\D/g, ''); // e.g. "100" or rate digits

    // If text was replaced or deleted
    if (newDigits.length < oldDigits.length && !oldDigits.includes(newDigits)) {
      return parseInt(newDigits, 10) || 0;
    }

    // Isolate newly added digits by removing characters of the initial value
    let tempNew = newDigits;
    let allMatched = true;
    for (const char of oldDigits) {
      const idx = tempNew.indexOf(char);
      if (idx !== -1) {
        tempNew = tempNew.slice(0, idx) + tempNew.slice(idx + 1);
      } else {
        allMatched = false;
        break;
      }
    }

    if (allMatched && tempNew.length > 0) {
      return parseInt(tempNew, 10) || 0;
    }

    // If user hit backspace on the initial string
    if (oldDigits.startsWith(newDigits)) {
      return 0;
    }

    return parseInt(newDigits, 10) || 0;
  };

  // Find currently active rate
  const activeRateObj = rates.find(r => r.id === activeRateId) || rates[0];
  const activeRateWithFee = activeRateObj ? activeRateObj.rate : (INITIAL_RATES[0]?.rate || 772.54);

  // Fetch real-time exchange rates from API (BCV Dolar, BCV Euro, USDT Binance)
  const fetchRealRates = async (silent = false) => {
    if (!silent) {
      setIsSpinning(true);
    }
    try {
      // Parallel fetch for Dólares and Euros from DolarAPI
      const [dolaresRes, eurosRes] = await Promise.allSettled([
        fetch('https://ve.dolarapi.com/v1/dolares'),
        fetch('https://ve.dolarapi.com/v1/euros')
      ]);

      let oficialDolar: any = null;
      let paraleloDolar: any = null;
      let oficialEuro: any = null;

      if (dolaresRes.status === 'fulfilled' && dolaresRes.value.ok) {
        const dolares = await dolaresRes.value.json();
        if (Array.isArray(dolares)) {
          oficialDolar = dolares.find((item: any) => 
            item.fuente === 'oficial' || 
            item.nombre?.toLowerCase().includes('oficial') ||
            item.nombre?.toLowerCase().includes('bcv')
          );
          paraleloDolar = dolares.find((item: any) => 
            item.fuente === 'paralelo' || 
            item.fuente === 'binance' ||
            item.nombre?.toLowerCase().includes('paralelo') ||
            item.nombre?.toLowerCase().includes('binance') ||
            item.nombre?.toLowerCase().includes('cripto')
          );
        }
      } else {
        // Direct single endpoint attempt for Dollar
        try {
          const directDolar = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
          if (directDolar.ok) {
            oficialDolar = await directDolar.json();
          }
        } catch (_) {}
      }

      if (eurosRes.status === 'fulfilled' && eurosRes.value.ok) {
        const euros = await eurosRes.value.json();
        if (Array.isArray(euros)) {
          oficialEuro = euros.find((item: any) => 
            item.fuente === 'oficial' || 
            item.nombre?.toLowerCase().includes('oficial') ||
            item.nombre?.toLowerCase().includes('bcv')
          );
        } else if (euros && typeof euros.promedio === 'number') {
          oficialEuro = euros;
        }
      } else {
        // Direct single endpoint attempt for Euro
        try {
          const directEuro = await fetch('https://ve.dolarapi.com/v1/euros/oficial');
          if (directEuro.ok) {
            oficialEuro = await directEuro.json();
          }
        } catch (_) {}
      }

      setRates(prevRates => {
        return prevRates.map(r => {
          if (r.id === 'bcv' && oficialDolar && typeof oficialDolar.promedio === 'number') {
            const oldRate = r.rate;
            const newRate = Number(oficialDolar.promedio.toFixed(2));
            const diff = Number((newRate - oldRate).toFixed(2));
            const pct = oldRate > 0 ? Number(((diff / oldRate) * 100).toFixed(2)) : r.changePercent;
            return {
              ...r,
              rate: newRate,
              changeAbsolute: diff,
              changePercent: Math.abs(pct) === 0 ? r.changePercent : pct,
              isUp: diff >= 0
            };
          }
          if (r.id === 'euro' && oficialEuro && typeof oficialEuro.promedio === 'number') {
            const oldRate = r.rate;
            const newRate = Number(oficialEuro.promedio.toFixed(2));
            const diff = Number((newRate - oldRate).toFixed(2));
            const pct = oldRate > 0 ? Number(((diff / oldRate) * 100).toFixed(2)) : r.changePercent;
            return {
              ...r,
              rate: newRate,
              changeAbsolute: diff,
              changePercent: Math.abs(pct) === 0 ? r.changePercent : pct,
              isUp: diff >= 0
            };
          }
          if (r.id === 'usdt' && paraleloDolar && typeof paraleloDolar.promedio === 'number') {
            const oldRate = r.rate;
            const newRate = Number(paraleloDolar.promedio.toFixed(2));
            const diff = Number((newRate - oldRate).toFixed(2));
            const pct = oldRate > 0 ? Number(((diff / oldRate) * 100).toFixed(2)) : r.changePercent;
            return {
              ...r,
              rate: newRate,
              changeAbsolute: diff,
              changePercent: Math.abs(pct) === 0 ? r.changePercent : pct,
              isUp: diff >= 0
            };
          }
          return r;
        });
      });

      const updateDate = oficialDolar?.fechaActualizacion || oficialEuro?.fechaActualizacion;
      if (updateDate) {
        try {
          const fetchedDate = new Date(updateDate).toISOString().split('T')[0];
          setSelectedDate(fetchedDate);
        } catch (_) {}
      }

      if (!silent) {
        showToast('¡Tasas en vivo actualizadas (BCV, Euro y USDT)!');
      }
    } catch (err) {
      console.error('Error al sincronizar tasas:', err);
      if (!silent) {
        showToast('Utilizando tasas locales verificadas de respaldo.');
      }
    } finally {
      if (!silent) {
        setIsSpinning(false);
      }
    }
  };

  // Fetch real rates on mount
  useEffect(() => {
    fetchRealRates(true);
  }, []);

  // Synchronize inputs on rate change, swap mode change, or rate value update
  useEffect(() => {
    if (!isSwapped) {
      const usdNum = usdCents / 100;
      const bsNum = usdNum * activeRateWithFee;
      const computedBsCents = Math.round(bsNum * 100);
      setBsCents(computedBsCents);
      setBsVal(formatCents(computedBsCents));
    } else {
      const bsNum = bsCents / 100;
      const usdNum = activeRateWithFee > 0 ? (bsNum / activeRateWithFee) : 0;
      const computedUsdCents = Math.round(usdNum * 100);
      setUsdCents(computedUsdCents);
      setUsdVal(formatCents(computedUsdCents));
    }
  }, [activeRateId, activeRateWithFee, isSwapped, rates]);

  // Handle USD input change (ATM decimal shift style with automatic initial example discard)
  const handleUsdChange = (val: string) => {
    let cents: number;
    if (isInitialUsd) {
      setIsInitialUsd(false);
      setIsInitialBs(false);
      cents = extractNewDigitsOnInitial(val, usdVal);
    } else {
      cents = parseDigitsToCents(val);
    }
    setUsdCents(cents);
    setUsdVal(formatCents(cents));

    const usdNum = cents / 100;
    const bsNum = usdNum * activeRateWithFee;
    const computedBsCents = Math.round(bsNum * 100);
    setBsCents(computedBsCents);
    setBsVal(formatCents(computedBsCents));
  };

  // Handle Bs input change (ATM decimal shift style with automatic initial example discard)
  const handleBsChange = (val: string) => {
    let cents: number;
    if (isInitialBs) {
      setIsInitialBs(false);
      setIsInitialUsd(false);
      cents = extractNewDigitsOnInitial(val, bsVal);
    } else {
      cents = parseDigitsToCents(val);
    }
    setBsCents(cents);
    setBsVal(formatCents(cents));

    const bsNum = cents / 100;
    const usdNum = activeRateWithFee > 0 ? (bsNum / activeRateWithFee) : 0;
    const computedUsdCents = Math.round(usdNum * 100);
    setUsdCents(computedUsdCents);
    setUsdVal(formatCents(computedUsdCents));
  };

  // Swap / Convert Invert Button Action
  const handleSwapInputs = () => {
    setIsSwapped(prev => !prev);
    showToast(!isSwapped ? 'Conversión invertida: Bolívares ⇄ Dólares' : 'Conversión invertida: Dólares ⇄ Bolívares');
  };

  // Refresh rate action calling our real API integration
  const handleRefresh = () => {
    fetchRealRates(false);
  };

  // Helper to show modern visual alerts
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handle Custom Date Selection Change with Authentic Historical Data
  const handleDateChange = (dateStr: string) => {
    setSelectedDate(dateStr);
    
    // Retrieve authentic historical rates for this date
    const historical = lookupRateByDate(dateStr);
    
    const scaleRates = rates.map(r => {
      if (r.id === 'personalizada') return r;
      if (r.id === 'bcv') {
        const diff = Number((historical.bcv - (INITIAL_RATES[0]?.rate || 772.54)).toFixed(2));
        const pct = Number(((diff / (INITIAL_RATES[0]?.rate || 772.54)) * 100).toFixed(2));
        return {
          ...r,
          rate: historical.bcv,
          changeAbsolute: diff,
          changePercent: pct,
          isUp: diff >= 0
        };
      }
      if (r.id === 'euro') {
        const diff = Number((historical.euro - (INITIAL_RATES[1]?.rate || 889.45)).toFixed(2));
        const pct = Number(((diff / (INITIAL_RATES[1]?.rate || 889.45)) * 100).toFixed(2));
        return {
          ...r,
          rate: historical.euro,
          changeAbsolute: diff,
          changePercent: pct,
          isUp: diff >= 0
        };
      }
      if (r.id === 'usdt') {
        const diff = Number((historical.usdt - (INITIAL_RATES[2]?.rate || 965.80)).toFixed(2));
        const pct = Number(((diff / (INITIAL_RATES[2]?.rate || 965.80)) * 100).toFixed(2));
        return {
          ...r,
          rate: historical.usdt,
          changeAbsolute: diff,
          changePercent: pct,
          isUp: diff >= 0
        };
      }
      return r;
    });
    
    setRates(scaleRates);
    const spanishInfo = formatDateToSpanish(dateStr);
    showToast(`Cotización histórica cargada: ${spanishInfo.fullText}`);
  };

  // Load a historical rate into calculator from the History Center
  const handleSelectHistoricalRateForCalculator = (rateVal: number, rateName: string, dateStr: string) => {
    setRates(prev => prev.map(r => {
      if (r.id === 'personalizada') {
        return {
          ...r,
          rate: rateVal,
          name: `Tasa Histórica (${dateStr})`,
          tagline: `Tasa histórica del ${dateStr}`
        };
      }
      return r;
    }));
    setActiveRateId('personalizada');
    setSelectedDate(dateStr);
    setIsInitialUsd(false);
    setIsInitialBs(false);
  };

  // Format YYYY-MM-DD into Spanish written format
  const formatDateSpanish = (dateStr: string) => {
    const info = formatDateToSpanish(dateStr);
    return info.fullText || dateStr;
  };

  // Copy specific input field to clipboard with feedback
  const handleCopyToClipboard = (val: string, fieldName: string) => {
    navigator.clipboard.writeText(val);
    setCopiedField(fieldName);
    showToast(`Valor copiado: ${val}`);
    setTimeout(() => {
      setCopiedField(null);
    }, 1800);
  };

  // Save current conversion to the list of calculations history
  const handleSaveToHistory = () => {
    const usd = usdCents / 100;
    const bs = bsCents / 100;
    if (usd <= 0 && bs <= 0) {
      showToast('Por favor introduce montos válidos');
      return;
    }

    const newRecord: CalculationHistory = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      rateName: activeRateObj.name,
      rateValue: activeRateWithFee,
      usdAmount: usd,
      bsAmount: bs
    };

    setHistory([newRecord, ...history]);
    showToast('Conversión guardada en el historial local');
  };

  // Submit custom rate setup
  const handleSaveCustomRate = () => {
    const rateNum = parseFloat(tempCustomRate);
    if (isNaN(rateNum) || rateNum <= 0) {
      showToast('Introduce un número de tasa válido');
      return;
    }

    setRates(rates.map(r => {
      if (r.id === 'personalizada') {
        return {
          ...r,
          rate: rateNum,
          tagline: `Tasa manual configurada por el usuario`
        };
      }
      return r;
    }));

    setActiveRateId('personalizada');
    setIsConfigOpen(false);
    showToast(`Tasa personalizada establecida en ${rateNum.toLocaleString('es-VE')} Bs`);
  };

  // Share Application simulation
  const handleShareApp = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopiedLink(false), 2000);
    showToast('Enlace copiado al portapapeles');
  };

  // Progressive Web App (PWA) Install / Add to Home Screen handler
  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('🎉 ¡Monitor VE agregado a tu pantalla de inicio!');
      }
      setDeferredPrompt(null);
    } else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) {
        showToast('📱 En iPhone: Toca "Compartir" (⎋) y luego "Agregar a inicio"');
      } else {
        showToast('📱 En Android: Toca el menú (⋮) y selecciona "Instalar aplicación"');
      }
    }
  };

  // Calculated USDT/BCV gap
  const bcvPrice = rates.find(r => r.id === 'bcv')?.rate || 1;
  const usdtPrice = rates.find(r => r.id === 'usdt')?.rate || 1;
  const computedBrecha = ((usdtPrice / bcvPrice - 1) * 100).toFixed(2);

  // Simple preset additions for calculations
  const PRESET_USD_ADDITIONS = [5, 10, 20, 50, 100, 500];

  const addPresetUSD = (amount: number) => {
    let nextCents: number;
    if (isInitialUsd) {
      nextCents = amount * 100;
      setIsInitialUsd(false);
      setIsInitialBs(false);
    } else {
      nextCents = usdCents + (amount * 100);
    }
    setUsdCents(nextCents);
    setUsdVal(formatCents(nextCents));

    const usdNum = nextCents / 100;
    const bsNum = usdNum * activeRateWithFee;
    const computedBsCents = Math.round(bsNum * 100);
    setBsCents(computedBsCents);
    setBsVal(formatCents(computedBsCents));
    showToast(`+$${amount} USD agregado`);
  };

  const isLight = themeMode === 'light';

  return (
    <div className={`min-h-screen ${themeClasses.bg} font-sans ${themeClasses.textPrimary} selection:bg-yellow-400 selection:text-neutral-900 overflow-x-hidden pb-32 sm:pb-36 relative transition-colors duration-300`}>
      
      {/* Modern floating alert system */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[999] bg-yellow-400 text-neutral-950 text-xs font-bold px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-yellow-300 animate-bounce">
          <Sparkles className="w-4 h-4 text-neutral-900" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navigation Bar */}
      <header className={`sticky top-0 z-[40] ${themeClasses.headerBg} backdrop-blur-md px-4 py-3 flex items-center justify-between transition-colors duration-300 border-b`}>
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className={`p-2.5 rounded-xl ${themeClasses.iconBtnBg} ${themeClasses.accentText} active:scale-95 transition-all border`}
          id="btn-open-drawer"
          title="Menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Logo center */}
        <div className="flex flex-col items-center select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className={`flex items-center gap-2 ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'} px-3.5 py-1.5 rounded-full border shadow-2xs`}>
            {renderLogo('small')}
            <span className={`font-display font-black tracking-tight text-sm ${themeClasses.textPrimary}`}>
              {appName}
            </span>
          </div>
        </div>

        {/* Top right triggers: Theme Toggle, Refresh, Share */}
        <div className="flex items-center gap-1.5">
          {/* THEME TOGGLE BUTTON (Claro / Oscuro) */}
          <button 
            onClick={toggleThemeMode}
            className={`p-2.5 rounded-xl ${themeClasses.iconBtnBg} active:scale-95 transition-all border ${themeClasses.accentText}`}
            title={isLight ? "Cambiar a Modo Oscuro" : "Cambiar a Modo Claro"}
            id="btn-theme-toggle"
          >
            {isLight ? (
              <Moon className="w-5 h-5 text-zinc-700" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '16s' }} />
            )}
          </button>

          <button 
            onClick={handleRefresh}
            className={`p-2.5 rounded-xl ${themeClasses.iconBtnBg} active:scale-95 transition-all border ${themeClasses.accentText} ${isSpinning ? 'animate-spin' : ''}`}
            title="Sincronizar Tasas"
            id="btn-refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setIsShareOpen(true)}
            className={`p-2.5 rounded-xl ${themeClasses.iconBtnBg} active:scale-95 transition-all border ${themeClasses.accentText}`}
            title="Compartir"
            id="btn-share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Container Core Layout */}
      <main className="max-w-md mx-auto px-4 pt-2.5 sm:pt-4 space-y-3.5 sm:space-y-4">
        
        {/* Dynamic header showcase circle / brand center */}
        <div className="flex flex-col items-center text-center space-y-2 mt-0 mb-0.5">
          {/* Circular dial resembling rates speedometer */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
            <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke={themeClasses.speedBg} strokeWidth="4" fill="transparent" />
              <circle cx="50" cy="50" r="40" stroke={themeClasses.speedGauge} strokeWidth="5" fill="transparent" strokeDasharray="160 250" strokeLinecap="round" className="opacity-30" />
              <circle cx="50" cy="50" r="40" stroke={themeClasses.speedGauge} strokeWidth="6" fill="transparent" strokeDasharray="95 250" strokeLinecap="round" />
            </svg>
            
            {/* Central icon container */}
            <div className={`w-18 h-18 sm:w-20 sm:h-20 ${isLight ? 'bg-white border-zinc-200' : 'bg-zinc-950 border-zinc-800'} rounded-full shadow-xl border flex flex-col items-center justify-center relative p-1.5`}>
              <div className="scale-65 sm:scale-75 flex items-center justify-center -translate-y-1">
                {renderLogo('large')}
              </div>
              <div className={`absolute bottom-1.5 flex gap-1 py-0.5 text-[7.5px] ${themeClasses.textSecondary} font-bold uppercase tracking-wider ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-950 border-zinc-900'} px-2 rounded-full border`}>
                <span className="text-emerald-500 font-mono">En</span>
                <span className="text-zinc-400 font-mono">/</span>
                <span className={`font-mono font-bold ${themeClasses.accentText}`}>Vivo</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-0">
            <h1 className={`font-display font-black text-xl sm:text-2xl ${themeClasses.textPrimary} tracking-tight`}>{appName}</h1>
            <p className={`${themeClasses.textSecondary} text-[11px] font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5`}>
              <span>Venezuela</span>
              <span className={`w-1.5 h-1.5 rounded-full ${themeClasses.bulletColor} animate-pulse`} />
              <span className={`${themeClasses.accentText} font-bold`}>MONITOREO</span>
            </p>
          </div>
        </div>

        {/* Main Interface Converter Card */}
        <section className={`${themeClasses.cardBg} rounded-[2rem] p-4.5 sm:p-6 shadow-xl ${isLight ? 'shadow-zinc-200/60 border-zinc-200' : 'shadow-black/80 border-zinc-800/80'} border space-y-4 relative overflow-hidden transition-colors duration-300`}>
          
          {/* Subtle Decorative pastel yellow background blob inside card */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />

          {/* Active Currency Selector Dropdown Trigger */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-1.5 px-0.5">
              <label className={`text-[10px] font-bold ${themeClasses.textMuted} uppercase tracking-widest`}>
                Moneda / Tasa Activa
              </label>
              <button
                type="button"
                onClick={() => setIsRatesSheetOpen(true)}
                className={`text-[10px] font-extrabold ${themeClasses.accentText} hover:underline flex items-center gap-0.5`}
              >
                <span>Ver todas las monedas</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            
            {/* Trigger Rate choosing modal selection directly */}
            <button 
              type="button"
              onClick={() => setIsRatesSheetOpen(true)}
              className={`w-full ${themeClasses.inputBg} hover:opacity-95 ${themeClasses.textPrimary} rounded-2xl px-4 py-3 flex items-center justify-between border ${themeClasses.borderColor} transition-all font-display font-bold select-none group shadow-xs`}
              id="btn-select-rate"
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${themeClasses.bulletColor} animate-ping`} />
                <span className="text-sm font-black tracking-tight">{activeRateObj.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${themeClasses.accentText} font-mono font-black ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'} px-2.5 py-1 rounded-lg border`}>
                  {activeRateWithFee.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs
                </span>
                <div className={`p-1 rounded-lg ${isLight ? 'bg-zinc-200/70 text-zinc-700' : 'bg-zinc-800 text-zinc-300'} group-hover:translate-y-0.5 transition-transform`}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          </div>

          {/* Currency Input Fields */}
          <div className="space-y-4">
            
            {/* Field 1 (USD by default, or Bs if inverted) */}
            {!isSwapped ? (
              <div className={`${themeClasses.inputBg} border ${themeClasses.borderColor} rounded-2xl p-4 flex items-center justify-between focus-within:ring-2 focus-within:ring-yellow-400 transition-all relative`}>
                <div className="space-y-1 w-2/3">
                  <span className={`text-[10px] font-bold ${themeClasses.textMuted} uppercase tracking-widest block`}>
                    Cantidad (Dólares divisa)
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xl font-bold ${themeClasses.accentText}`}>$</span>
                    <input 
                      type="text"
                      inputMode="numeric"
                      value={usdVal}
                      onChange={(e) => handleUsdChange(e.target.value)}
                      className={`text-2xl font-bold font-display ${themeClasses.textPrimary} bg-transparent outline-none w-full border-none p-0 focus:ring-0`}
                      placeholder="0,00"
                      id="input-usd"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={() => handleCopyToClipboard(usdVal, 'usd')}
                  className={`p-3 ${themeClasses.iconBtnBg} ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-xl border ${themeClasses.borderColor} transition-all shadow-xs active:scale-95`}
                  title="Copiar USD"
                >
                  {copiedField === 'usd' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ) : (
              <div className={`${themeClasses.inputBg} border ${themeClasses.borderColor} rounded-2xl p-4 flex items-center justify-between focus-within:ring-2 focus-within:ring-yellow-400 transition-all`}>
                <div className="space-y-1 w-2/3">
                  <span className={`text-[10px] font-bold ${themeClasses.textMuted} uppercase tracking-widest block`}>
                    Monto en Bolívares (Bs.)
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-bold ${themeClasses.accentText} font-mono`}>Bs.</span>
                    <input 
                      type="text"
                      inputMode="numeric"
                      value={bsVal}
                      onChange={(e) => handleBsChange(e.target.value)}
                      className={`text-2xl font-bold font-display ${themeClasses.textPrimary} bg-transparent outline-none w-full border-none p-0 focus:ring-0`}
                      placeholder="0,00"
                      id="input-bs"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={() => handleCopyToClipboard(bsVal, 'bs')}
                  className={`p-3 ${themeClasses.iconBtnBg} ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-xl border ${themeClasses.borderColor} transition-all shadow-xs active:scale-95`}
                  title="Copiar Bolívares"
                >
                  {copiedField === 'bs' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            {/* Invert / Swapper Bidirectional icon widget */}
            <div className="flex justify-center -my-2.5 relative z-10">
              <button 
                onClick={handleSwapInputs}
                className="bg-yellow-400 hover:bg-yellow-500 text-neutral-950 p-3 rounded-full shadow-md border-4 border-white dark:border-zinc-900 transition-all duration-300 active:scale-90 hover:scale-105"
                title={isSwapped ? "Cambiar orden a USD ➔ Bs" : "Cambiar orden a Bs ➔ USD"}
              >
                <ArrowRightLeft className={`w-4 h-4 transition-transform duration-300 ${isSwapped ? 'rotate-[-90deg]' : 'rotate-90'}`} />
              </button>
            </div>

            {/* Field 2 (Bs by default, or USD if inverted) */}
            {!isSwapped ? (
              <div className={`${themeClasses.inputBg} border ${themeClasses.borderColor} rounded-2xl p-4 flex items-center justify-between focus-within:ring-2 focus-within:ring-yellow-400 transition-all`}>
                <div className="space-y-1 w-2/3">
                  <span className={`text-[10px] font-bold ${themeClasses.textMuted} uppercase tracking-widest block`}>
                    Monto en Bolívares (Bs.)
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-bold ${themeClasses.accentText} font-mono`}>Bs.</span>
                    <input 
                      type="text"
                      inputMode="numeric"
                      value={bsVal}
                      onChange={(e) => handleBsChange(e.target.value)}
                      className={`text-2xl font-bold font-display ${themeClasses.textPrimary} bg-transparent outline-none w-full border-none p-0 focus:ring-0`}
                      placeholder="0,00"
                      id="input-bs"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={() => handleCopyToClipboard(bsVal, 'bs')}
                  className={`p-3 ${themeClasses.iconBtnBg} ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-xl border ${themeClasses.borderColor} transition-all shadow-xs active:scale-95`}
                  title="Copiar Bolívares"
                >
                  {copiedField === 'bs' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ) : (
              <div className={`${themeClasses.inputBg} border ${themeClasses.borderColor} rounded-2xl p-4 flex items-center justify-between focus-within:ring-2 focus-within:ring-yellow-400 transition-all relative`}>
                <div className="space-y-1 w-2/3">
                  <span className={`text-[10px] font-bold ${themeClasses.textMuted} uppercase tracking-widest block`}>
                    Cantidad (Dólares divisa)
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xl font-bold ${themeClasses.accentText}`}>$</span>
                    <input 
                      type="text"
                      inputMode="numeric"
                      value={usdVal}
                      onChange={(e) => handleUsdChange(e.target.value)}
                      className={`text-2xl font-bold font-display ${themeClasses.textPrimary} bg-transparent outline-none w-full border-none p-0 focus:ring-0`}
                      placeholder="0,00"
                      id="input-usd"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={() => handleCopyToClipboard(usdVal, 'usd')}
                  className={`p-3 ${themeClasses.iconBtnBg} ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} rounded-xl border ${themeClasses.borderColor} transition-all shadow-xs active:scale-95`}
                  title="Copiar USD"
                >
                  {copiedField === 'usd' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

          </div>

          {/* Quick presets increment panel */}
          <div className="space-y-2">
            <span className={`text-[10px] font-bold ${themeClasses.textMuted} uppercase tracking-widest block`}>
              Atajos Rápidos USD
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_USD_ADDITIONS.map(amount => (
                <button
                  key={amount}
                  onClick={() => addPresetUSD(amount)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl ${themeClasses.chipBg} border transition-all active:scale-95 flex items-center gap-1`}
                >
                  <Plus className="w-3 h-3" />
                  <span>${amount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Rate Trend badge */}
          <div className={`${themeClasses.subCardBg} p-3.5 rounded-2xl border flex items-center justify-between text-xs sm:text-sm`}>
            <div className="flex items-center gap-3.5">
              <div className={`p-1.5 rounded-lg ${activeRateObj.isUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                {activeRateObj.isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </div>
              <div className="text-left">
                <span className={`font-bold ${themeClasses.textPrimary} block leading-tight`}>Variación Diaria</span>
                <span className={`text-[10px] ${themeClasses.textMuted} font-medium`}>Mercado en vivo de Venezuela</span>
              </div>
            </div>
            
            <div className="text-right font-mono font-semibold">
              <span className={`block font-bold ${activeRateObj.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                {activeRateObj.isUp ? '+' : ''}{activeRateObj.changeAbsolute.toLocaleString('es-VE', { minimumFractionDigits: 2 })} Bs
              </span>
              <span className={`text-[10px] font-bold block ${activeRateObj.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                ({activeRateObj.isUp ? '+' : ''}{activeRateObj.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>

          {/* Calculation Actions (Save conversion) */}
          <div className="pt-1">
            <button
              onClick={handleSaveToHistory}
              className={`w-full ${themeClasses.buttonBg} ${themeClasses.buttonText} rounded-xl py-3.5 text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-md`}
            >
              <Plus className="w-4.5 h-4.5" />
              <span>Guardar Informe de Conversión</span>
            </button>
          </div>

        </section>

        {/* Date / Historical Rates Center Bar below calculator */}
        <section className={`${themeClasses.cardBg} rounded-2xl p-4 flex flex-col space-y-3 shadow-md border ${themeClasses.borderColor}`}>
          
          <div className="flex items-center justify-between gap-2 w-full">
            {/* Custom Interactive Date Button */}
            <div className={`relative flex items-center gap-2 ${themeClasses.inputBg} hover:opacity-90 rounded-xl px-3.5 py-2.5 border ${themeClasses.borderColor} transition-all flex-1 cursor-pointer`}>
              <Calendar className={`w-4 h-4 ${themeClasses.accentText} shrink-0`} />
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full text-xs"
                max="2026-12-31"
                min="2024-01-01"
              />
              <div className="flex flex-col text-left overflow-hidden">
                <span className={`text-[11px] font-extrabold ${themeClasses.textPrimary} select-none truncate`}>
                  {formatDateSpanish(selectedDate)}
                </span>
                <span className={`text-[9px] ${themeClasses.accentText} font-bold`}>
                  Toca para cambiar día/mes
                </span>
              </div>
            </div>

            {/* Historical Rates Center Trigger Button */}
            <button 
              onClick={() => setIsHistoricalRatesOpen(true)}
              className="p-2.5 bg-yellow-400 hover:bg-yellow-500 text-neutral-950 rounded-xl transition-all font-black text-xs flex items-center gap-1.5 shadow-xs active:scale-95 shrink-0"
              title="Abrir Historial de Tasas y Gráficos"
              id="btn-open-history-rates"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Historial</span>
            </button>

            {/* Quick calculations history icon link */}
            <button 
              onClick={() => setIsHistoryOpen(true)}
              className={`p-2.5 ${themeClasses.iconBtnBg} rounded-xl border transition-all relative shadow-xs active:scale-95 shrink-0`}
              title="Cálculos Guardados"
            >
              <History className={`w-4 h-4 ${themeClasses.accentText}`} />
              {history.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-mono text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {history.length}
                </span>
              )}
            </button>
          </div>

          {/* Brecha / History Quick Link Banner */}
          <div 
            onClick={() => setIsHistoricalRatesOpen(true)}
            className={`cursor-pointer ${themeClasses.subCardBg} hover:border-yellow-400/50 p-2.5 rounded-xl border transition-all flex items-center justify-between group`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className={`text-xs font-bold ${themeClasses.textPrimary}`}>
                Brecha Cambiaria: <strong className={themeClasses.accentText}>{computedBrecha}%</strong>
              </span>
            </div>
            <span className={`text-[10px] font-extrabold ${themeClasses.accentText} flex items-center gap-1 group-hover:translate-x-0.5 transition-transform`}>
              <span>Ver evolución</span>
              <span>➔</span>
            </span>
          </div>
        </section>

        {/* Dynamic Interactive trend-chart linking to full historical analysis */}
        <section 
          onClick={() => setIsHistoricalRatesOpen(true)}
          className={`cursor-pointer ${themeClasses.cardBg} hover:border-yellow-400/60 rounded-2xl p-4.5 border ${themeClasses.borderColor} space-y-3 shadow-md transition-all group`}
        >
          <div className="flex items-center justify-between">
            <h4 className={`text-xs font-bold ${themeClasses.textSecondary} uppercase tracking-widest flex items-center gap-1.5`}>
              <TrendingUp className={`w-4 h-4 ${themeClasses.accentText}`} />
              <span>Rendimiento y Tendencia (Bs)</span>
            </h4>
            <span className={`text-[9px] ${themeClasses.accentBg} ${themeClasses.accentText} font-bold px-2 py-0.5 rounded border ${themeClasses.accentBorder} group-hover:bg-yellow-400 group-hover:text-neutral-950 transition-colors`}>
              Ver Histórico Completo ↗
            </span>
          </div>

          <div className="h-20 w-full relative pt-2">
            <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0 80 Q 80 50, 160 65 T 320 20 T 400 35"
                fill="none"
                stroke={isLight ? '#d97706' : '#FACC15'}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M0 80 Q 80 50, 160 65 T 320 20 T 400 35 L 400 100 L 0 100 Z"
                fill="url(#trend-gradient)"
                opacity={isLight ? '0.1' : '0.2'}
              />
              <defs>
                <linearGradient id="trend-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={isLight ? '#d97706' : '#FACC15'} />
                  <stop offset="100%" stopColor={isLight ? '#ffffff' : '#090909'} />
                </linearGradient>
              </defs>

              <circle cx="160" cy="65" r="4" fill="#FACC15" className="animate-ping" />
              <circle cx="160" cy="65" r="3.5" fill={isLight ? '#ffffff' : '#090909'} stroke="#FACC15" strokeWidth="2" />

              <circle cx="320" cy="20" r="4" fill="#22C55E" className="animate-ping" />
              <circle cx="320" cy="20" r="3.5" fill={isLight ? '#ffffff' : '#090909'} stroke="#22C55E" strokeWidth="2" />
            </svg>
            
            <div className={`flex justify-between text-[8px] ${themeClasses.textMuted} font-bold font-mono px-1`}>
              <span>Lunes</span>
              <span>Miércoles</span>
              <span>Viernes (Hoy)</span>
            </div>
          </div>
        </section>

      </main>

      {/* FLOATING ACTION ICON BUTTON (Rates Sheet) - Positioned safely above the Sticky Banner */}
      <div className="fixed bottom-[86px] sm:bottom-[90px] right-4 sm:right-6 z-30">
        <button 
          onClick={() => setIsRatesSheetOpen(true)}
          className="w-13 h-13 sm:w-14 sm:h-14 bg-yellow-400 hover:bg-yellow-500 text-neutral-950 rounded-full shadow-2xl border-2 border-white dark:border-zinc-900 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none"
          title="Lista Completa / Monedas"
          id="float-btn-list"
        >
          <List className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Google AdSense Official Sticky Bottom Banner (Fixed parent-bottom, z-35, always visible during scroll) */}
      <AdSenseBanner themeClasses={themeClasses} isLight={isLight} isSticky={true} />

      {/* ==================== OVERLAYS & MODALS ==================== */}

      {/* Drawer Sidebar Menu Wrapper */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className={`absolute inset-y-0 left-0 max-w-xs w-full ${themeClasses.drawerBg} shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-slide-right border-r`}>
            <div className="space-y-6">
              
              {/* Header inside drawer */}
              <div className={`flex items-center justify-between pb-4 border-b ${themeClasses.borderColor}`}>
                <div className="flex items-center gap-2">
                  {renderLogo('small')}
                  <span className={`font-display font-black text-lg ${themeClasses.textPrimary}`}>
                    {appName}
                  </span>
                </div>
                
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className={`p-1.5 rounded-lg ${themeClasses.iconBtnBg} ${themeClasses.textSecondary} active:scale-90`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar Menu Item List */}
              <nav className="space-y-2">
                <button
                  onClick={() => { setIsDrawerOpen(false); setIsRatesSheetOpen(true); }}
                  className={`w-full text-left font-bold ${themeClasses.textPrimary} rounded-xl py-3 px-4 flex items-center gap-3 transition-colors ${isLight ? 'hover:bg-zinc-100' : 'hover:bg-zinc-900'}`}
                >
                  <List className={`w-5 h-5 ${themeClasses.accentText}`} />
                  <span>Calculadora de Tasas</span>
                </button>

                <button
                  onClick={() => { setIsDrawerOpen(false); setIsHistoricalRatesOpen(true); }}
                  className={`w-full text-left font-bold ${themeClasses.textPrimary} rounded-xl py-3 px-4 flex items-center justify-between transition-colors ${isLight ? 'hover:bg-zinc-100' : 'hover:bg-zinc-900'}`}
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className={`w-5 h-5 ${themeClasses.accentText}`} />
                    <span>Historial de Tasas (Días y Meses)</span>
                  </div>
                  <span className="text-[9px] bg-yellow-400 text-neutral-950 font-black px-1.5 py-0.5 rounded">
                    Real
                  </span>
                </button>
                
                <button
                  onClick={() => { setIsDrawerOpen(false); setActiveRateId('bcv'); }}
                  className={`w-full text-left font-semibold rounded-xl py-3 px-4 flex items-center justify-between transition-colors ${activeRateId === 'bcv' ? (isLight ? 'bg-zinc-100 font-bold' : 'bg-zinc-900 font-bold') : (isLight ? 'hover:bg-zinc-50' : 'hover:bg-zinc-950')}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className={themeClasses.textPrimary}>Tasas BCV Oficial</span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${themeClasses.textSecondary}`}>
                    {rates.find(r => r.id === 'bcv')?.rate.toFixed(2)}
                  </span>
                </button>

                <button
                  onClick={() => { setIsDrawerOpen(false); setActiveRateId('usdt'); }}
                  className={`w-full text-left font-semibold rounded-xl py-3 px-4 flex items-center justify-between transition-colors ${activeRateId === 'usdt' ? (isLight ? 'bg-zinc-100 font-bold' : 'bg-zinc-900 font-bold') : (isLight ? 'hover:bg-zinc-50' : 'hover:bg-zinc-950')}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className={themeClasses.textPrimary}>Tasas USDT Binance</span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${themeClasses.textSecondary}`}>
                    {rates.find(r => r.id === 'usdt')?.rate.toFixed(2)}
                  </span>
                </button>

                {/* PWA / INSTALL SHORTCUT BUTTON */}
                {!isStandaloneApp && (
                  <button
                    onClick={() => { setIsDrawerOpen(false); handleInstallApp(); }}
                    className={`w-full text-left font-bold ${themeClasses.textPrimary} rounded-xl py-3 px-4 flex items-center justify-between transition-colors ${isLight ? 'bg-amber-50 hover:bg-amber-100/70 border border-amber-200' : 'bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-yellow-400" />
                      <div>
                        <span className="block text-sm leading-tight">Instalar Aplicación</span>
                        <span className={`text-[10.5px] font-normal ${themeClasses.textSecondary} block`}>Acceso directo en inicio</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-yellow-400 text-neutral-950 flex items-center gap-1 shadow-2xs">
                      <Download className="w-2.5 h-2.5" />
                      <span>Instalar</span>
                    </span>
                  </button>
                )}

                {/* THEME SWITCHER ITEM INSIDE DRAWER */}
                <button
                  onClick={() => { toggleThemeMode(); setIsDrawerOpen(false); }}
                  className={`w-full text-left font-bold ${themeClasses.textPrimary} rounded-xl py-3 px-4 flex items-center justify-between transition-colors ${isLight ? 'hover:bg-zinc-100' : 'hover:bg-zinc-900'}`}
                >
                  <div className="flex items-center gap-3">
                    {isLight ? (
                      <Moon className="w-5 h-5 text-zinc-700" />
                    ) : (
                      <Sun className="w-5 h-5 text-yellow-400" />
                    )}
                    <span>{isLight ? 'Activar Modo Oscuro' : 'Activar Modo Claro'}</span>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${themeClasses.accentBg} ${themeClasses.accentText} border ${themeClasses.accentBorder}`}>
                    {isLight ? 'Claro' : 'Oscuro'}
                  </span>
                </button>

                <button
                  onClick={() => { setIsDrawerOpen(false); setIsConfigOpen(true); }}
                  className={`w-full text-left font-bold ${themeClasses.textPrimary} rounded-xl py-3 px-4 flex items-center gap-3 transition-colors ${isLight ? 'hover:bg-zinc-100' : 'hover:bg-zinc-900'}`}
                >
                  <Settings className={`w-5 h-5 ${themeClasses.accentText}`} />
                  <span>Configuración y Diseño</span>
                </button>

                <button
                  onClick={() => { setIsDrawerOpen(false); setIsHistoryOpen(true); }}
                  className={`w-full text-left font-bold ${themeClasses.textPrimary} rounded-xl py-3 px-4 flex items-center gap-3 transition-colors ${isLight ? 'hover:bg-zinc-100' : 'hover:bg-zinc-900'}`}
                >
                  <History className={`w-5 h-5 ${themeClasses.accentText}`} />
                  <span>Reportes locales</span>
                </button>
              </nav>

              <div className={`p-4 ${themeClasses.subCardBg} rounded-2xl border space-y-2 mt-4 text-xs`}>
                <span className={`font-bold ${themeClasses.textPrimary} flex items-center gap-1`}>
                  <Info className={`w-3.5 h-3.5 ${themeClasses.accentText}`} />
                  ¿Cómo funciona el recargo?
                </span>
                <p className={`${themeClasses.textSecondary} leading-relaxed font-medium`}>
                  Los perfiles de pago calculan automáticamente el margen o impuesto transaccional de comercios de forma exacta.
                </p>
              </div>

            </div>

            {/* Bottom Obtener Premium banner */}
            <div className={`mt-8 pt-4 border-t ${themeClasses.borderColor} space-y-3.5`}>
              <div className="space-y-1">
                <h6 className={`font-bold text-xs ${themeClasses.accentText}`}>Desbloquea funciones exclusivas</h6>
                <p className={`text-[10px] ${themeClasses.textSecondary}`}>Sin publicidad para siempre, widgets dinámicos y exportaciones avanzadas.</p>
              </div>
              
              <button 
                onClick={() => {
                  setPremiumActive(!premiumActive);
                  showToast(premiumActive ? 'Premium desactivado temporalmente' : '👑 ¡Gracias por tu compra Premium!');
                  setIsDrawerOpen(false);
                }}
                className={`w-full font-black text-center text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md ${premiumActive ? `${themeClasses.subCardBg} ${themeClasses.accentText} border` : 'bg-yellow-400 hover:bg-yellow-500 text-neutral-950'}`}
              >
                <Sparkles className="w-4 h-4 text-neutral-900" />
                <span>{premiumActive ? 'Premium Activo ✓' : 'Obtener Premium'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Exchange Rates Overview bottom sheet ("Monedas") */}
      {isRatesSheetOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 pointer-events-auto"
            onClick={() => setIsRatesSheetOpen(false)}
          />

          <div className={`absolute max-w-md w-full ${themeClasses.sheetBg} rounded-t-[2.5rem] shadow-2xl p-6 border-t-2 z-10 transition-transform duration-300 ease-out max-h-[85vh] overflow-y-auto flex flex-col`}>
            
            <div className={`w-12 h-1.5 ${isLight ? 'bg-zinc-300' : 'bg-zinc-800'} rounded-full mx-auto mb-4 cursor-pointer`} onClick={() => setIsRatesSheetOpen(false)} />

            <div className="flex items-center justify-between pb-3">
              <div className="space-y-0.5">
                <h2 className={`font-display font-black text-2xl ${themeClasses.textPrimary}`}>
                  Monedas
                </h2>
                <p className={`${themeClasses.textSecondary} text-xs font-semibold`}>
                  {formatDateSpanish(selectedDate)}
                </p>
              </div>

              <button 
                onClick={handleRefresh}
                className={`p-2.5 ${themeClasses.iconBtnBg} rounded-xl transition-all border ${isSpinning ? 'animate-spin' : ''}`}
                title="Actualizar Cotizaciones"
              >
                <RefreshCw className={`w-4 h-4 ${themeClasses.accentText}`} />
              </button>
            </div>

            {/* Brecha banner */}
            <div className={`${themeClasses.subCardBg} rounded-2xl p-4 flex items-center justify-between mb-4 border shadow-xs`}>
              <div className="space-y-0.5">
                <span className={`text-[10px] ${themeClasses.textMuted} font-extrabold uppercase tracking-widest block`}>Diferencia Arbitraje</span>
                <span className={`font-bold text-xs sm:text-sm ${themeClasses.accentText}`}>Brecha (Dólar/USDT):</span>
              </div>
              <span className={`font-mono text-base font-black ${themeClasses.accentText} ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'} px-3 py-1 rounded-xl border`}>
                {computedBrecha}%
              </span>
            </div>

            {/* Rates Table list */}
            <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
              {rates.map((rate) => {
                const isSelected = rate.id === activeRateId;
                return (
                  <div 
                    key={rate.id}
                    onClick={() => {
                      setActiveRateId(rate.id);
                      setIsRatesSheetOpen(false);
                      showToast(`Activada la calculadora con ${rate.name}`);
                    }}
                    className={`group cursor-pointer rounded-2xl p-4 border transition-all flex items-center justify-between select-none hover:scale-102 ${isSelected ? (isLight ? 'bg-amber-50/60 border-amber-400 shadow-sm' : 'bg-zinc-900 border-yellow-400 shadow-sm') : `${themeClasses.subCardBg} ${isLight ? 'hover:bg-zinc-100' : 'hover:bg-zinc-900'}`}`}
                  >
                      <div className="space-y-0.5 max-w-[65%]">
                        <div className="flex items-center gap-1.5">
                          <h3 className={`font-extrabold text-sm ${themeClasses.textPrimary}`}>{rate.name}</h3>
                          {isSelected && (
                            <span className="bg-yellow-400 text-neutral-950 text-[9px] px-1.5 py-0.5 rounded font-black">En Calculadora</span>
                          )}
                        </div>
                        <p className={`text-[10px] ${themeClasses.textSecondary} truncate leading-tight`}>{rate.tagline}</p>
                      </div>

                      <div className="text-right font-mono flex flex-col justify-center">
                        <span className={`font-black text-sm ${themeClasses.accentText}`}>
                          {rate.rate.toLocaleString('es-VE', { minimumFractionDigits: 2 })} Bs
                        </span>
                        
                        {rate.id !== 'personalizada' && (
                          <span className={`text-[10px] font-bold ${rate.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                            {rate.isUp ? '↑' : '↓'} {rate.changePercent > 0 ? '+' : ''}{rate.changePercent}% ({rate.isUp ? '+' : ''}{rate.changeAbsolute.toFixed(2)} Bs)
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Historical rates and custom rate actions inside Sheet */}
            <div className={`mt-4 pt-3 border-t ${themeClasses.borderColor} space-y-2`}>
              <button
                onClick={() => {
                  setIsRatesSheetOpen(false);
                  setIsHistoricalRatesOpen(true);
                }}
                className={`w-full font-black text-xs ${themeClasses.accentText} py-3 rounded-xl ${themeClasses.subCardBg} border text-center flex items-center justify-center gap-2 active:scale-95 shadow-xs`}
              >
                <BarChart3 className="w-4 h-4 text-yellow-400" />
                <span>Ver Historial y Gráficos (Días y Meses)</span>
              </button>

              <button
                onClick={() => {
                  setIsRatesSheetOpen(false);
                  setIsConfigOpen(true);
                }}
                className={`w-full font-bold text-xs ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} py-2 rounded-xl text-center flex items-center justify-center gap-1.5 transition-colors`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Configurar Tasa Personalizada</span>
              </button>
            </div>

            {/* Close actions at bottom of sheet */}
            <div className="mt-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsRatesSheetOpen(false)}
                  className={`font-bold text-xs py-3 rounded-xl transition-all active:scale-95 text-center border ${themeClasses.iconBtnBg}`}
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setIsRatesSheetOpen(false);
                    setIsShareOpen(true);
                  }}
                  className="bg-yellow-400 hover:bg-yellow-500 text-neutral-950 font-black text-xs py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1 shadow-md"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Receipt generator Modal popup */}
      {isReceiptOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs pointer-events-auto" onClick={() => setIsReceiptOpen(false)} />
          
          <div className={`relative ${isLight ? 'bg-white border-yellow-400' : 'bg-[#141413] border-yellow-400'} max-w-xs w-full rounded-[2rem] shadow-2xl p-6 border-4 overflow-hidden space-y-5 animate-scale-up z-10 flex flex-col justify-between ${themeClasses.textPrimary}`}>
            
            <div className="absolute top-0 inset-x-0 h-4 bg-yellow-400 flex items-center justify-center overflow-hidden">
              <div className="flex gap-1.5">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 ${isLight ? 'bg-white' : 'bg-[#141413]'} rotate-45 transform translate-y-1.5`} />
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-3">
              <div className="text-center space-y-1">
                <span className="font-display font-black tracking-widest text-lg text-yellow-500 uppercase">Boleta de Cambio</span>
                <p className={`text-[10px] ${themeClasses.textMuted} font-bold font-mono`}>ID: AL-{Math.floor(Math.random() * 900000 + 100000)}</p>
              </div>

              <div className={`flex flex-col items-center justify-center space-y-1 ${themeClasses.subCardBg} p-2 rounded-xl border`}>
                <div className="h-7 w-44 flex gap-1 items-center justify-center">
                  {[...Array(24)].map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-yellow-400 h-full rounded-2xs" 
                      style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px` }} 
                    />
                  ))}
                </div>
                <span className="text-[8px] font-bold font-mono tracking-widest text-yellow-500 uppercase">ALCAMBIO*2026</span>
              </div>

              <div className={`space-y-3.5 divide-y divide-dotted ${themeClasses.borderColor} text-sm`}>
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className={`${themeClasses.textSecondary} font-semibold`}>Tasa Activa</span>
                  <span className={`font-bold ${themeClasses.textPrimary} font-display`}>{activeRateObj.name}</span>
                </div>
                
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className={`${themeClasses.textSecondary} font-semibold`}>Precio Base</span>
                  <span className={`font-mono font-bold ${themeClasses.accentText}`}>{activeRateWithFee.toFixed(2)} Bs/$</span>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className={`${themeClasses.textSecondary} font-semibold`}>Monto Divisa</span>
                  <span className={`font-sans font-black text-sm ${themeClasses.textPrimary}`}>${parseFloat(usdVal).toFixed(2)} USD</span>
                </div>

                <div className="pt-2 flex justify-between items-start text-xs">
                  <span className={`${themeClasses.textSecondary} font-semibold leading-normal`}>Bolívares Totales</span>
                  <div className="text-right">
                    <span className={`font-sans font-black text-base ${themeClasses.accentText} block`}>Bs. {bsVal}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between items-center text-[10px]">
                  <span className={`${themeClasses.textMuted} font-semibold`}>Fecha de Emisión</span>
                  <span className={`font-semibold ${themeClasses.textSecondary}`}>{formatDateSpanish(selectedDate)}</span>
                </div>
              </div>

              <p className="text-[10px] text-yellow-500 font-bold text-center italic mt-2">
                "¡Gracias por consultar en {appName}!"
              </p>
            </div>

            <div className="space-y-2 mt-2">
              <button
                onClick={() => {
                  const receiptText = `*${appName} - Boleta*\nTasa: ${activeRateObj.name}\nConversión: $${parseFloat(usdVal).toFixed(2)} -> Bs. ${bsVal}\nEmisión: ${formatDateSpanish(selectedDate)}`;
                  navigator.clipboard.writeText(receiptText);
                  showToast('¡Datos de la boleta copiados!');
                  setIsReceiptOpen(false);
                }}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-950 text-xs font-black py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Datos del Reporte</span>
              </button>

              <button
                onClick={() => setIsReceiptOpen(false)}
                className={`w-full ${themeClasses.iconBtnBg} text-xs font-bold py-2.5 rounded-xl transition-all text-center border`}
              >
                Listo
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Custom rate & Theme Configuration Modal (Settings) */}
      {isConfigOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs pointer-events-auto" onClick={() => setIsConfigOpen(false)} />
          
          <div className={`relative ${themeClasses.modalBg} max-w-sm w-full rounded-2xl p-5 border ${themeClasses.borderColor} shadow-2xl space-y-4 z-10 ${themeClasses.textPrimary} max-h-[90vh] overflow-y-auto`}>
            <div className={`flex items-center justify-between pb-2 border-b ${themeClasses.borderColor}`}>
              <h3 className={`font-display font-black text-xl ${themeClasses.textPrimary} flex items-center gap-1.5`}>
                <Settings className={`w-5 h-5 ${themeClasses.accentText}`} />
                <span>Diseño y Configuración</span>
              </h3>
              <button onClick={() => setIsConfigOpen(false)} className={`p-1 rounded-lg ${themeClasses.iconBtnBg}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              
              {/* THEME MODE TOGGLE (CLARO / OSCURO) */}
              <div className="space-y-2">
                <label className={`text-xs font-extrabold ${themeClasses.textSecondary} block pb-1`}>Modo de Tema</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setThemeMode('light');
                      showToast('☀️ Modo Claro activado');
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all font-bold text-xs ${
                      isLight 
                        ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-sm' 
                        : `${themeClasses.inputBg} ${themeClasses.textSecondary} border-zinc-800`
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span>Modo Claro</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setThemeMode('dark');
                      showToast('🌙 Modo Oscuro activado');
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all font-bold text-xs ${
                      !isLight 
                        ? 'bg-zinc-800 text-yellow-400 border-yellow-400 shadow-sm' 
                        : `${themeClasses.inputBg} ${themeClasses.textSecondary} border-zinc-200`
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    <span>Modo Oscuro</span>
                  </button>
                </div>
              </div>

              {/* BRAND NAME CONFIG */}
              <div className="space-y-1">
                <label className={`text-xs font-extrabold ${themeClasses.textSecondary} block pb-1`}>Nombre de la Aplicación (Branding)</label>
                <div className={`relative flex items-center ${themeClasses.inputBg} rounded-xl border ${themeClasses.borderColor} px-3 py-2`}>
                  <input
                    type="text"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="Monitor VE"
                    className={`bg-transparent font-sans font-bold ${themeClasses.textPrimary} outline-none w-full border-none p-0 focus:ring-0 text-sm`}
                  />
                </div>
              </div>

              {/* LOGO ICON SELECTION */}
              <div className="space-y-2">
                <label className={`text-xs font-extrabold ${themeClasses.textSecondary} block pb-1`}>Diseño del Logo Oficial</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'tricolor', name: 'Tricolor' },
                    { id: 'star', name: 'Estrella' },
                    { id: 'shield', name: 'Escudo' },
                    { id: 'zap', name: 'Relámpago' },
                    { id: 'globe', name: 'Red' },
                    { id: 'coins', name: 'Monedas' },
                  ].map((logoOpt) => {
                    const isLogoSelected = logoOpt.id === selectedLogoId;
                    return (
                      <button
                        key={logoOpt.id}
                        type="button"
                        onClick={() => {
                          setSelectedLogoId(logoOpt.id as any);
                          showToast(`Emblema cambiado a ${logoOpt.name}`);
                        }}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all outline-none text-center ${
                          isLogoSelected
                            ? `${themeClasses.accentBg} ${themeClasses.accentBorder} ${themeClasses.accentText} font-bold`
                            : `${themeClasses.inputBg} ${themeClasses.borderColor} ${themeClasses.textSecondary}`
                        }`}
                      >
                        {logoOpt.id === 'star' && <Star className="w-4 h-4 fill-current text-yellow-400" />}
                        {logoOpt.id === 'shield' && <Shield className="w-4 h-4 text-yellow-500" />}
                        {logoOpt.id === 'zap' && <Zap className="w-4 h-4 fill-current text-yellow-400" />}
                        {logoOpt.id === 'globe' && <Globe className="w-4 h-4 text-yellow-500" />}
                        {logoOpt.id === 'coins' && <Coins className="w-4 h-4 text-yellow-400" />}
                        {logoOpt.id === 'tricolor' && (
                          <div className="w-5 h-5 relative flex items-center justify-center shrink-0">
                            <svg className="w-full h-full relative" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10.5" stroke="#FACC15" strokeWidth="1" className="fill-zinc-950" />
                              <path d="M 4 11 C 8 8, 16 14, 20 11 L 20 13 C 16 16, 8 10, 4 13 Z" fill="#FACC15" />
                              <path d="M 4 13 C 8 10, 16 16, 20 13 L 20 15 C 16 18, 8 12, 4 15 Z" fill="#2563EB" />
                              <path d="M 4 15 C 8 12, 16 18, 20 15 L 20 17 C 16 20, 8 14, 4 17 Z" fill="#DC2626" />
                              <text x="12" y="13" fill="#FDE047" fontSize="10.5" fontWeight="950" fontFamily="sans-serif" textAnchor="middle" dominantBaseline="middle">$</text>
                            </svg>
                          </div>
                        )}
                        <span className="text-[8.5px] tracking-tight">{logoOpt.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CUSTOM RATE */}
              <div className="space-y-1">
                <label className={`text-xs font-extrabold ${themeClasses.textSecondary} block pb-1`}>Establecer Tasa Personalizada (Bs/$)</label>
                <div className={`relative flex items-center ${themeClasses.inputBg} rounded-xl border ${themeClasses.borderColor} px-3 py-2`}>
                  <span className={`${themeClasses.accentText} font-bold mr-2 text-sm`}>Bs.</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={tempCustomRate}
                    onChange={(e) => setTempCustomRate(e.target.value)}
                    placeholder="580.00"
                    className={`bg-transparent font-mono font-bold ${themeClasses.textPrimary} outline-none w-full border-none p-0 focus:ring-0 text-sm`}
                  />
                </div>
              </div>

              {/* BRAND SKIN THEME SELECTOR */}
              <div className="space-y-2">
                <label className={`text-xs font-extrabold ${themeClasses.textSecondary} block pb-1`}>Paleta de Color (Skins)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'obsidian', name: 'Oro Clásico' },
                    { id: 'fintech-mint', name: 'Menta Fintech' },
                    { id: 'cosmic-lavender', name: 'Lila Cósmico' },
                  ].map((themeOpt) => {
                    const isThemeSelected = themeOpt.id === appTheme;
                    return (
                      <button
                        key={themeOpt.id}
                        type="button"
                        onClick={() => {
                          setAppTheme(themeOpt.id as any);
                          showToast(`Paleta cambiada a ${themeOpt.name}`);
                        }}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center text-xs font-bold leading-none ${
                          isThemeSelected
                            ? `${themeClasses.accentBg} ${themeClasses.accentBorder} ${themeClasses.accentText}`
                            : `${themeClasses.inputBg} ${themeClasses.borderColor} ${themeClasses.textSecondary}`
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${
                          themeOpt.id === 'obsidian' ? 'bg-amber-400' :
                          themeOpt.id === 'fintech-mint' ? 'bg-emerald-400' : 'bg-violet-400'
                        }`} />
                        <span className="text-[9.5px] mt-0.5 whitespace-nowrap">{themeOpt.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => setIsConfigOpen(false)}
                className={`font-bold text-xs py-2.5 rounded-xl transition-all border ${themeClasses.iconBtnBg}`}
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCustomRate}
                className="bg-yellow-400 hover:bg-yellow-500 text-neutral-950 font-black text-xs py-2.5 rounded-xl transition-all shadow-sm"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calculation history drawer */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs pointer-events-auto" onClick={() => setIsHistoryOpen(false)} />
          
          <div className={`relative ${themeClasses.modalBg} max-w-sm w-full rounded-2xl p-5 border ${themeClasses.borderColor} shadow-2xl space-y-3.5 z-10 max-h-[80vh] overflow-y-auto flex flex-col ${themeClasses.textPrimary}`}>
            <div className={`flex items-center justify-between pb-2 border-b ${themeClasses.borderColor}`}>
              <h3 className={`font-display font-black text-lg ${themeClasses.textPrimary} flex items-center gap-1.5`}>
                <BookOpen className={`w-5 h-5 ${themeClasses.accentText}`} />
                <span>Modelos Guardados</span>
              </h3>
              <button onClick={() => setIsHistoryOpen(false)} className={`p-1 rounded-lg ${themeClasses.iconBtnBg}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 min-h-[200px]">
              {history.length === 0 ? (
                <div className={`flex flex-col items-center justify-center text-center p-6 h-full space-y-3 ${themeClasses.subCardBg} rounded-xl border`}>
                  <div className={`p-3 ${themeClasses.iconBtnBg} rounded-full border`}>
                    <History className={`w-6 h-6 ${themeClasses.accentText}`} />
                  </div>
                  <div className="space-y-1">
                    <span className={`font-bold text-xs ${themeClasses.textPrimary} block`}>No hay reportes todavía</span>
                    <p className={`text-[10px] ${themeClasses.textSecondary} leading-normal font-semibold`}>Toca "Guardar Reporte" en la calculadora para almacenar cálculos de cambio frecuentes.</p>
                  </div>
                </div>
              ) : (
                history.map((item) => (
                  <div key={item.id} className={`${themeClasses.subCardBg} rounded-xl p-3 border shadow-2xs space-y-2 text-xs relative group`}>
                    <button 
                      onClick={() => setHistory(history.filter(h => h.id !== item.id))}
                      className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 transition-colors p-1"
                      title="Eliminar"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    
                    <div className="flex justify-between items-start pr-4">
                      <div>
                        <span className={`font-bold text-xs ${themeClasses.textPrimary} block`}>{item.rateName}</span>
                        <span className={`text-[9px] ${themeClasses.textMuted} block font-mono`}>{item.timestamp}</span>
                      </div>
                      <span className={`font-mono text-[10px] ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'} px-2 py-0.5 rounded border ${themeClasses.accentText} font-bold`}>
                        tasa: {item.rateValue.toFixed(2)}
                      </span>
                    </div>

                    <div className={`grid grid-cols-2 gap-2 text-[10px] ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'} p-2 rounded-lg font-semibold border`}>
                      <div>
                        <span className={`${themeClasses.textMuted} block text-[9px] tracking-wide uppercase`}>Monto USD</span>
                        <span className={`font-black ${themeClasses.textPrimary}`}>${item.usdAmount.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className={`${themeClasses.textMuted} block text-[9px] tracking-wide uppercase`}>Monto Bs</span>
                        <span className={`font-black ${themeClasses.accentText}`}>Bs. {item.bsAmount.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {history.length > 0 && (
              <button
                onClick={() => {
                  setHistory([]);
                  showToast('Historial local vaciado completamente');
                }}
                className="w-full bg-red-500/10 text-red-500 font-bold text-xs py-2 rounded-xl transition-all border border-red-500/20 hover:bg-red-500/20 text-center"
              >
                Vaciar Todo
              </button>
            )}

            <button
              onClick={() => setIsHistoryOpen(false)}
              className={`w-full ${themeClasses.iconBtnBg} font-bold text-xs py-2.5 rounded-xl transition-all border`}
            >
              Volver
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Share Modal with QR Code */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        appName={appName}
        rates={rates}
        activeRateWithFee={activeRateWithFee}
        usdVal={usdVal}
        bsVal={bsVal}
        selectedDate={selectedDate}
        themeClasses={themeClasses}
        isLight={isLight}
        showToast={showToast}
      />

      {/* Powerful & Realistic Historical Rates Center Modal */}
      <HistoricalRatesModal
        isOpen={isHistoricalRatesOpen}
        onClose={() => setIsHistoricalRatesOpen(false)}
        onSelectRateForCalculator={handleSelectHistoricalRateForCalculator}
        themeClasses={themeClasses}
        isLight={isLight}
        appName={appName}
        currentRates={rates}
        showToast={showToast}
      />

      {/* Aesthetic footer */}
      <footer className={`text-center text-[10px] ${themeClasses.textMuted} font-mono tracking-widest uppercase mt-8 select-none`}>
        <span>{appName} • 2026</span>
      </footer>

    </div>
  );
}
