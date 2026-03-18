<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useI18n } from '@/i18n/useI18n'
  import { useAppStore } from '@/stores/app'
  import FlagIcon from './FlagIcon.vue'

  const open = ref(false)
  const app = useAppStore()
  const { t } = useI18n()

  const isPt = computed(() => app.language === 'pt')

  const currentCode = computed(() => (isPt.value ? 'br' : 'us'))
  const nextCode = computed(() => (isPt.value ? 'us' : 'br'))

  function toggleMenu () {
    open.value = !open.value
  }

  function setNextLanguage () {
    app.setLanguage(isPt.value ? 'en' : 'pt')
    open.value = false
  }
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <div class="relative">
      <button
        :aria-label="t('aria.changeLanguage')"
        class="h-12 w-12 rounded-full bg-card border border-border elevation-2 flex items-center justify-center hover:bg-muted/60 transition-colors"
        type="button"
        @click="toggleMenu"
      >
        <FlagIcon :code="currentCode" :size="26" />
      </button>

      <div
        v-if="open"
        class="absolute bottom-14 right-0 bg-card border border-border rounded-xl overflow-hidden elevation-2"
      >
        <button
          class="w-14 h-12 flex items-center justify-center text-foreground hover:bg-muted/60 transition-colors"
          type="button"
          @click="setNextLanguage"
        >
          <FlagIcon :code="nextCode" :size="26" />
        </button>
      </div>
    </div>
  </div>
</template>
