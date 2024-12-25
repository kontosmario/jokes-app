<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
  </div>
</template>

<script setup>
import HeaderComponent from "./components/layout/header.vue";
</script>
