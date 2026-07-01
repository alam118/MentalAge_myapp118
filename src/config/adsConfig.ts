/**
 * Ads Configuration
 * Standardized configuration for monetization placements.
 */

export const adsConfig = {
  enabled: true, // Master toggle
  providers: {
    admob: {
      appId: 'ca-app-pub-xxxxxxxxxxxxxxxx',
      bannerId: import.meta.env.VITE_BANNER_AD_UNIT_ID,
      rewardedId: import.meta.env.VITE_REWARDED_AD_UNIT_ID,
      nativeId: import.meta.env.VITE_NATIVE_AD_UNIT_ID,
    }
  },
  placements: {
    dashboard_bottom: 'banner_main',
    quiz_end_interstitial: 'interstitial_result',
    history_unlocked: 'rewarded_history',
    personality_deep_dive: 'rewarded_ai_detail'
  },
  frequency: {
    interstitial_cooldown: 300, // 5 minutes in seconds
    max_ads_per_session: 10
  }
} as const;
