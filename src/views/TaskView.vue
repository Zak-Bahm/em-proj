<template>
    <main class="container mt-1">
        <div class="row">
            <div class="col-10 m-auto">
                <div class="mt-3 p-3 bg-secondary text-white rounded-start rounded-end d-flex justify-content-between align-items-center text-decoration-none">
                    <h3 class="m-0">Categorized Tasks</h3>
                    <i class="bi bi-plus-square-fill fs-3 text-light" @click="createTask"></i>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-10 m-auto mt-3">
                <CategorizedTaskList category="Urgent + Important" color-class="danger" page-view/>
            </div>
            <div class="col-10 m-auto mt-3">
                <CategorizedTaskList category="Not Urgent + Important" color-class="warning" page-view/>
            </div>
        </div>
        <div class="row">
            <div class="col-10 m-auto mt-3">
                <CategorizedTaskList category="Urgent + Not Important" color-class="info" page-view/>
            </div>
            <div class="col-10 m-auto mt-3">
                <CategorizedTaskList category="Not Urgent + Not Important" color-class="dark" page-view/>
            </div>
        </div>
        <TaskModal modal-id="newTaskListModal" :target-task="targetTask" v-model:title="targetTask.title"
            v-model:desc="targetTask.description" v-model:cat="targetTask.category" />
    </main>
</template>

<script setup>
import { ref } from 'vue'
import TaskModal from '../components/TaskModal.vue';
import CategorizedTaskList from '@/components/CategorizedTaskList.vue';

const targetTask = ref({})

function createTask() {
    // set proper task value
    targetTask.value = { createdAt: Date.now(), updatedAt: Date.now(), title: '', description: '', category: 'None' };

    // load modal
    const modalElement = document.getElementById('newTaskListModal');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.show();
}
</script>

<style scoped>
.bi {
    cursor: pointer
}
</style>
