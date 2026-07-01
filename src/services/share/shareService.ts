/**
 * Share Service
 * Handles social sharing, native mobile sharing, and clipboard interactions.
 */

import { SOCIAL_STRINGS } from '@/utils/constants';
import { appConfig } from '@/config/appConfig';

export interface ShareData {
  title: string;
  text: string;
  url: string;
}

export const shareService = {
  /**
   * Main share function. Attempts to use Native Share API, 
   * falls back to clipboard.
   */
  async shareResult(mentalAge: number, shareId: string): Promise<{ success: boolean; method: 'native' | 'clipboard' | 'failed' }> {
    const shareData: ShareData = {
      title: appConfig.name,
      text: SOCIAL_STRINGS.SHARE_MESSAGE(mentalAge),
      url: `${appConfig.url}/results/${shareId}`,
    };

    // 1. Try Native Web Share API (Mobile Browsers)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return { success: true, method: 'native' };
      } catch (error) {
        // If user cancelled, don't treat as failure
        if ((error as Error).name === 'AbortError') {
          return { success: false, method: 'failed' };
        }
        console.error('Native share failed:', error);
      }
    }

    // 2. Fallback: Clipboard
    const copySuccess = await this.copyToClipboard(
      `${shareData.text} Check it out here: ${shareData.url}`
    );

    return { 
      success: copySuccess, 
      method: copySuccess ? 'clipboard' : 'failed' 
    };
  },

  /**
   * Copy text to the device clipboard.
   */
  async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Legacy fallback
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      return false;
    }
  },

  /**
   * Generates a platform-specific intent URL for manual sharing.
   */
  getSocialIntentUrl(platform: 'whatsapp' | 'twitter' | 'facebook', text: string, url: string): string {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    switch (platform) {
      case 'whatsapp':
        return `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      default:
        return '';
    }
  }
};
