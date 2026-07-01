/**
 * Data Formatters
 * Pure functions to format numbers, strings, and dates for display.
 */

export const formatters = {
  /**
   * Formats a number as a percentage string.
   */
  toPercentage: (value: number, decimals: number = 0): string => {
    return `${value.toFixed(decimals)}%`;
  },

  /**
   * Formats a mental age delta into a human-readable string.
   */
  formatAgeDelta: (delta: number): string => {
    const abs = Math.abs(delta);
    if (abs === 0) return 'Perfectly in sync';
    return delta > 0 ? `${abs} years ahead` : `${abs} years young at heart`;
  },

  /**
   * Formats a category name (e.g., "Decision making") into title case.
   */
  formatCategoryLabel: (category: string): string => {
    return category
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  /**
   * Formats a duration in seconds into a mm:ss string.
   */
  formatDuration: (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  },

  /**
   * Formats a large number with K/M suffixes (e.g., 1500 -> 1.5K).
   */
  formatCompactNumber: (num: number): string => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  },

  /**
   * Truncates a shareId or UUID for display purposes.
   */
  formatShortId: (id: string): string => {
    return id.substring(0, 8).toUpperCase();
  },

  /**
   * Formats gender enum into a display-friendly label.
   */
  formatGenderLabel: (gender?: string): string => {
    const map: Record<string, string> = {
      male: 'Male',
      female: 'Female',
      other: 'Other',
      'prefer-not-to-say': 'Not specified',
    };
    return gender ? map[gender] || 'Not specified' : 'Not specified';
  },
};
