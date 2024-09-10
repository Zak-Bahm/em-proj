<template>
    <div class="card bg-primary-subtle" :class="pageView ? '' : 'tall-card-max'">
        <div class="card-header bg-primary text-light">
            <a class="d-flex justify-content-between align-items-center text-light text-decoration-none" href="/inbox">
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
                <li v-for="(task, index) in pageView ? tasks : tasks.slice(0, 17)" :key="index" class="list-group-item bg-primary-subtle text-primary-emphasis">
                    <a class="text-decoration-none d-flex justify-content-between align-items-center" href="#" @click="editTask(task)">
                        {{ task.title }}
                        <i class="bi bi-pencil-square fs-5"></i>
                    </a>
                </li>
                <li v-if="tasks.length == 0" class="list-group-item bg-primary-subtle text-primary-emphasis">
                    You have no pending tasks
                </li>
            </ul>
        </div>
        <TaskModal modal-id="newTaskListModal" v-model:title="targetTask.title" v-model:desc="targetTask.description" v-model:cat="targetTask.category"/>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import TaskModal from './TaskModal.vue';


    const props = defineProps({
        pageView: Boolean
    })

    const newTitle = defineModel({ type: String })
    const tasks = ref([])
    const targetTask = ref({title: '', description: '', category: ''})

    function addTask() {
        if (newTitle.value == '') return;

        tasks.value.unshift({title: newTitle.value, description: '', category: ''})
        newTitle.value = ''
    }
    function editTask(task) {
        targetTask.value = task
        const modal = new bootstrap.Modal(document.getElementById('newTaskListModal'))
        modal.show()
    }
</script>

<style>
/* Add any custom styles here */
</style>
