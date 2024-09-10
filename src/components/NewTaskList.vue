<template>
    <div class="card bg-primary-subtle">
        <div class="card-header bg-primary text-light">
            <h3 class="card-title m-0">Inbox</h3>
        </div>
        <div class="card-body">
            <ul class="list-group list-group-flush">
            <li v-for="task in tasks" :key="task.id" class="list-group-item bg-primary-subtle text-primary-emphasis">
                {{ task }}
            </li>
        </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

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
