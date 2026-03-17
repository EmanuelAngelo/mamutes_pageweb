<script setup lang="ts">
  import { ref } from 'vue'

  const props = defineProps<{
    title: string
    subtitle?: string
  }>()

  const visible = ref(false)

  function onIntersect (isIntersecting: boolean) {
    if (isIntersecting) visible.value = true
  }
</script>

<template>
  <div
    v-intersect="onIntersect"
    class="text-center mb-12 transition-all duration-500"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
  >
    <h2 class="font-oswald text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
      {{ props.title }}
    </h2>
    <div class="mt-3 mx-auto w-16 h-1 bg-primary rounded-full" />
    <p v-if="props.subtitle" class="mt-4 text-muted-foreground font-inter max-w-md mx-auto">
      {{ props.subtitle }}
    </p>
  </div>
</template>
