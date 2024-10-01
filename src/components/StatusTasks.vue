<template>
    <div class="card" :class="`bg-${colorClass}-subtle`">
        <div class="card-header text-light" :class="`text-bg-${colorClass}`">
            <div class="d-flex justify-content-between align-items-center text-light text-decoration-none">
                <h3 class="card-title m-0">{{ properStatus }} Tasks</h3>
            </div>
        </div>

        <div class="card-body overflow-hidden">
            <ul class="list-group list-group-flush">
                <li v-for="(task, index) in tasks" :key="index" class="list-group-item"
                    :class="`bg-${colorClass}-subtle text-${colorClass}-emphasis`">
                    <div class="row">
                        <span class="col-10">
                            {{ task.title }}
                        </span>
                        <div class="col-1">
                            <i class="bi bi-pencil-square fs-5" @click="editTask(task)"></i>
                        </div>
                        <div class="col-1">
                            <i class="bi bi-trash-fill fs-5" @click="async () => { await deleteTask(index) }"></i>
                        </div>
                    </div>
                </li>
                <li v-if="tasks.length == 0" class="list-group-item"
                    :class="`bg-${colorClass}-subtle text-${colorClass}-emphasis`">
                    You have no {{ status }} tasks.
                </li>
            </ul>
        </div>
        <TaskModal :modal-id="status + 'TaskModel'" :target-task="targetTask" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import TaskModal from './TaskModal.vue';
import { getLocalTasks, getRemoteTasks, deleteLocalTask, deleteRemoteTask } from '@/methods/tasks';

const lcl = import.meta.env.VITE_LOCAL_ONLY === "true"
const props = defineProps({
    status: String,
    colorClass: String
})

const tasks = ref([])
const targetTask = ref({})

const properStatus = props.status.charAt(0).toUpperCase() + props.status.slice(1).toLowerCase()

onMounted(async () => {
    await fetchTasks();

    // Add event listener to all modals
    const modalElements = document.querySelectorAll('.modal');
    modalElements.forEach(modalElement => {
        modalElement.addEventListener('hide.bs.modal', async () => await fetchTasks());
    });
});

onUnmounted(() => {
    // Remove event listener from all modals
    const modalElements = document.querySelectorAll('.modal');
    modalElements.forEach(modalElement => {
        modalElement.removeEventListener('hide.bs.modal', async () => await fetchTasks());
    });
});

async function fetchTasks() {
    const newTasks = lcl ? getLocalTasks('', props.status) : await getRemoteTasks('', props.status);
    tasks.value = newTasks.filter(t => t.status === props.status);
}
function editTask(task) {
    // set proper task value
    targetTask.value = { createdAt: Date.now(), updatedAt: Date.now(), title: '', description: '', category: 'None', status: 'pending' };
    if (typeof task !== 'undefined') targetTask.value = task;

    // load modal
    const modalElement = document.getElementById(props.status + "TaskModel");
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.show();
}
async function deleteTask(ind) {
    if (typeof ind === 'undefined') return;

    // remove from localstorage then ref
    const taskList = tasks.value;
    const task = taskList[ind];
    const deleted = lcl ? deleteLocalTask(task) : await deleteRemoteTask(task);
    if (!deleted) return alert('Unable to delete task');

    taskList.splice(ind, 1);
    tasks.value = taskList;
}
</script>

<style scoped>
.bi {
    cursor: pointer;
}
</style>
