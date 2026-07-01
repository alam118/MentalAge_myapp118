/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  // AI Configuration
  readonly VITE_OPENROUTER_API_KEY: string;

  // App Configuration
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_URL: string;

  // Monetization (Ad Units)
  readonly VITE_BANNER_AD_UNIT_ID: string;
  readonly VITE_REWARDED_AD_UNIT_ID: string;
  readonly VITE_NATIVE_AD_UNIT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
