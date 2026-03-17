<script setup lang="ts">
  import SectionTitle from './SectionTitle.vue'

  type SystemShot = {
    alt: string
    src: string
    title: string
  }

  const shots: SystemShot[] = [
    { title: 'Dashboard', alt: 'Tela do dashboard', src: '/sistema/tela_dashboard.png' },
    { title: 'Login', alt: 'Tela de login', src: '/sistema/tela_login.png' },
    { title: 'Atletas', alt: 'Tela de atletas', src: '/sistema/tela_atletas.png' },
    { title: 'Treinos', alt: 'Tela de treinos', src: '/sistema/tela_treinos.png' },
    { title: 'Playbook', alt: 'Tela de playbook', src: '/sistema/tela_playbook.png' },
    { title: 'Combine', alt: 'Tela de combine', src: '/sistema/tela_combine.png' },
  ]

  const phone = '5598988123003'
  const text = encodeURIComponent('Olá! Tenho interesse em adquirir o sistema de gerenciamento de jogadores do Mamutes F.A.')
  const contactHref = `https://wa.me/${phone}?text=${text}`
</script>

<template>
  <section id="sistema" class="py-24 px-4 bg-background">
    <div class="max-w-6xl mx-auto">
      <SectionTitle
        subtitle="Veja algumas telas do nosso sistema de gerenciamento de jogadores e entre em contato para adquirir."
        title="SISTEMA"
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
                :alt="shot.alt"
                class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                :src="shot.src"
              >
            </div>
            <div class="p-5">
              <h3 class="font-oswald text-lg font-semibold text-card-foreground">{{ shot.title }}</h3>
              <p class="mt-1 text-sm text-muted-foreground">
                Exemplo de tela
              </p>
            </div>
          </div>
        </div>

        <div class="bg-card rounded-xl border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div class="max-w-xl">
            <h3 class="font-oswald text-2xl font-bold text-card-foreground">Quer adquirir o sistema?</h3>
            <p class="mt-2 text-muted-foreground">
              Entre em contato para conhecer o funcionamento, valores e implantação.
            </p>
          </div>

          <a
            class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            :href="contactHref"
            rel="noopener noreferrer"
            target="_blank"
          >
            <v-icon size="18">mdi-whatsapp</v-icon>
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
