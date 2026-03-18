<script setup lang="ts">
  const props = withDefaults(defineProps<{ code: 'br' | 'us', size?: number }>(), {
    size: 22,
  })

  const width = props.size
  const height = Math.round((props.size * 14) / 22)
</script>

<template>
  <svg
    v-if="props.code === 'br'"
    :height="height"
    viewBox="0 0 22 14"
    :width="width"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="#1F8B3A" height="14" rx="2" width="22" />
    <path d="M11 2 L20 7 L11 12 L2 7 Z" fill="#F7D117" />
    <circle cx="11" cy="7" fill="#1A3D8F" r="3" />
    <path
      d="M8 7.2c2.2-1.5 4.8-1.5 7 0"
      fill="none"
      stroke="#FFFFFF"
      stroke-linecap="round"
      stroke-width="0.7"
    />
  </svg>

  <svg
    v-else
    :height="height"
    viewBox="0 0 22 14"
    :width="width"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill="#FFFFFF" height="14" rx="2" width="22" />
    <g fill="#B22234">
      <rect height="1" width="22" y="0" />
      <rect height="1" width="22" y="2" />
      <rect height="1" width="22" y="4" />
      <rect height="1" width="22" y="6" />
      <rect height="1" width="22" y="8" />
      <rect height="1" width="22" y="10" />
      <rect height="1" width="22" y="12" />
    </g>
    <rect fill="#3C3B6E" height="7" width="9.5" />
    <g fill="#FFFFFF" opacity="0.95">
      <circle cx="1.5" cy="1.4" r="0.35" />
      <circle cx="3.5" cy="1.4" r="0.35" />
      <circle cx="5.5" cy="1.4" r="0.35" />
      <circle cx="7.5" cy="1.4" r="0.35" />
      <circle cx="2.5" cy="2.6" r="0.35" />
      <circle cx="4.5" cy="2.6" r="0.35" />
      <circle cx="6.5" cy="2.6" r="0.35" />
      <circle cx="8.5" cy="2.6" r="0.35" />
      <circle cx="1.5" cy="3.8" r="0.35" />
      <circle cx="3.5" cy="3.8" r="0.35" />
      <circle cx="5.5" cy="3.8" r="0.35" />
      <circle cx="7.5" cy="3.8" r="0.35" />
      <circle cx="2.5" cy="5" r="0.35" />
      <circle cx="4.5" cy="5" r="0.35" />
      <circle cx="6.5" cy="5" r="0.35" />
      <circle cx="8.5" cy="5" r="0.35" />
    </g>
  </svg>
</template>
