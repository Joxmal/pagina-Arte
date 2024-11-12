<template>
  <div>
    <NuxtImg placeholder="./placeholder.png" v-for="n in 2" :src="`/images/eventos/${n}.webp`" class="w-full">

    </NuxtImg>
  </div>
</template>