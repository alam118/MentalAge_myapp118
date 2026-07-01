/**
 * PWA Configuration
 * Detailed settings for the vite-plugin-pwa to ensure high performance
 * and reliable offline behavior on iOS and Android.
 */

import { VitePWAOptions } from 'vite-plugin-pwa';

export const pwaConfig: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'robots.txt'],
  manifest: {
    name: 'Mental Age Test - AI Personality Analyzer',
    short_name: 'Mental Age',
    description: 'Analyze your personality and mental age with AI.',
    theme_color: '#0A0F24',
    background_color: '#0A0F24',
    display: 'standalone',
    orientation: 'portrait',
    icons: [
      {
        src: 'icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  },
  workbox: {
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }
        }
      },
      {
        urlPattern: /^https:\/\/openrouter\.ai\/api\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'ai-api-cache',
          expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 }
        }
      }
    ]
  }
};
