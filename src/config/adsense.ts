// Google AdSense Official Configuration for Monitor VE
// Publisher Client ID: ca-pub-8691199752535040

export const ADSENSE_CONFIG = {
  // Official Google AdSense Publisher Client ID
  CLIENT_ID: 'ca-pub-8691199752535040',

  // Official Banner / Display Ad Slot ID
  SLOT_ID: '7699565579',

  // Layout and Display Format
  FORMAT: 'auto',
  FULL_WIDTH_RESPONSIVE: true,
  POSITION: 'BOTTOM_CENTER',
};

// Global Window declaration for Google AdSense adsbygoogle array
declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

/**
 * Pushes and triggers Google AdSense ad slots safely
 */
export function pushAdSenseAd(): void {
  if (typeof window === 'undefined') return;
  try {
    const adsbygoogle = window.adsbygoogle || [];
    adsbygoogle.push({});
  } catch (err) {
    // Google AdSense internal script queue handles gracefully
  }
}
