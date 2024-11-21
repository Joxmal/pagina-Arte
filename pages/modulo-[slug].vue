<template>
  <h1 class="text-3xl font-animeAce3_bold text-center">MODULO {{ params.slug }}</h1>
  <div class="flex flex-wrap justify-center">
    <div v-for="count in imagesModulo.totalImages" :key="count" class="hover:cursor-pointer    m-2"
      @click="() => (numberSelect = count - 1, showImg(count - 1))">
      <img :src="`${imagesModulo.rute}/${String(count).padStart(2, '0')}.jpeg`" alt=""
        class="h-32 w-32 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105">
    </div>
    <VueEasyLightbox :visible="visibleRef" :imgs="imagesModulo.images" :index="indexRef" @hide="onHide" />
  </div>
</template>

<script setup lang="ts">



const route = useRoute()

const params = route.params


interface images {
  src: string,
  title: string
}

const imgs = [
  { src: "/images/curso/naruto.jpeg", title: "this naruto" },
  { src: "/images/curso/naruto.jpeg", title: "this naruto" },
  { src: "/images/curso/naruto.jpeg", title: "this naruto" },
];
const numberSelect = ref(0)
const imagesModulo = ref({
  totalImages: 0,
  rute: '',
  images: [

  ] as images[]
})
if (params.slug === '1') {
  console.log(imagesModulo.value)
  imagesModulo.value.totalImages = 85
  imagesModulo.value.rute = '/images/modulo/1'

  for (let index = 1; index <= imagesModulo.value.totalImages; index++) {
    imagesModulo.value.images.push(
      { src: `${imagesModulo.value.rute}/${String(index).padStart(2, '0')}.jpeg `, title: 'Modulo 1' }
    )
  }


} else if (params.slug === '2') {
  imagesModulo.value.totalImages = 86
  imagesModulo.value.rute = ''
  imagesModulo.value.rute = '/images/modulo/2'

  for (let index = 1; index <= imagesModulo.value.totalImages; index++) {
    imagesModulo.value.images.push(
      { src: `${imagesModulo.value.rute}/${String(index).padStart(2, '0')}.jpeg `, title: 'Modulo 2' }
    )
  }

} else if (params.slug === 'Halloween') {
  imagesModulo.value.totalImages = 8
  imagesModulo.value.rute = ''
  imagesModulo.value.rute = '/images/especiales/Halloween'

  for (let index = 1; index <= imagesModulo.value.totalImages; index++) {
    imagesModulo.value.images.push(
      { src: `${imagesModulo.value.rute}/${String(index).padStart(2, '0')}.jpeg `, title: 'Modulo Halloween' }
    )
  }
}

//------

const visibleRef = ref(false);
const indexRef = ref(0);



const showImg = (index: any) => {
  indexRef.value = index;
  visibleRef.value = true;
};
const onHide = () => (visibleRef.value = false);

</script>