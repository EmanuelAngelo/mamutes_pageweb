<script setup lang="ts">
  import type { Sponsor, SponsorTier } from '@/entities/types'
  import { computed, onMounted, ref } from 'vue'
  import sponsorsData from '@/entities/Sponsor.json'
  import SectionTitle from './SectionTitle.vue'

  const isLoading = ref(true)

  const tierLabels: Record<SponsorTier, string> = { ouro: 'Ouro', prata: 'Prata', bronze: 'Bronze' }
  const tierOrder: Record<SponsorTier, number> = { ouro: 0, prata: 1, bronze: 2 }

  const sponsors = computed<Sponsor[]>(() => (sponsorsData as Sponsor[]).slice())

  const sorted = computed(() => {
    return sponsors.value.slice().toSorted((a, b) => (tierOrder[a.tier] ?? 3) - (tierOrder[b.tier] ?? 3))
  })

  onMounted(() => {
    window.setTimeout(() => {
      isLoading.value = false
    }, 250)
  })
</script>

<template>
  <section id="patrocinadores" class="relative py-24 px-4 bg-muted/40 overflow-hidden">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0">
      <div
        v-parallax="{ speed: 0.06, max: 70 }"
        class="absolute -bottom-56 left-1/2 -translate-x-1/2 w-[52rem] h-[52rem] rounded-full bg-primary/5 blur-3xl"
      />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <SectionTitle
        subtitle="Empresas e parceiros que acreditam no nosso projeto"
        subtitle-class="text-foreground/80"
        title="PATROCINADORES"
      />

      <div v-if="isLoading" class="flex justify-center">
        <div class="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
      </div>

      <div v-else-if="sorted.length === 0" class="text-center">
        <div class="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <v-icon class="text-muted-foreground/40" size="32">mdi-handshake</v-icon>
        </div>
        <p class="text-muted-foreground">Interessado em patrocinar? Entre em contato conosco!</p>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <a
          v-for="(sponsor, i) in sorted"
          :key="sponsor.id"
          class="bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
          :href="sponsor.website || '#'"
          rel="noopener noreferrer"
          :style="{ transitionDelay: `${i * 50}ms` }"
          :target="sponsor.website ? '_blank' : undefined"
        >
          <div class="w-full h-20 sm:h-24 flex items-center justify-center">
            <img
              v-if="sponsor.logo_url"
              :alt="sponsor.name"
              class="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              :src="sponsor.logo_url"
            >
            <span
              v-else
              class="font-oswald text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors text-center"
            >
              {{ sponsor.name }}
            </span>
          </div>

          <span class="mt-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {{ tierLabels[sponsor.tier] || sponsor.tier }}
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
