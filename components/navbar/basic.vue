<template>


  <nav class="sticky bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div class="max-w-screen-xl  flex flex-wrap items-center relative justify-center mx-auto p-1">
      <div class="flex relative md:absolute  left-0 items-center space-x-3 rtl:space-x-reverse">
        <img src="/assets/icons/gojo.png" class="h-8" alt="Flowbite Logo">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Curso Dibujo Anime</span>
      </div>
      <div class="  items-center justify-between  w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul
          class="flex justify-center gap-2  p-1 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <NuxtLink active-class="bg-blue-700 md:text-blue-700" to="modulos"
              class="block py-2 px-3 ease-out duration-1000  text-white rounded md:bg-transparent  md:p-0 "
              aria-current="page">Módulos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink active-class="bg-blue-700 md:text-blue-700" to="eventos"
              class="block py-2 ease-out duration-1000  px-3 text-white rounded md:bg-transparent  md:p-0 ">
              Eventos
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>