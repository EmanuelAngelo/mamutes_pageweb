<script setup lang="ts">
  import { ref } from 'vue'

  type NavLink = { label: string, href: string }

  const LOGO_URL = '/logo/Logo.png'

  const navLinks: NavLink[] = [
    { label: 'Início', href: '#hero' },
    { label: 'Campeonatos', href: '#campeonatos' },
    { label: 'Diretoria', href: '#diretoria' },
    { label: 'Atletas', href: '#atletas' },
    { label: 'Jerseys', href: '#jerseys' },
    { label: 'Patrocinadores', href: '#patrocinadores' },
  ]

  const open = ref(false)

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
          <img alt="Mamutes F.A." class="h-10 w-10 object-contain" :src="LOGO_URL">
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
        </div>

        <button class="md:hidden text-foreground" type="button" @click="open = !open">
          <v-icon size="24">{{ open ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </button>
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
      </div>
    </div>
  </nav>
</template>
