<template>
  <h1 class="text-2xl text-center mb-4">
    selección de quiz
  </h1>


  <ClientOnly>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      <NuxtLink :to="{ name: 'quiz-game-slug', params: { slug: 'easy' } }">
        <TestParallax title="Aleatorio" description="NO sabes Que Saldrá!!!!" src="/images/quiz/2.gif" />
      </NuxtLink>

      <NuxtLink :to="{ name: 'quiz-game-slug', params: { slug: 'hardcore' } }">
        <TestParallax title="Aleatorio-Hardcore" description="NO sabes Que Saldrá!!!!" src="/images/quiz/2.gif" />
      </NuxtLink>





    </div>


  </ClientOnly>


</template>

<script setup lang="ts">


function alerta(valor: any) {
  console.log(valor)
  alert('se termino el contador')
}
const initContador = ref(0)



</script>