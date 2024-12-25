<template>
    <div class="mt-5 p-4 border rounded-lg w-full max-w-lg mx-auto max-h-[70vh] overflow-y-scroll">
        <h2 class="text-lg font-semibold text-center mb-4">{{ title }}</h2>
        <div v-if="items.length === 0" class="text-center text-gray-500">
            No items yet.
        </div>
        <ul v-else>
            <li v-for="item in items" :key="item.id"
                class="flex justify-between items-center p-2 border-b last:border-b-0">
                <span>{{ item.displayText }}</span>
                <button @click="removeItem(item.id)"
                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                    Delete
                </button>
            </li>
        </ul>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface ListItem {
  id: number;
  displayText: string;
}

// Define directamente las props
defineProps<{
  items: ListItem[];
  title: string;
}>();

// Define los eventos que el componente emitirá
const emit = defineEmits<{
  (event: 'remove', id: number): void;
}>();

// Método para eliminar un elemento
function removeItem(id: number): void {
  emit('remove', id);
}
</script>
