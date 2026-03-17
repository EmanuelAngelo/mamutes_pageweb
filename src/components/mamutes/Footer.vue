<script setup lang="ts">
  const LOGO_URL = '/logo/Logo.png'

  const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-foreground text-background py-2 px-4">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <img alt="Mamutes F.A." class="h-10 w-10 object-contain" :src="LOGO_URL">
        <span class="font-oswald text-lg font-bold tracking-wide">
          MAMUTES <span class="text-primary">F.A.</span>
        </span>
      </div>
      <p class="text-sm text-neutral-400 font-inter text-center">
        © {{ year }} Mamutes Flag Football. Todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>
