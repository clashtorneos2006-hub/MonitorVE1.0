import { ExchangeRate, PaymentProfile } from '../types';

export const INITIAL_RATES: ExchangeRate[] = [
  {
    id: 'bcv',
    name: 'Dólar BCV',
    symbol: '$',
    rate: 772.54,
    changePercent: 0.38,
    changeAbsolute: 2.93,
    isUp: true,
    tagline: 'Tasa oficial del Banco Central de Venezuela'
  },
  {
    id: 'euro',
    name: 'Euro Oficial',
    symbol: '€',
    rate: 889.45,
    changePercent: 0.42,
    changeAbsolute: 3.72,
    isUp: true,
    tagline: 'Cotización oficial del Euro según el Banco Central de Venezuela'
  },
  {
    id: 'usdt',
    name: 'USDT (Binance P2P)',
    symbol: '₮',
    rate: 965.80,
    changePercent: 0.15,
    changeAbsolute: 1.45,
    isUp: true,
    tagline: 'Tasa de mercado peer-to-peer en Binance USDT'
  },
  {
    id: 'personalizada',
    name: 'Tasa Personalizada',
    symbol: '$',
    rate: 780.00,
    changePercent: 0.00,
    changeAbsolute: 0.00,
    isUp: true,
    tagline: 'Define tu propia tasa de cambio preferida'
  }
];

export const INITIAL_PROFILES: PaymentProfile[] = [
  {
    id: 'standard',
    name: 'Sin Comisión',
    description: 'Conversión directa de tasa pura',
    feePercent: 0,
    isActive: true
  },
  {
    id: 'pago_movil',
    name: 'Pago Móvil (0.3% aprox)',
    description: 'Incluye la comisión bancaria típica por transacciones',
    feePercent: 0.3,
    bankName: 'Mercantil, Banesco, Provincial',
    isActive: false
  },
  {
    id: 'igtf',
    name: 'Impuesto IGTF (3%)',
    description: 'Aplicado a transacciones en divisas en comercios nacionales',
    feePercent: 3.0,
    isActive: false
  },
  {
    id: 'tiendas',
    name: 'Comisión Comercio (5%)',
    description: 'Porcentaje de conversión aplicado por locales comerciales',
    feePercent: 5.0,
    isActive: false
  }
];
