// Utilities
import { defineStore } from 'pinia'

export type AppLanguage = 'pt' | 'en'

const STORAGE_KEY = 'mamutes:language'

function readStoredLanguage (): AppLanguage {
  if (typeof window === 'undefined') {
    return 'pt'
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'pt') {
      return stored
    }
  } catch {
    // ignore
  }

  return 'pt'
}

function storeLanguage (lang: AppLanguage) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // ignore
  }
}

export const useAppStore = defineStore('app', {
  state: () => ({
    language: readStoredLanguage() as AppLanguage,
  }),

  actions: {
    setLanguage (lang: AppLanguage) {
      this.language = lang
      storeLanguage(lang)
    },
  },
})
