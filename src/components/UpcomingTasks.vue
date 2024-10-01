<template>
    <div class="card bg-secondary-subtle">
        <div class="card-header bg-secondary text-light">
            <div class="d-flex justify-content-between align-items-center text-light text-decoration-none">
                <h3 class="card-title m-0">Upcoming Tasks</h3>
                <form>
                    <span>Show up to: </span>
                    <input type="date" v-model="dueDate"></input>
                </form>
            </div>
        </div>

        <div class="card-body overflow-hidden">
            <ul class="list-group list-group-flush">
                <li v-for="(task, index) in dueTasks" :key="index"
                    class="list-group-item bg-secondary-subtle text-secondary-emphasis">
                    <div class="row">
                        <span class="col-12 col-xl-8">
                            <span class="badge rounded-pill text-bg-dark">{{ task.dueDate }}</span>
                            {{ task.title }}
                        </span>
                        <div class="col-12 col-xl-2">
                            <p class="m-0">{{ task.category }}</p>
                        </div>
                        <div class="col-1">
                            <i class="bi bi-pencil-square fs-5" @click="editTask(task)"></i>
                        </div>
                        <div class="col-1">
                            <i class="bi bi-trash-fill fs-5" @click="async () => { await deleteTask(index) }"></i>
                        </div>
                    </div>
                </li>
                <li v-if="dueTasks.length == 0" class="list-group-item bg-secondary-subtle text-secondary-emphasis">
                    You have no upcoming tasks. Maybe try selecting another max end date.
                </li>
            </ul>
        </div>
        <TaskModal modal-id="upcomingTaskModal" :target-task="targetTask" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import TaskModal from './TaskModal.vue';
import { getLocalTasks, getRemoteTasks, saveLocalTask, saveRemoteTask, deleteLocalTask, deleteRemoteTask } from '@/methods/tasks';

const lcl = import.meta.env.VITE_LOCAL_ONLY === "true"

const dueDate = ref(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
const tasks = ref([])
const targetTask = ref({})

const dueTasks = computed(() => {
    return tasks.value.filter(task => new Date(task.dueDate) < new Date(dueDate.value));
});

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
    const newTasks = lcl ? getLocalTasks('', '!completed') : await getRemoteTasks('', '!completed');
    newTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    tasks.value = newTasks;
}
function editTask(task) {
    // set proper task value
    targetTask.value = { createdAt: Date.now(), updatedAt: Date.now(), title: '', description: '', category: 'None', status: 'pending' };
    if (typeof task !== 'undefined') targetTask.value = task;

    // load modal
    const modalElement = document.getElementById('upcomingTaskModal');
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
