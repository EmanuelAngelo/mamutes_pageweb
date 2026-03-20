<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useTheme } from 'vuetify'
  import { useI18n } from '@/i18n/useI18n'

  type NavLink = { label: string, href: string }

  const LOGO_URL = '/logo/Logo.png'
  const STORAGE_KEY = 'mamutes:theme'
  const ATHLETE_LOGIN_URL = 'https://mamutes-fa.vercel.app/'

  const { t } = useI18n()

  const navLinks = computed<NavLink[]>(() => [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.championships'), href: '#campeonatos' },
    { label: t('nav.board'), href: '#diretoria' },
    { label: t('nav.athletes'), href: '#atletas' },
    { label: t('nav.jerseys'), href: '#jerseys' },
    { label: t('nav.system'), href: '#sistema' },
    { label: t('nav.sponsors'), href: '#patrocinadores' },
  ])

  const open = ref(false)

  const theme = useTheme()
  const isDark = computed(() => theme.global.current.value.dark)

  function toggleTheme () {
    const next = isDark.value ? 'light' : 'dark'
    theme.global.name.value = next

    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }

  function scrollToId (id: string) {
    open.value = false
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <button class="flex items-center gap-3" type="button" @click="scrollToId('#hero')">
          <img
            alt="Mamutes F.A."
            class="h-10 w-10 object-contain"
            :src="LOGO_URL"
          >
          <span class="font-oswald text-lg font-bold tracking-wide text-foreground">
            MAMUTES <span class="text-primary">F.A.</span>
          </span>
        </button>

        <div class="hidden md:flex items-center gap-8">
          <button
            v-for="link in navLinks"
            :key="link.href"
            class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            type="button"
            @click="scrollToId(link.href)"
          >
            {{ link.label }}
          </button>

          <a
            class="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            :href="ATHLETE_LOGIN_URL"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ t('nav.loginAthlete') }}
          </a>

          <button
            class="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border text-foreground hover:bg-muted/60 transition-colors"
            type="button"
            @click="toggleTheme"
          >
            <v-icon size="20">{{ isDark ? 'mdi-weather-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
          </button>
        </div>

        <div class="md:hidden flex items-center gap-2">
          <button
            :aria-label="t('aria.toggleTheme')"
            class="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border text-foreground hover:bg-muted/60 transition-colors"
            type="button"
            @click="toggleTheme"
          >
            <v-icon size="20">{{ isDark ? 'mdi-weather-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
          </button>

          <button class="text-foreground" type="button" @click="open = !open">
            <v-icon size="24">{{ open ? 'mdi-close' : 'mdi-menu' }}</v-icon>
          </button>
        </div>
      </div>
    </div>

    <div v-if="open" class="md:hidden bg-background border-b border-border">
      <div class="px-4 py-4 space-y-3">
        <button
          v-for="link in navLinks"
          :key="link.href"
          class="block w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          type="button"
          @click="scrollToId(link.href)"
        >
          {{ link.label }}
        </button>

        <a
          class="mt-2 inline-flex items-center justify-center h-11 w-full rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          :href="ATHLETE_LOGIN_URL"
          rel="noopener noreferrer"
          target="_blank"
          @click="open = false"
        >
          {{ t('nav.loginAthlete') }}
        </a>
      </div>
    </div>
  </nav>
</template>
