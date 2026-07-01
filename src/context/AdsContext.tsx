/**
 * Ads Context
 * Manages the global state for ad visibility, premium status, and rewarded unlocks.
 * Ensures ads never interrupt quiz questions per app requirements.
 */

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { adsConfig } from '@/config/adsConfig';
import { localStorageService } from '@/services/storage/localStorageService';

interface AdsContextType {
  isPremium: boolean;
  adsEnabled: boolean;
  canShowInterstitial: boolean;
  setPremium: (value: boolean) => void;
  recordInterstitialShown: () => void;
  unlockPremiumFeature: (featureKey: string) => void;
  isFeatureUnlocked: (featureKey: string) => boolean;
}

const AdsContext = createContext<AdsContextType | undefined>(undefined);

const PREMIUM_KEY = 'mat_is_premium';
const UNLOCKED_FEATURES_KEY = 'mat_unlocked_features';

export const AdsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState<boolean>(
    () => !!localStorageService.get<boolean>(PREMIUM_KEY)
  );
  const [lastInterstitialTime, setLastInterstitialTime] = useState<number>(0);
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>(
    () => localStorageService.get<string[]>(UNLOCKED_FEATURES_KEY) || []
  );

  const adsEnabled = adsConfig.enabled && !isPremium;

  const canShowInterstitial = (() => {
    if (!adsEnabled) return false;
    const elapsed = (Date.now() - lastInterstitialTime) / 1000;
    return elapsed >= adsConfig.frequency.interstitial_cooldown;
  })();

  const setPremium = useCallback((value: boolean) => {
    setIsPremium(value);
    localStorageService.set(PREMIUM_KEY, value);
  }, []);

  const recordInterstitialShown = useCallback(() => {
    setLastInterstitialTime(Date.now());
  }, []);

  const unlockPremiumFeature = useCallback((featureKey: string) => {
    setUnlockedFeatures((prev) => {
      const updated = Array.from(new Set([...prev, featureKey]));
      localStorageService.set(UNLOCKED_FEATURES_KEY, updated);
      return updated;
    });
  }, []);

  const isFeatureUnlocked = useCallback(
    (featureKey: string) => isPremium || unlockedFeatures.includes(featureKey),
    [isPremium, unlockedFeatures]
  );

  return (
    <AdsContext.Provider
      value={{
        isPremium,
        adsEnabled,
        canShowInterstitial,
        setPremium,
        recordInterstitialShown,
        unlockPremiumFeature,
        isFeatureUnlocked,
      }}
    >
      {children}
    </AdsContext.Provider>
  );
};

export const useAds = () => {
  const context = useContext(AdsContext);
  if (context === undefined) {
    throw new Error('useAds must be used within an AdsProvider');
  }
  return context;
};
