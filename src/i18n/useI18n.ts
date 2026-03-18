import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { type MessageKey, messages } from './messages'

export function useI18n () {
  const app = useAppStore()

  const t = (key: MessageKey) => {
    const lang = app.language
    return messages[lang][key] ?? messages.pt[key] ?? String(key)
  }

  const language = computed(() => app.language)

  return { language, t }
}
