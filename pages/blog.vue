<template>
  <div>
    <h1>blog</h1>
    <div v-if="data">
      <ul>
        <li v-for="article in data">
          <NuxtLink :to="article._path?.split('/').pop()">
            {{ article.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

const { data } = await useAsyncData('article', () => queryContent('/blog').find())


</script>