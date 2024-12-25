<template>
  <div class="w-[400px] h-[450px] rounded-lg shadow-lg flex items-center justify-center select-none relative" ref="card"
    style="touch-action: pan-y; transition: background-color 0.3s ease-out, opacity 0.3s ease-out;"
    @pointerdown="startDrag">
    <div v-if="joke" class="text-center p-5 font-sans">
      <h2 class="text-black text-xl font-bold mb-2">{{ joke.setup }}</h2>
      <p class="text-gray-700">{{ joke.punchline }}</p>
    </div>
    <div v-else class="text-center p-5 font-sans">
      <h2 class="text-xl font-bold mb-2">Cargando chiste...</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import type { Joke } from '../../models/joke';

const THRESHOLD = 100; // Distancia para determinar un swipe

// Props
const props = defineProps<{ joke: Joke | null }>();

// Eventos emitidos
const emit = defineEmits<{
  (event: 'swipeRight', joke: Joke): void;
  (event: 'swipeLeft', joke: Joke): void;
}>();

// Refs
const card = ref<HTMLDivElement | null>(null);

// Variables reactivas para el estado del drag
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let dragging = false;

// Watch para reiniciar estilos al cambiar el chiste
watch(
  () => props.joke,
  () => {
    if (!card.value) return;
    resetCardStyles();
  }
);

/**
 * Inicia el drag al detectar un evento de pointerdown
 */
function startDrag(event: PointerEvent): void {
  event.preventDefault();
  dragging = true;
  startX = event.clientX;
  startY = event.clientY;

  card.value?.setPointerCapture(event.pointerId);
  card.value?.addEventListener('pointermove', onPointerMove);
  card.value?.addEventListener('pointerup', endDrag);
  card.value?.addEventListener('pointercancel', endDrag);
}

/**
 * Maneja el movimiento del puntero
 */
function onPointerMove(event: PointerEvent): void {
  if (!dragging) return;
  currentX = event.clientX - startX;
  currentY = event.clientY - startY;
  applyTransformAndColor();
}

/**
 * Finaliza el drag
 */
function endDrag(event: PointerEvent): void {
  if (!dragging) return;
  dragging = false;
  card.value?.releasePointerCapture(event.pointerId);
  card.value?.removeEventListener('pointermove', onPointerMove);
  card.value?.removeEventListener('pointerup', endDrag);
  card.value?.removeEventListener('pointercancel', endDrag);
  evaluateRelease();
}

/**
 * Aplica transformación y color según la posición actual del drag
 */
function applyTransformAndColor(): void {
  if (!card.value) return;
  const rotateDeg = currentX / 10;
  card.value.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotateDeg}deg)`;

  const ratio = Math.max(-1, Math.min(1, currentX / THRESHOLD));
  card.value.style.backgroundColor = ratio > 0 ? 'green' : ratio < 0 ? 'red' : 'rgb(205, 205, 205)';
}

/**
 * Evalúa la acción después de soltar el card
 */
function evaluateRelease(): void {
  if (Math.abs(currentX) > THRESHOLD && props.joke) {
    if (currentX > 0) {
      emit('swipeRight', props.joke); // Llama a la sobrecarga exacta
    } else {
      emit('swipeLeft', props.joke); // Llama a la sobrecarga exacta
    }
    animateCardExit();
  } else {
    resetToCenter();
  }
}

/**
 * Anima la salida del card hacia la dirección del swipe
 */
function animateCardExit(): void {
  if (!card.value) return;
  const direction = currentX > 0 ? 1 : -1;
  card.value.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
  card.value.style.transform = `translate(${direction * 1000}px, ${currentY}px) rotate(${currentX / 10}deg)`;
  card.value.style.opacity = '0';
}

/**
 * Restaura el card al centro
 */
function resetToCenter(): void {
  if (!card.value) return;
  card.value.style.transition = 'transform 0.3s ease-out, background-color 0.3s ease-out';
  card.value.style.transform = 'translate(0, 0) rotate(0)';
  card.value.style.backgroundColor = 'rgb(205, 205, 205)';

  setTimeout(() => {
    if (card.value) card.value.style.transition = '';
    currentX = 0;
    currentY = 0;
  }, 300);
}

/**
 * Reinicia los estilos del card
 */
function resetCardStyles(): void {
  if (!card.value) return;
  card.value.style.transition = 'none';
  card.value.style.transform = 'translate(0, 0) rotate(0)';
  card.value.style.backgroundColor = 'rgb(205, 205, 205)';
  card.value.style.opacity = '0';
  void card.value.offsetWidth; // Forzar reflow para transición suave
  card.value.style.transition = 'opacity 0.3s ease-out, background-color 0.3s ease-out';
  card.value.style.opacity = '1';
}
</script>
