<script setup lang="ts">
  import type { BoardMember, BoardMemberRole } from '@/entities/types'

  import { computed, onMounted, ref } from 'vue'
  import membersData from '@/entities/BoardMember.json'

  import SectionTitle from './SectionTitle.vue'

  const isLoading = ref(true)

  const roleIcons: Record<BoardMemberRole, string> = {
    'Presidente': 'mdi-crown',
    'Vice-Presidente': 'mdi-shield',
    'Diretor Financeiro': 'mdi-currency-usd',
    'Diretor Esportivo': 'mdi-trophy',
    'Diretor de Comunicação': 'mdi-bullhorn',
  }

  const roleBadgeClasses: Record<BoardMemberRole, string> = {
    'Presidente': 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-600',
    'Vice-Presidente': 'from-primary/20 to-primary/10 border-primary/30 text-primary',
    'Diretor Financeiro': 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-600',
    'Diretor Esportivo': 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-600',
    'Diretor de Comunicação': 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-600',
  }

  const rolePlaceholderBg: Record<BoardMemberRole, string> = {
    'Presidente': 'from-amber-500/20 to-amber-600/10',
    'Vice-Presidente': 'from-primary/20 to-primary/10',
    'Diretor Financeiro': 'from-emerald-500/20 to-emerald-600/10',
    'Diretor Esportivo': 'from-blue-500/20 to-blue-600/10',
    'Diretor de Comunicação': 'from-purple-500/20 to-purple-600/10',
  }

  const members = computed<BoardMember[]>(() => {
    const list = (membersData as BoardMember[]).slice()

    return list.toSorted((a, b) => (a.order ?? 0) - (b.order ?? 0))
  })

  function iconFor (role: BoardMemberRole) {
    return roleIcons[role] || 'mdi-account'
  }

  function badgeClassesFor (role: BoardMemberRole) {
    return roleBadgeClasses[role] || 'from-muted to-muted/50 border-border text-muted-foreground'
  }

  function placeholderBgFor (role: BoardMemberRole) {
    return rolePlaceholderBg[role] || 'from-muted to-muted/50'
  }

  onMounted(() => {
    window.setTimeout(() => {
      isLoading.value = false
    }, 250)
  })
</script>

<template>
  <section id="diretoria" class="relative py-24 px-4 bg-background overflow-hidden">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0">
      <div
        v-parallax="{ speed: 0.07, max: 70 }"
        class="absolute -top-56 left-1/2 -translate-x-1/2 w-[44rem] h-[44rem] rounded-full bg-primary/5 blur-3xl"
      />
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <SectionTitle subtitle="As pessoas que lideram e constroem o Mamutes F.A." title="DIRETORIA" />

      <div v-if="isLoading" class="flex justify-center">
        <div class="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
      </div>

      <p v-else-if="members.length === 0" class="text-center text-muted-foreground">
        Em breve nossa diretoria será apresentada aqui.
      </p>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(member, i) in members"
          :key="member.id"
          class="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
          :style="{ transitionDelay: `${i * 60}ms` }"
        >
          <div class="aspect-square bg-muted relative overflow-hidden">
            <img
              v-if="member.photo_url"
              :alt="member.name"
              class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              decoding="async"
              loading="lazy"
              :src="member.photo_url"
            >
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-gradient-to-br"
              :class="placeholderBgFor(member.role)"
            >
              <v-icon class="text-muted-foreground/20" size="80">mdi-account</v-icon>
            </div>
          </div>

          <div class="p-5">
            <h3 class="font-oswald text-xl font-bold text-card-foreground">{{ member.name }}</h3>
            <div
              class="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-gradient-to-r"
              :class="badgeClassesFor(member.role)"
            >
              <v-icon size="14">{{ iconFor(member.role) }}</v-icon>
              {{ member.role }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
