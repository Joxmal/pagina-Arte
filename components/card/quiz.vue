<template>
  <div class=" font-animeAce3 max-w-sm bg-white border border-gray-200 rounded-lg shadow min-h-52">

    <img class="rounded-t-lg" :src="props.src" alt="" />

    <h1 class="text-4xl text-center font-bold">{{ props.title }}</h1>

    <div class="flex flex-wrap justify-between mt-4 ">

    </div>
    <div>
      {{ props.description }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  images?: string[]
  src?: string
  iconSpin?: boolean
  description: string
}
const props = withDefaults(defineProps<Props>(), {
  title: 'titulo',
  src: '',
  iconSpin: false,
})
</script>