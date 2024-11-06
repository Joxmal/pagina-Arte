<template>
  <div
    class=" font-animeAce3 overflow-hidden  hover:border-blue-400 hover:shadow-blue bg-white shadow-lg rounded-xl hover:cursor-pointer hover:-translate-y-5 ease-in duration-300 border p-5 flex flex-col">
    <h1 class="text-4xl text-center font-bold">{{ props.title }}</h1>
    <div class="flex justify-center" :class="props.iconSpin ? 'animate-spin' : ''">
      <Icon size="150" class="mx-auto m-0 bg-green-500" :name="props.icon" style="color: black" />
    </div>
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
  icon?: string
  iconSpin?: boolean
  description: string
}
const props = withDefaults(defineProps<Props>(), {
  title: 'titulo',
  icon: ' lucide:loader-circle',
  iconSpin: false,
  images: () => [
    "/images/curso/naruto.jpeg",
    "/images/curso/naruto.jpeg",
    "/images/curso/naruto.jpeg",
  ],
})
</script>