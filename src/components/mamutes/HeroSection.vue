<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  const STORAGE_KEY = 'mamutes:heroLogoIndex'

  const logos = [
    '/logo/Logo.png',
    '/logo/logo_dourada.png',
    '/logo/logo_dourada_1.png',
    '/logo/logo_roxa.png',
    '/logo/logo_dark.png',
  ]

  const activeLogoIndex = ref(0)
  const isLogoSpinning = ref(false)

  function readStoredLogoIndex () {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return null

      const idx = Number.parseInt(raw, 10)
      if (!Number.isFinite(idx)) return null

      return idx
    } catch {
      return null
    }
  }

  function storeLogoIndex (idx: number) {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(idx))
    } catch {
      // ignore
    }
  }

  onMounted(() => {
    const stored = readStoredLogoIndex()
    if (stored == null) {
      return
    }

    if (stored >= 0 && stored < logos.length) {
      activeLogoIndex.value = stored
    }
  })

  function goToChampionships () {
    document.querySelector('#campeonatos')?.scrollIntoView({ behavior: 'smooth' })
  }

  function cycleLogo () {
    if (logos.length < 2) return
    if (isLogoSpinning.value) return

    isLogoSpinning.value = true

    window.setTimeout(() => {
      const next = (activeLogoIndex.value + 1) % logos.length
      activeLogoIndex.value = next
      storeLogoIndex(next)
    }, 220)

    window.setTimeout(() => {
      isLogoSpinning.value = false
    }, 520)
  }
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground">
    <div
      v-parallax="{ speed: 0.08, max: 70 }"
      class="absolute -inset-8 bg-gradient-to-br from-black via-neutral-900 to-neutral-800"
    />
    <div v-parallax="{ speed: 0.04, max: 24 }" class="absolute left-0 top-0 bottom-0 w-1 bg-primary" />

    <div class="relative z-10 text-center px-4">
      <div class="transition-all duration-700 ease-out [animation:fade-in_0.8s_ease-out_both]">
        <img
          :alt="`Mamutes F.A. logo ${activeLogoIndex + 1}`"
          class="w-48 h-48 sm:w-64 sm:h-64 mx-auto object-contain drop-shadow-2xl cursor-pointer select-none transition-transform"
          :class="isLogoSpinning ? 'logo-swap' : ''"
          :src="logos[activeLogoIndex]"
          @click="cycleLogo"
        >
      </div>

      <h1
        class="mt-8 font-oswald text-5xl sm:text-7xl font-bold text-white tracking-tight [animation:slide-up_0.6s_ease-out_both]"
      >
        Associação Esportiva Mamutes <span class="text-primary">F.A.</span>
      </h1>

      <p
        class="mt-4 text-lg sm:text-xl text-neutral-400 font-inter font-light max-w-lg mx-auto [animation:slide-up_0.6s_ease-out_both_0.15s]"
      >
        Flag Football Americano — Gigantes pela propriá natureza.
      </p>

      <div class="mt-16">
        <button class="animate-bounce" type="button" @click="goToChampionships">
          <v-icon class="text-neutral-500" size="32">mdi-chevron-down</v-icon>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes logo-swap {
  0% { transform: rotate(0deg) scale(1); }
  45% { transform: rotate(140deg) scale(0.92); }
  100% { transform: rotate(360deg) scale(1); }
}

.logo-swap {
  animation: logo-swap 0.52s ease-in-out both;
}

@keyframes fade-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
