<template>
  <div class="lists-container">
    <DynamicList
      :items="favoriteJokes"
      title="Good ones 🤣"
      @remove="removeFavorite"
    />
    <DynamicList
      :items="discardedJokes"
      title="Bad ones 😐"
      @remove="removeDiscarded"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useJokesStore } from '../store/useJokesStore';
import DynamicList from '../components/base/listItem.vue';

const jokesStore = useJokesStore();

// Computed para acceder a favoritos y descartados desde el store
const favoriteJokes = computed(() => {
  return jokesStore.favorites.map((joke) => ({ id: joke.id, displayText: joke.setup + ' ' + joke.punchline }));
});

const discardedJokes = computed(() => {
  return jokesStore.discarded.map((joke) => ({ id: joke.id, displayText: joke.setup + ' ' + joke.punchline }));
});

// Métodos para eliminar items de favoritos o descartados
function removeFavorite(id) {
  const joke = jokesStore.favorites.find((joke) => joke.id === id);
  if (joke) {
    jokesStore.favorites = jokesStore.favorites.filter((joke) => joke.id !== id);
  }
}

function removeDiscarded(id) {
  const joke = jokesStore.discarded.find((joke) => joke.id === id);
  if (joke) {
    jokesStore.discarded = jokesStore.discarded.filter((joke) => joke.id !== id);
  }
}
</script>

<style>
.lists-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>

