<script setup lang="ts">
  import type { Jersey, JerseyStatus } from '@/entities/types'
  import { computed, onMounted, ref } from 'vue'
  import jerseysData from '@/entities/Jersey.json'
  import JerseyOrderModal from './JerseyOrderModal.vue'
  import SectionTitle from './SectionTitle.vue'

  const isLoading = ref(true)
  const selectedJersey = ref<Jersey | null>(null)

  const jerseys = computed<Jersey[]>(() => {
    const list = (jerseysData as Jersey[]).slice()
    return list.toSorted((a, b) => {
      const da = a.created_date ? new Date(a.created_date).getTime() : 0
      const db = b.created_date ? new Date(b.created_date).getTime() : 0
      return db - da
    })
  })

  const statusLabels: Record<JerseyStatus, string> = {
    disponivel: 'Disponível',
    pre_venda: 'Pré-Venda',
    esgotada: 'Esgotada',
  }

  const statusStyles: Record<JerseyStatus, string> = {
    disponivel: 'bg-green-500/10 text-green-600 border-green-500/20',
    pre_venda: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    esgotada: 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20',
  }

  function normalizedStatus (status?: JerseyStatus): JerseyStatus {
    return (status || 'disponivel')
  }

  onMounted(() => {
    window.setTimeout(() => {
      isLoading.value = false
    }, 250)
  })
</script>

<template>
  <section id="jerseys" class="py-24 px-4 bg-background">
    <div class="max-w-6xl mx-auto">
      <SectionTitle subtitle="Nossas camisas oficiais — vista a força do Mamute" title="JERSEYS" />

      <div v-if="isLoading" class="flex justify-center">
        <div class="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
      </div>

      <p v-else-if="jerseys.length === 0" class="text-center text-muted-foreground">
        Em breve nossas jerseys estarão disponíveis aqui.
      </p>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(jersey, i) in jerseys"
          :key="jersey.id"
          class="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl group"
          :style="{ transitionDelay: `${i * 80}ms` }"
        >
          <div class="aspect-square bg-muted relative overflow-hidden">
            <img
              v-if="jersey.image_url"
              :alt="jersey.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :src="jersey.image_url"
            >
            <div v-else class="w-full h-full flex items-center justify-center">
              <v-icon class="text-muted-foreground/20" size="80">mdi-tshirt-crew</v-icon>
            </div>

            <span
              class="absolute top-3 left-3 text-xs border px-2 py-1 rounded-pill"
              :class="statusStyles[normalizedStatus(jersey.status)]"
            >
              {{ statusLabels[normalizedStatus(jersey.status)] }}
            </span>
          </div>

          <div class="p-5">
            <h3 class="font-oswald text-lg font-semibold text-card-foreground">{{ jersey.name }}</h3>

            <p
              v-if="jersey.description"
              class="text-sm text-muted-foreground mt-1 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]"
            >
              {{ jersey.description }}
            </p>

            <div class="mt-4 flex items-center justify-between">
              <span class="text-2xl font-oswald font-bold text-foreground">
                R$ {{ (jersey.price ?? 0).toFixed(2) }}
              </span>

              <button
                class="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="jersey.status === 'esgotada'"
                type="button"
                @click="selectedJersey = jersey"
              >
                <v-icon size="18">mdi-shopping</v-icon>
                Pedir
              </button>
            </div>

            <div v-if="jersey.sizes_available?.length" class="mt-3 flex flex-wrap gap-1.5">
              <span
                v-for="size in jersey.sizes_available"
                :key="size"
                class="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded"
              >
                {{ size }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <JerseyOrderModal v-if="selectedJersey" :jersey="selectedJersey" @close="selectedJersey = null" />
  </section>
</template>
