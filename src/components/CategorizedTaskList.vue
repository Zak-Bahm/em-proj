<template>
    <div class="card" :class="`bg-${colorClass}-subtle`">
        <div class="card-header text-light" :class="`text-bg-${colorClass}`">
            <h3 class="card-title m-0">{{ category }}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group list-group-flush">
            <li v-for="task in tasks" :key="task.id" class="list-group-item text-light" :class="`bg-${colorClass}-subtle text-${colorClass}-emphasis`">
                {{ task }}
            </li>
        </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    category: String,
    colorClass: String
})

const tasks = ref([
    'Choose topic',
    'Write paper',
    'Proofread paper',
    'Pick color'
])
</script>

<style>
/* Add any custom styles here */
</style>
