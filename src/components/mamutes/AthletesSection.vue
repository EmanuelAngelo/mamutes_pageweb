<script setup lang="ts">
  import type { Athlete } from '@/entities/types'
  import { computed, onMounted, ref } from 'vue'
  import athletesData from '@/entities/Athlete.json'
  import { useI18n } from '@/i18n/useI18n'
  import SectionTitle from './SectionTitle.vue'

  const isLoading = ref(true)

  const { t } = useI18n()

  const athletes = computed<Athlete[]>(() => {
    const list = (athletesData as Athlete[]).filter(a => a.is_loaned)
    return list
  })

  onMounted(() => {
    window.setTimeout(() => {
      isLoading.value = false
    }, 250)
  })
</script>

<template>
  <section id="atletas" class="relative py-24 px-4 bg-muted/40 overflow-hidden">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0">
      <div class="absolute inset-0 bg-[url('/logo/Time.jpg')] bg-cover bg-center opacity-35" />
      <div class="absolute inset-0 bg-black/65" />
      <div
        v-parallax="{ speed: 0.07, max: 70 }"
        class="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[48rem] h-[48rem] rounded-full bg-primary/5 blur-3xl"
      />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <SectionTitle
        :subtitle="t('section.athletes.subtitle')"
        subtitle-class="text-white/80"
        :title="t('section.athletes.title')"
        title-class="text-white"
      />

      <div v-if="isLoading" class="flex justify-center">
        <div class="w-8 h-8 border-4 border-white/20 border-t-primary rounded-full animate-spin" />
      </div>

      <p v-else-if="athletes.length === 0" class="text-center text-white/70">
        {{ t('section.athletes.empty') }}
      </p>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(athlete, i) in athletes"
          :key="athlete.id"
          class="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
          :style="{ transitionDelay: `${i * 60}ms` }"
        >
          <div class="aspect-square bg-muted relative overflow-hidden">
            <img
              v-if="athlete.photo_url"
              :alt="athlete.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :src="athlete.photo_url"
            >
            <div v-else class="w-full h-full flex items-center justify-center">
              <v-icon class="text-muted-foreground/30" size="64">mdi-account</v-icon>
            </div>

            <div
              v-if="athlete.number"
              class="absolute top-3 right-3 bg-primary text-primary-foreground font-oswald text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center"
            >
              {{ athlete.number }}
            </div>
          </div>

          <div class="p-4">
            <h3 class="font-oswald text-base font-semibold text-card-foreground">{{ athlete.name }}</h3>
            <p class="text-xs text-muted-foreground mt-1">{{ athlete.position }}</p>

            <div v-if="athlete.loaned_to" class="mt-3 flex items-center gap-1.5 text-xs text-primary font-medium">
              <v-icon size="14">mdi-arrow-right</v-icon>
              {{ t('section.athletes.loanedPrefix') }} {{ athlete.loaned_to }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
