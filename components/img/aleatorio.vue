<template>


  <div class="relative w-full h-full">
    <div class="absolute inset-0 flex items-center justify-center">

      <img :key="currentImage" :src="currentImage" class="w-full h-full object-cover absolute" />

    </div>
  </div>
</template>

<script setup lang="ts">

const images = [
  '/images/quiz/1.webp',
  '/images/quiz/2.webp',
  '/images/quiz/3.webp',
  '/images/quiz/4.webp',
  '/images/quiz/5.webp',
  '/images/quiz/6.webp',
  '/images/quiz/7.webp',
  '/images/quiz/8.webp',
  '/images/quiz/9.webp',
  '/images/quiz/10.webp',
  '/images/quiz/11.webp',
  '/images/quiz/12.webp',
  '/images/quiz/13.webp',
  '/images/quiz/14.webp',
  '/images/quiz/15.webp',
  '/images/quiz/16.webp',
];

const currentImage = ref('');

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  currentImage.value = images[randomIndex];
};

onMounted(() => {
  getRandomImage(); // Cargar una imagen aleatoria al montar el componente
  setInterval(getRandomImage, 1000); // Cambiar la imagen cada 3 segundos
});
</script>