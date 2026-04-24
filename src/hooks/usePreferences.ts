import { useState, useEffect } from 'react';

export type ThinkIntensity = 'off' | 'low' | 'medium' | 'high';

export interface Preferences {
  thinkIntensity: ThinkIntensity;
  showThinking: boolean;
}

const DEFAULT_PREFERENCES: Preferences = {
  thinkIntensity: 'medium',
  showThinking: true,
};

const STORAGE_KEY = 'collingua-preferences';

/**
 * Hook for managing user preferences with localStorage persistence
 */
export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
    return DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }, [preferences]);

  const setThinkIntensity = (intensity: ThinkIntensity) => {
    setPreferences((prev) => ({ ...prev, thinkIntensity: intensity }));
  };

  const setShowThinking = (show: boolean) => {
    setPreferences((prev) => ({ ...prev, showThinking: show }));
  };

  return {
    preferences,
    setThinkIntensity,
    setShowThinking,
  };
}
