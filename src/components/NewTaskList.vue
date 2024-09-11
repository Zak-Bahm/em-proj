<template>
    <div class="card bg-primary-subtle" :class="pageView ? '' : 'tall-card-max'">
        <div class="card-header bg-primary text-light" v-if="!pageView">
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

        <div class="card-header bg-primary text-light" v-if="pageView">
            <a class="d-flex justify-content-between align-items-center text-light text-decoration-none" href="#" @click="editTask()">
                <h3 class="card-title m-0">Inbox</h3>
                <i class="bi bi-plus-square-fill fs-3 text-light"></i>
            </a>
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
        <TaskModal modal-id="newTaskListModal" :target-task="targetTask" v-model:id="targetTask.id" v-model:title="targetTask.title" v-model:desc="targetTask.description" v-model:cat="targetTask.category"/>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue'
    import TaskModal from './TaskModal.vue';
    import { getLocalTasks, saveLocalTask } from '@/methods/tasks';

    const props = defineProps({
        pageView: Boolean
    })

    const newTitle = defineModel({ type: String })
    const tasks = ref([])
    const targetTask = ref({})

    onMounted(() => {
        fetchTasks();

        // Add event listener to all modals
        const modalElements = document.querySelectorAll('.modal');
        modalElements.forEach(modalElement => {
            modalElement.addEventListener('hide.bs.modal', () => fetchTasks());
        });
    });

    onUnmounted(() => {
        // Remove event listener from all modals
        const modalElements = document.querySelectorAll('.modal');
        modalElements.forEach(modalElement => {
            modalElement.removeEventListener('hide.bs.modal', () => fetchTasks());
        });
    });

    function fetchTasks() {
        const newTasks = getLocalTasks('none');
        tasks.value = newTasks;
    }
    function addTask() {
        if (newTitle.value == '') return;

        const newTask = {
            id: Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            title: newTitle.value,
            description: '',
            category: ''
        }

        saveLocalTask(newTask);
        tasks.value.unshift(newTask)
        newTitle.value = ''
    }
    function editTask(task) {
        // set proper task value
        targetTask.value = {id: Date.now(), createdAt: Date.now(), updatedAt: Date.now(), title: '', description: '', category: ''};
        if (typeof task !== 'undefined') targetTask.value = task;

        // load modal
        const modalElement = document.getElementById('newTaskListModal');
        const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modal.show();
    }
</script>

<style>
/* Add any custom styles here */
</style>
