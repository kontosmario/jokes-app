// Importamos axios
import axios from 'axios';
import type { Joke } from '../models/joke';

// Creamos una instancia de Axios
const apiClient = axios.create({
  baseURL: 'https://official-joke-api.appspot.com', // Base URL para la API
  timeout: 5000, // Tiempo límite de espera
});

const JokesService = {
  /**
   * Obtiene un chiste aleatorio
   * @returns {Promise<Joke>} Chiste aleatorio
   */
  async getRandomJoke(): Promise<Joke> {
    const response = await apiClient.get<Joke>("/random_joke");
    return response.data;
  },

  /**
   * Obtiene otro chiste aleatorio
   * @returns {Promise<Joke>} Otro chiste aleatorio
   */
  async getAnotherRandomJoke(): Promise<Joke> {
    const response = await apiClient.get<Joke>("/jokes/random");
    return response.data;
  },

  /**
   * Obtiene los tipos de chistes disponibles
   * @returns {Promise<string[]>} Lista de tipos de chistes
   */
  async getJokeTypes(): Promise<string[]> {
    const response = await apiClient.get<string[]>("/types");
    return response.data;
  },

  /**
   * Obtiene diez chistes aleatorios
   * @returns {Promise<Joke[]>} Lista de diez chistes
   */
  async getTenRandomJokes(): Promise<Joke[]> {
    const response = await apiClient.get<Joke[]>("/random_ten");
    return response.data;
  },

  /**
   * Obtiene un número específico de chistes aleatorios
   * @param {number} count - Número de chistes a obtener
   * @returns {Promise<Joke[]>} Lista de chistes aleatorios
   */
  async getRandomJokes(count: number): Promise<Joke[]> {
    const response = await apiClient.get<Joke[]>(`/jokes/random/${count}`);
    return response.data;
  },

  /**
   * Obtiene chistes aleatorios de un tipo específico
   * @param {string} type - Tipo de chistes (ej: programming, general, etc.)
   * @returns {Promise<Joke>} Chiste aleatorio del tipo
   */
  async getJokeByTypeRandom(type: string): Promise<Joke> {
    const response = await apiClient.get<Joke>(`/jokes/${type}/random`);
    return response.data;
  },

  /**
   * Obtiene diez chistes de un tipo específico
   * @param {string} type - Tipo de chistes (ej: programming, general, etc.)
   * @returns {Promise<Joke[]>} Lista de diez chistes del tipo
   */
  async getTenJokesByType(type: string): Promise<Joke[]> {
    const response = await apiClient.get<Joke[]>(`/jokes/${type}/ten`);
    return response.data;
  },

  /**
   * Obtiene un chiste específico por su ID
   * @param {number} id - ID del chiste
   * @returns {Promise<Joke>} Chiste con el ID especificado
   */
  async getJokeById(id: number): Promise<Joke> {
    const response = await apiClient.get<Joke>(`/jokes/${id}`);
    return response.data;
  },
};

export default JokesService;
