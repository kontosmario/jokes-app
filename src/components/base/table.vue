<template>
    <div class="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <div class="flex justify-between items-center mb-4">
            <!-- Filtro por tipo -->
            <select v-model="selectedType" @change="resetPagination" class="border border-gray-300 rounded-md p-2">
                <option value="">All Types</option>
                <option v-for="type in availableTypes" :key="type" :value="type">{{ type }}</option>
            </select>

            <!-- Resultados por petición -->
            <select v-model="resultsPerRequest" @change="emitResultsPerRequest"
                class="border border-gray-300 rounded-md p-2">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="250">250</option>
                <option value="451">Max Value</option>
            </select>
        </div>

        <!-- Tabla de datos -->
        <table class="min-w-full border-collapse border border-gray-200">
            <thead>
                <tr class="bg-gray-100">
                    <th v-for="column in columns" :key="column.name"
                        :class="['border border-gray-300 px-4 py-2 text-left', column.sortable ? 'cursor-pointer' : '']"
                        @click="column.sortable && sort(column.name)">
                        {{ column.name }}
                        <span v-if="sortBy === column.name">
                            {{ sortOrder === 'asc' ? '↑' : '↓' }}
                        </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in paginatedItems" :key="item.id" class="odd:bg-white even:bg-gray-50">
                    <td v-for="column in columns" :key="column.name" class="border border-gray-300 px-4 py-2">
                        {{ item[column.name] }}
                    </td>
                </tr>
            </tbody>

        </table>

        <!-- Controles de paginación -->
        <div class="flex justify-between items-center mt-4">
            <button @click="prevPage" :disabled="isFirstPage"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
                Previous
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="isLastPage"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Props para datos dinámicos
const props = defineProps({
    items: Array,
    columns: {
        type: Array,
        required: true,
    },
    types: {
        type: Array,
        default: () => [],
    },
});


const emit = defineEmits(['update:resultsPerRequest']);

// Estado reactivo
const selectedType = ref('');
const resultsPerRequest = ref(10);
const paginationSize = ref(10);
const currentPage = ref(1);
const sortBy = ref(''); // Columna actual de ordenamiento
const sortOrder = ref('asc'); // Orden de ordenamiento ('asc' o 'desc')

// Tipos disponibles
const availableTypes = computed(() => props.types);

// Elementos filtrados
const filteredItems = computed(() => {
    let items = selectedType.value
        ? props.items.filter((item) => item.type === selectedType.value)
        : props.items;

    if (sortBy.value) {
        items = [...items].sort((a, b) => {
            const valueA = a[sortBy.value];
            const valueB = b[sortBy.value];
            if (valueA < valueB) return sortOrder.value === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder.value === 'asc' ? 1 : -1;
            return 0;
        });
    }

    return items;
});

// Paginación
const totalPages = computed(() => {
    const total = Math.ceil(filteredItems.value.length / paginationSize.value);
    return total > 0 ? total : 1; // Siempre al menos 1 página
});

const paginatedItems = computed(() => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value;
    }

    const start = (currentPage.value - 1) * paginationSize.value;
    const end = start + paginationSize.value;

    return filteredItems.value.slice(start, end);
});

const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);

// Métodos
function resetPagination() {
    currentPage.value = 1;
}

function emitResultsPerRequest() {
    emit('update:resultsPerRequest', parseInt(resultsPerRequest.value));
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

function sort(column) {
    if (sortBy.value === column) {
        // Cambiar el orden
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        // Nuevo ordenamiento
        sortBy.value = column;
        sortOrder.value = 'asc';
    }
    resetPagination(); // Reinicia la paginación después de ordenar
}
</script>
