<template>
    <div class="card short-card-max" :class="`bg-${colorClass}-subtle`">
        <div class="card-header text-light" :class="`text-bg-${colorClass}`">
            <h3 class="card-title m-0">{{ category }}</h3>
        </div>
        <div class="card-body overflow-hidden">
            <ul class="list-group list-group-flush">
            <li v-for="task in tasks.slice(0, 7)" :key="task.id" class="list-group-item text-light" :class="`bg-${colorClass}-subtle text-${colorClass}-emphasis`">
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
    'Choose topic',
    'Write paper',
    'Proofread paper',
    'Choose topic',
    'Write paper',
    'Proofread paper',
    'Choose topic',
    'Write paper',
    'Proofread paper',
    'Pick color'
])
</script>

<style>
/* Add any custom styles here */
</style>
