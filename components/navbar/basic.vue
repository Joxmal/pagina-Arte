<template>
  <nav class="sticky bg-gray-900 w-full z-20 top-0 start-0 border-b  border-gray-600">
    <div class=" flex flex-col  items-center relative justify-center mx-auto p-1">


      <div class="flex relative w-full   left-0 items-center space-x-3 rtl:space-x-reverse">
        <img src="/assets/icons/gojo.png" class="h-8" alt="Flowbite Logo">
        <span class="self-center  text-2xl font-semibold whitespace-nowrap text-white">Curso Dibujo
          Anime
        </span>
      </div>



      <div class=" text-xl items-center justify-between  w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul
          class="flex justify-center gap-2  p-1 md:p-0 mt-4 font-medium border  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  bg-gray-800 border-gray-700">
          <li>
            <NuxtLink active-class="bg-blue-700 md:text-blue-700" :to="{ name: 'modulos' }"
              class="block py-2 px-3 ease-out duration-1000  text-white rounded md:bg-transparent  md:p-0 "
              aria-current="page">Módulos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink active-class="bg-blue-700 md:text-blue-700" :to="{ name: 'eventos' }"
              class="block py-2 ease-out duration-1000  px-3 text-white rounded md:bg-transparent  md:p-0 ">
              Eventos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink active-class="bg-blue-700 md:text-blue-700" :to="{ name: 'quiz' }"
              class="block py-2 ease-out duration-1000  px-3 text-white rounded md:bg-transparent  md:p-0 ">
              Quiz
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <ClientOnly>
    <Analytics />
  </ClientOnly>
</template>


<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

</script>