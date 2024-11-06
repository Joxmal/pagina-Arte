<template>
  <div>
    <ContentRenderer v-if="data" :value="data" />
  </div>
</template>

<script setup lang="ts">

const route = useRoute()

const { data } = await useAsyncData(`article-${route.params.slug}`, () => queryContent(`/blog/${route.params.slug}`).findOne())




</script>