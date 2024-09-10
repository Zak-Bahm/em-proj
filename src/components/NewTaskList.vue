<template>
    <div class="card bg-primary-subtle tall-card-max">
        <div class="card-header bg-primary text-light">
            <a class="d-flex justify-content-between align-items-center text-light" href="/inbox">
                <h3 class="card-title m-0">Inbox</h3>
                <i class="bi bi-envelope-open-fill fs-3 text-light"></i>
            </a>

            <div class="input-group mt-3">
                <input type="text" v-model="newTitle" class="form-control" placeholder="New Task Title" aria-label="New Task Title" aria-describedby="button-addon2">
                <button class="btn btn-outline-info" type="button" id="button-addon2" @click="addTask">
                    <i class="bi bi-plus-square-fill fs-5 text-light"></i>
                </button>
            </div>
        </div>
        <div class="card-body overflow-hidden">
            <ul class="list-group list-group-flush">
                <li v-for="task in tasks.slice(0, 17)" :key="task.id" class="list-group-item bg-primary-subtle text-primary-emphasis">
                    {{ task }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const newTitle = defineModel({ type: String })
const tasks = ref([
    'Choose topic',
    'Write paper',
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
    'Choose topic',
    'Write paper',
    'Proofread paper',
    'Choose topic',
    'Write paper',
    'Proofread paper',
    'Choose topic',
    'Proofread paper',
    'Pick color'
])

function addTask() {
    if (newTitle.value == '') return;

    tasks.value.unshift(newTitle.value)
    newTitle.value = ''
}
</script>

<style>
/* Add any custom styles here */
</style>
