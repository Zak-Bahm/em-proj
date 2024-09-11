<template>
    <div class="card short-card-max" :class="`bg-${colorClass}-subtle`">
        <div class="card-header text-light" :class="`text-bg-${colorClass}`">
            <h3 class="card-title m-0">{{ category }}</h3>
        </div>
        <div class="card-body overflow-hidden">
            <ul class="list-group list-group-flush">
                <li v-for="task in tasks.slice(0, 7)" :key="task.id" class="list-group-item" :class="`bg-${colorClass}-subtle`">
                    <a class="text-decoration-none d-flex justify-content-between align-items-center" :class="`text-${colorClass}-emphasis`" href="#" @click="editTask(task)">
                        {{ task.title }}
                        <i class="bi bi-pencil-square fs-5"></i>
                    </a>
                </li>
                <li v-if="tasks.length == 0" class="list-group-item" :class="`bg-${colorClass}-subtle text-${colorClass}-emphasis`">
                    You have no {{ category }} tasks
                </li>
            </ul>
        </div>
        <TaskModal :modal-id="`${category}TaskListModal`" :target-task="targetTask" v-model:id="targetTask.id" v-model:title="targetTask.title" v-model:desc="targetTask.description" v-model:cat="targetTask.category"/>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TaskModal from './TaskModal.vue';
import { getLocalTasks, saveLocalTask } from '@/methods/tasks';

const props = defineProps({
    category: String,
    colorClass: String,
    pageView: Boolean
})

const catOptions = {
    'Urgent + Important': 'ImportantUrgent',
    'Not Urgent + Important': 'ImportantNotUrgent',
    'Urgent + Not Important': 'NotImportantUrgent',
    'Not Urgent + Not Important': 'NotImportantNotUrgent'
};
const currentOpt = catOptions[props.category];

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
    console.log("Fetching! for " + currentOpt)
    const newTasks = getLocalTasks(currentOpt);
    tasks.value = newTasks;
}
function editTask(task) {
    // set proper task value
    targetTask.value = {id: Date.now(), createdAt: Date.now(), updatedAt: Date.now(), title: '', description: '', category: ''};
    if (typeof task !== 'undefined') targetTask.value = task;

    // load modal
    const modalElement = document.getElementById(`${props.category}TaskListModal`);
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.show();
}
</script>

<style>
/* Add any custom styles here */
</style>
