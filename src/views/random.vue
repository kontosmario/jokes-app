<template>
  <div class="app-container">
    <h1>Random Jokes</h1>
    <p class="mb-10">Swipe right if you liked the joke, left if you didn't.</p>
    <SwipeCard
      :joke="currentJoke"
      @swipeRight="handleSwipeRight"
      @swipeLeft="handleSwipeLeft"
    />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useJokesStore } from '../store/useJokesStore';
import SwipeCard from '../components/base/SwipeCard.vue';

// Accedemos al store
const jokesStore = useJokesStore();

// Obtenemos el chiste actual desde el store
const currentJoke = computed(() => jokesStore.randomJoke);

async function fetchJoke() {
  try {
    await jokesStore.fetchRandomJoke();
  } catch (err) {
    console.error('Error al obtener el chiste:', err);
  }
}

function handleSwipeRight(joke) {
  console.log('Chiste aprobado:', joke);
  jokesStore.addToFavorites(joke); // Agregamos el chiste a favoritos
  fetchJoke();
}

function handleSwipeLeft(joke) {
  console.log('Chiste rechazado:', joke);
  jokesStore.addToDiscarded(joke); // Agregamos el chiste a descartados
  fetchJoke();
}

onMounted(() => {
  fetchJoke();
});
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  margin-top: 50px;
}
</style>
