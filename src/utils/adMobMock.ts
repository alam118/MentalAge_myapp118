/**
 * AdMob Mock Utility
 * Simulates AdMob SDK behavior for web testing and development.
 * Allows testing rewarded flows without a real mobile environment.
 */

import { sleep } from './helpers';

export const adMobMock = {
  /**
   * Simulates showing a rewarded video ad.
   */
  async showRewardedVideo(): Promise<boolean> {
    console.log("[AdMob Mock] Requesting Rewarded Video...");
    await sleep(1500); // Simulate loading
    console.log("[AdMob Mock] Playing Video...");
    await sleep(3000); // Simulate user watching
    console.log("[AdMob Mock] User earned reward.");
    return true;
  },

  /**
   * Simulates an interstitial ad between screens.
   */
  async showInterstitial(): Promise<void> {
    console.log("[AdMob Mock] Showing Interstitial Ad...");
    await sleep(1000);
    console.log("[AdMob Mock] Ad Closed.");
  }
};
