// Google AdMob Official Configuration for Monitor VE
// Configured by Senior Android Developer

export const ADMOB_CONFIG = {
  // Official Application ID (for AndroidManifest.xml and MobileAds.initialize)
  APP_ID: 'ca-app-pub-8691199752535040~6291064809',

  // Official Adaptive Bottom Banner Ad Unit ID
  BANNER_AD_UNIT_ID: 'ca-app-pub-8691199752535040/7699565579',

  // Banner Format & Sizing
  BANNER_SIZE: 'ADAPTIVE_BANNER', // Standard 320x50 / 320x100 / 728x90 adaptive
  POSITION: 'BOTTOM_CENTER',
  MARGIN_BOTTOM: 0,

  // Production state
  IS_TEST_MODE: false,
};

// Global Android Bridge Interface for Hybrid / WebView / Capacitor / Cordova apps
declare global {
  interface Window {
    AndroidBridge?: {
      showBanner?: (adUnitId: string, position?: string) => void;
      hideBanner?: () => void;
      initAdMob?: (appId: string) => void;
    };
    admob?: any;
    Capacitor?: any;
  }
}

/**
 * Initializes Google Mobile Ads SDK if running in Android Native / Hybrid environment
 */
export function initializeMobileAds() {
  if (typeof window === 'undefined') return;

  // 1. Check for Native Android JavaScriptInterface
  if (window.AndroidBridge && typeof window.AndroidBridge.initAdMob === 'function') {
    try {
      window.AndroidBridge.initAdMob(ADMOB_CONFIG.APP_ID);
      window.AndroidBridge.showBanner?.(ADMOB_CONFIG.BANNER_AD_UNIT_ID, ADMOB_CONFIG.POSITION);
      console.log('[AdMob Native] MobileAds initialized with App ID:', ADMOB_CONFIG.APP_ID);
    } catch (e) {
      console.error('[AdMob Native] Error initializing bridge:', e);
    }
  }

  // 2. Check for Cordova / Capacitor AdMob Plugin
  if (window.admob && typeof window.admob.banner?.config === 'function') {
    try {
      window.admob.banner.config({
        id: ADMOB_CONFIG.BANNER_AD_UNIT_ID,
        isTesting: ADMOB_CONFIG.IS_TEST_MODE,
        autoShow: true,
      });
      window.admob.banner.prepare();
    } catch (e) {
      console.error('[AdMob Plugin] Error preparing banner:', e);
    }
  }
}
