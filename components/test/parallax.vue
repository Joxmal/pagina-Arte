<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { useParallax } from '@vueuse/core'
const target = ref(null)


const parallax = reactive(useParallax(target))



const layerBase: CSSProperties = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  transition: '.3s ease-out all',
}

const layer0 = computed(() => ({
  ...layerBase,
  transform: `translateX(${parallax.tilt * 20}px) translateY(${parallax.roll * 20
    }px) scale(1.1)`,
}))

const layer1 = computed(() => ({

  transform: `translateX(${parallax.tilt * 20}px) translateY(${parallax.roll * 20
    }px) scale(1.1)`,
}))

const cardStyle = computed(() => ({
  background: '#fff',
  height: '100%',
  width: '100%',
  borderRadius: '5px',
  border: '2px solid rgba(255, 255, 255, 0.25)',
  overflow: 'hidden',
  transition: '.3s ease-out all',
  transform: `rotateX(${parallax.roll * 20}deg) rotateY(${parallax.tilt * 20
    }deg)`,
}))

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

<template>

  <div ref="target" :style="cardStyle" class="relative min-h-60 border-2 border-black  shadow-md shadow-blue-700 ">

    <h1
      class="absolute text-white z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-4xl font-bold">
      {{
        props.title }}</h1>

    <div class="absolute text-white z-50 bottom-0 bg-gray-800/45 w-full ">
      {{ props.description }}
    </div>

    <img :style="layer0" :src="props.src" alt="">

  </div>


</template>