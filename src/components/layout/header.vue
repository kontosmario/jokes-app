<template>
  <header class="w-full bg-[#2d2d2d] text-white shadow-md">
    <div class="w-full flex justify-between items-center p-5">
      <!-- Logo -->
      <div class="w-[300px] text-2xl font-bold flex justify-start">
        <router-link to="/">Bad-Jokes-io</router-link>
      </div>
      <div class="w-[300px] flex justify-center">
        <router-link to="/random">Joke Swiper</router-link>
      </div>
      <div class="w-[300px] flex justify-end">
        <router-link
          class="w-[40px] h-[40px] rounded-full bg-[#1c8344] shadow-lg text-white flex items-center justify-center cursor-pointer"
          to="/profile">
          <span class="text-yellow-500 text-3xl">⭐️</span>
        </router-link>
      </div>
    </div>
  </header>
</template>
