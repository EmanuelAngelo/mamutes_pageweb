<script setup lang="ts">
  import type { Championship } from '@/entities/types'
  import { computed, onMounted, ref } from 'vue'
  import championshipsData from '@/entities/Championship.json'
  import SectionTitle from './SectionTitle.vue'

  const isLoading = ref(true)

  const championships = computed<Championship[]>(() => {
    const list = (championshipsData as Championship[]).slice()
    return list.toSorted((a, b) => (b.year ?? 0) - (a.year ?? 0))
  })

  onMounted(() => {
    window.setTimeout(() => {
      isLoading.value = false
    }, 250)
  })
</script>

<template>
  <section id="campeonatos" class="py-24 px-4 bg-background">
    <div class="max-w-6xl mx-auto">
      <SectionTitle subtitle="Torneios e competições que marcam nossa trajetória" title="CAMPEONATOS" />

      <div v-if="isLoading" class="flex justify-center">
        <div class="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
      </div>

      <p v-else-if="championships.length === 0" class="text-center text-muted-foreground">
        Em breve nossos campeonatos serão listados aqui.
      </p>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(champ, i) in championships"
          :key="champ.id"
          class="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <div v-if="champ.image_url" class="h-44 overflow-hidden">
            <img
              :alt="champ.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :src="champ.image_url"
            >
          </div>

          <div class="p-6">
            <div class="flex items-start gap-3">
              <div class="p-2 bg-primary/10 rounded-lg shrink-0">
                <v-icon class="text-primary" size="20">mdi-trophy</v-icon>
              </div>

              <div>
                <h3 class="font-oswald text-lg font-semibold text-card-foreground">{{ champ.name }}</h3>

                <div class="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span class="flex items-center gap-1">
                    <v-icon size="14">mdi-calendar</v-icon>
                    {{ champ.year }}
                  </span>

                  <span v-if="champ.location" class="flex items-center gap-1">
                    <v-icon size="14">mdi-map-marker</v-icon>
                    {{ champ.location }}
                  </span>
                </div>

                <span
                  v-if="champ.result"
                  class="mt-3 inline-block text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full"
                >
                  {{ champ.result }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
