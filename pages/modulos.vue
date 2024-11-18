<template>
  <div class=" py-4 font-animeAce">
    <h1 class="text-3xl font-animeAce3_bold mb-10 text-center">PROGRESO</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <NuxtLink :to="`modulo-${index + 1}`" v-for="(modulo, index) in progreso" :key="index">
        <CardProgreso :title="modulo.title" :description="modulo.description" :icon="modulo.icon" class="basis-1/2" />
      </NuxtLink>
    </div>

    <hr class="my-4 ">
    <h1 class="text-3xl font-animeAce3_bold mb-10 text-center ">Especiales</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <NuxtLink :to="`modulo-Halloween`">
        <CardProgreso title="Halloween" description="Clase de especial de Halloween" icon="mdi:halloween"
          class="basis-1/2" />
      </NuxtLink>
    </div>

  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Módulos del Curso",
})


const progreso = [
  {
    success: true,
    title: 'Construcción del cuerpo humano',
    icon: 'icon-park-twotone:success',
    description: 'En esta sesión, nos enfocaremos en uno de los aspectos más fundamentales y fascinantes del arte: la construcción del cuerpo humano. Aprender a representar el cuerpo humano de manera efectiva es esencial para cualquier artista que desee crear personajes dinámicos y realistas en el estilo anime.',
    images: [
      '',
      '',
      ''
    ]
  },
  {
    success: false,
    title: 'Sombreado',
    icon: 'eos-icons:loading',
    description: 'Esta sesión está diseñada para enseñarte las técnicas fundamentales que darán vida y profundidad a tus personajes, haciendo que tus ilustraciones resalten con un estilo único y atractivo.',
    images: [
      '',
      '',
      ''
    ]
  },

]



</script>