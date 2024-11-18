<template>
  <button :disabled="props.disabled" :class="disabled ? `from-transparent to-gray-700` : ''"
    class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 ">
    <span
      class="relative font-bold px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
      {{ props.title }}
    </span>
  </button>
</template>


<script setup lang="ts">

interface Props {
  title?: string
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: 'titulo',
  disabled: false
})



</script>