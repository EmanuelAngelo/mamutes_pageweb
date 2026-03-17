<script setup lang="ts">
  const LOGO_URL = 'https://media.base44.com/images/public/user_690392ab1b49f576cdc0c9bc/b3d1dac98_Logo.png'

  function goToChampionships () {
    document.querySelector('#campeonatos')?.scrollIntoView({ behavior: 'smooth' })
  }
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground">
    <div class="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-neutral-800" />
    <div class="absolute left-0 top-0 bottom-0 w-1 bg-primary" />

    <div class="relative z-10 text-center px-4">
      <div class="transition-all duration-700 ease-out [animation:fade-in_0.8s_ease-out_both]">
        <img
          alt="Mamutes F.A."
          class="w-48 h-48 sm:w-64 sm:h-64 mx-auto object-contain drop-shadow-2xl"
          :src="LOGO_URL"
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
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
