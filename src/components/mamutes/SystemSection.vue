<script setup lang="ts">
  import type { MessageKey } from '@/i18n/messages'
  import { computed } from 'vue'
  import { useI18n } from '@/i18n/useI18n'
  import SectionTitle from './SectionTitle.vue'

  const { t } = useI18n()

  type SystemShotKey = 'dashboard' | 'login' | 'athletes' | 'practice' | 'playbook' | 'combine'

  type SystemShot = {
    key: SystemShotKey
    src: string
  }

  const shots: SystemShot[] = [
    { key: 'dashboard', src: '/sistema/tela_dashboard.png' },
    { key: 'login', src: '/sistema/tela_login.png' },
    { key: 'athletes', src: '/sistema/tela_atletas.png' },
    { key: 'practice', src: '/sistema/tela_treinos.png' },
    { key: 'playbook', src: '/sistema/tela_playbook.png' },
    { key: 'combine', src: '/sistema/tela_combine.png' },
  ]

  const shotTitleKey: Record<SystemShotKey, MessageKey> = {
    dashboard: 'system.shotTitle.dashboard',
    login: 'system.shotTitle.login',
    athletes: 'system.shotTitle.athletes',
    practice: 'system.shotTitle.practice',
    playbook: 'system.shotTitle.playbook',
    combine: 'system.shotTitle.combine',
  }

  const shotAltKey: Record<SystemShotKey, MessageKey> = {
    dashboard: 'system.shotAlt.dashboard',
    login: 'system.shotAlt.login',
    athletes: 'system.shotAlt.athletes',
    practice: 'system.shotAlt.practice',
    playbook: 'system.shotAlt.playbook',
    combine: 'system.shotAlt.combine',
  }

  function shotTitle (key: SystemShotKey) {
    return t(shotTitleKey[key])
  }

  function shotAlt (key: SystemShotKey) {
    return t(shotAltKey[key])
  }

  const phone = '5598988123003'

  const contactHref = computed(() => {
    const text = encodeURIComponent(t('system.whatsappText'))
    return `https://wa.me/${phone}?text=${text}`
  })
</script>

<template>
  <section id="sistema" class="relative py-24 px-4 bg-background overflow-hidden">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0">
      <div
        v-parallax="{ speed: 0.08, max: 80 }"
        class="absolute -bottom-56 left-1/2 -translate-x-1/2 w-[52rem] h-[52rem] rounded-full bg-primary/5 blur-3xl"
      />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <SectionTitle
        :subtitle="t('section.system.subtitle')"
        :title="t('section.system.title')"
      />

      <div class="space-y-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="shot in shots"
            :key="shot.src"
            class="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
          >
            <div class="aspect-[16/10] bg-muted relative overflow-hidden">
              <img
                :alt="shotAlt(shot.key)"
                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                :src="shot.src"
              >
            </div>
            <div class="p-5">
              <h3 class="font-oswald text-lg font-semibold text-card-foreground">{{ shotTitle(shot.key) }}</h3>
              <p class="mt-1 text-sm text-muted-foreground">
                {{ t('system.shotExample') }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-card rounded-xl border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div class="max-w-xl">
            <h3 class="font-oswald text-2xl font-bold text-card-foreground">{{ t('system.ctaTitle') }}</h3>
            <p class="mt-2 text-muted-foreground">
              {{ t('system.ctaText') }}
            </p>
          </div>

          <a
            class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            :href="contactHref"
            rel="noopener noreferrer"
            target="_blank"
          >
            <v-icon size="18">mdi-whatsapp</v-icon>
            {{ t('system.ctaButton') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
