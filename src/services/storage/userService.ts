/**
 * User Service
 * Manages the user's personal profile, session tracking, and preferences.
 * Connects the UI to the underlying local storage persistence.
 */

import { UserProfile, Gender } from '@/types';
import { localStorageService } from './localStorageService';
import { generateId } from '@/utils/helpers';
import { appConfig } from '@/config/appConfig';

export const userService = {
  /**
   * Creates a new user profile.
   * Typically called after the Profile Setup screen.
   */
  createProfile(params: {
    name: string;
    age: number;
    gender?: Gender;
    country?: string;
    language?: string;
  }): UserProfile {
    const { name, age, gender, country, language } = params;

    const newProfile: UserProfile = {
      id: generateId(),
      name: name.trim() || 'Anonymous',
      age: Math.max(1, Math.min(120, age)), // Guard against invalid ages
      gender,
      country,
      preferredLanguage: language || appConfig.defaultLanguage,
      createdAt: Date.now(),
      lastActive: Date.now(),
    };

    localStorageService.saveUserProfile(newProfile);
    
    // If language was provided during setup, persist it globally
    if (language) {
      localStorageService.saveLanguage(language);
    }

    return newProfile;
  },

  /**
   * Retrieves the current user profile from storage.
   */
  getProfile(): UserProfile | null {
    const profile = localStorageService.getUserProfile();
    
    if (profile) {
      // Update last active timestamp on every profile retrieval
      this.updateLastActive(profile);
    }
    
    return profile;
  },

  /**
   * Updates specific fields of the user profile.
   */
  updateProfile(updates: Partial<UserProfile>): UserProfile | null {
    const currentProfile = localStorageService.getUserProfile();
    
    if (!currentProfile) return null;

    const updatedProfile: UserProfile = {
      ...currentProfile,
      ...updates,
      lastActive: Date.now(),
    };

    localStorageService.saveUserProfile(updatedProfile);
    return updatedProfile;
  },

  /**
   * Internal helper to track user engagement.
   */
  private updateLastActive(profile: UserProfile): void {
    const now = Date.now();
    // Only update if at least 5 minutes have passed since last update to save IO
    if (now - profile.lastActive > 5 * 60 * 1000) {
      localStorageService.saveUserProfile({
        ...profile,
        lastActive: now,
      });
    }
  },

  /**
   * Checks if a user profile exists (used for routing logic).
   */
  hasProfile(): boolean {
    return !!localStorageService.getUserProfile();
  },

  /**
   * Checks if the user is a first-time visitor.
   */
  isNewUser(): boolean {
    return !this.hasProfile() && !localStorageService.isOnboardingComplete();
  },

  /**
   * Completely removes the user profile and associated data.
   */
  deleteAccount(): void {
    localStorageService.remove('mat_user_profile');
    localStorageService.remove('mat_onboarding_done');
    localStorageService.clearHistory();
    // We keep language settings for better UX even if the account is cleared
  },

  /**
   * Validates user input for profile creation.
   */
  validateProfileData(name: string, age: number): { isValid: boolean; error?: string } {
    if (!name || name.trim().length < 2) {
      return { isValid: false, error: 'Name must be at least 2 characters long.' };
    }
    if (!age || age < 1 || age > 120) {
      return { isValid: false, error: 'Please enter a valid age.' };
    }
    return { isValid: true };
  }
};
