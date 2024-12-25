<template>
  <DynamicTable
    :items="randomJokes"
    :columns="columns"
    :types="jokeTypes"
    @update:resultsPerRequest="updateResultsPerRequest"
  />
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useJokesStore } from '../store/useJokesStore';
import DynamicTable from '../components/base/table.vue';

const columns = [
  { name: 'id', sortable: true },
  { name: 'type', sortable: true },
  { name: 'setup', sortable: false },
  { name: 'punchline', sortable: false }
]

// Accedemos al store
const jokesStore = useJokesStore();

// Acceso reactivo a los estados del store
const randomJokes = computed(() => jokesStore.randomJokes);
const jokeTypes = computed(() => jokesStore.jokeTypes);

// Estado local para el número de resultados por solicitud
let resultsPerRequest = ref(10);

// Función para actualizar el número de resultados y cargar nuevos datos
function updateResultsPerRequest(newResultsPerRequest) {
  console.log('Nuevo valor de resultsPerRequest:', newResultsPerRequest);
  resultsPerRequest.value = newResultsPerRequest;
  jokesStore.fetchRandomJokes(resultsPerRequest.value);
}

// Cargamos los datos iniciales al montar el componente
onMounted(async () => {
  try {
    // Verificar si ya hay datos en el store
    if (!randomJokes.value || randomJokes.value.length === 0) {
      console.log('Cargando tipos de chistes...');
      await jokesStore.fetchJokeTypes();
      console.log('Joke Types:', jokeTypes.value); // Debug

      console.log('Cargando chistes aleatorios...');
      await jokesStore.fetchRandomJokes(resultsPerRequest.value);
      console.log('Random Jokes:', randomJokes.value); // Debug
    } else {
      console.log('Datos ya disponibles en el store, omitiendo el request.');
    }
  } catch (error) {
    console.error('Error al cargar los datos iniciales:', error);
  }
});
</script>
