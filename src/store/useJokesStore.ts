// Importamos defineStore de Pinia y el servicio JokesService
import { defineStore } from 'pinia';
import type { Joke } from '../models/joke';
import JokesService from '../services/jokes-service';

export const useJokesStore = defineStore("jokes", {
  state: () => ({
    randomJoke: null as Joke | null,
    randomJokes: [] as Joke[],
    jokeTypes: [] as string[],
    selectedJoke: null as Joke | null,
    loading: false,
    error: null as string | null,
    favorites: [] as Joke[], // Estado para chistes favoritos
    discarded: [] as Joke[], // Estado para chistes descartados
  }),

  actions: {
    async fetchRandomJoke() {
      this.setLoading(true);
      this.setError(null);
      try {
        const joke = await JokesService.getRandomJoke();
        if (joke) {
          this.randomJoke = joke;
        }
      } catch (err: any) {
        this.setError(err.message || "Error fetching random joke");
      } finally {
        this.setLoading(false);
      }
    },

    async fetchJokeTypes() {
      this.setLoading(true);
      this.setError(null);
      try {
        const types = await JokesService.getJokeTypes();
        if (Array.isArray(types)) {
          this.jokeTypes = [...types]; // Asegura reactividad al crear un nuevo array
        }
      } catch (err: any) {
        this.setError(err.message || "Error fetching joke types");
      } finally {
        this.setLoading(false);
      }
    },

    async fetchTenRandomJokes() {
      this.setLoading(true);
      this.setError(null);
      try {
        const jokes = await JokesService.getTenRandomJokes();
        if (Array.isArray(jokes)) {
          this.randomJokes = [...jokes];
        }
      } catch (err: any) {
        this.setError(err.message || "Error fetching ten random jokes");
      } finally {
        this.setLoading(false);
      }
    },

    async fetchJokeById(id: number) {
      this.setLoading(true);
      this.setError(null);
      try {
        const joke = await JokesService.getJokeById(id);
        if (joke) {
          this.selectedJoke = joke;
        }
      } catch (err: any) {
        this.setError(err.message || "Error fetching joke by ID");
      } finally {
        this.setLoading(false);
      }
    },

    async fetchRandomJokes(count: number) {
      this.setLoading(true);
      this.setError(null);
      try {
        const jokes = await JokesService.getRandomJokes(count);
        if (Array.isArray(jokes)) {
          this.randomJokes = [...jokes];
        }
      } catch (err: any) {
        this.setError(err.message || "Error fetching random jokes");
      } finally {
        this.setLoading(false);
      }
    },

    addToFavorites(joke: Joke) {
      if (!this.favorites.some(fav => fav.id === joke.id)) {
        this.favorites = [...this.favorites, joke]; // Asegura reactividad
      }
    },

    addToDiscarded(joke: Joke) {
      if (!this.discarded.some(disc => disc.id === joke.id)) {
        this.discarded = [...this.discarded, joke]; // Asegura reactividad
      }
    },

    // Métodos auxiliares para mantener el código limpio
    setLoading(status: boolean) {
      this.loading = status;
    },
    setError(message: string | null) {
      this.error = message;
    },
  },
});
