<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
useSeoMeta({
  ogImage: '/goku.png',
  title: "Curso de Dibujo de Anime",
  description: 'Curso de dibujo Moderno sobre cultura asiática japonesa y su dibujo'
})
</script>