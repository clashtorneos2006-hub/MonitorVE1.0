export interface ExchangeRate {
  id: 'bcv' | 'euro' | 'usdt' | 'personalizada';
  name: string;
  symbol: string;
  rate: number;
  changePercent: number;
  changeAbsolute: number;
  isUp: boolean;
  tagline?: string;
}

export interface PaymentProfile {
  id: string;
  name: string;
  description: string;
  feePercent: number;
  bankName?: string;
  isActive: boolean;
}

export interface CalculationHistory {
  id: string;
  timestamp: string;
  rateName: string;
  rateValue: number;
  usdAmount: number;
  bsAmount: number;
}

export interface HistoricalRateEntry {
  date: string; // YYYY-MM-DD
  dateLabel: string; // e.g. "16 Feb 2026"
  dayName: string; // e.g. "Lunes"
  bcv: number;
  euro: number;
  usdt: number;
  bcvChange?: number;
  bcvChangePercent?: number;
  usdtChange?: number;
  usdtChangePercent?: number;
  brechaPercent?: number;
}

export type HistoryTimeframe = '7d' | '30d' | '90d' | '6m' | '1y' | 'all';
