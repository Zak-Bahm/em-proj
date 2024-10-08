<template>
    <div class="card bg-primary-subtle" :class="pageView ? '' : 'tall-card-max'">
        <div class="card-header bg-primary text-light" v-if="!pageView">
            <a class="d-flex justify-content-between align-items-center text-light text-decoration-none" href="#"
                @click="() => rtr.push('/inbox')">
                <h3 class="card-title m-0">Inbox</h3>
                <i class="bi bi-envelope-open-fill fs-3 text-light"></i>
            </a>

            <div class="input-group mt-3">
                <input type="text" v-model="newTitle" class="form-control" placeholder="New Task Title"
                    aria-label="New Task Title" aria-describedby="button-addon2">
                <button class="btn btn-outline-info" type="button" id="button-addon2"
                    @click="async () => { await addTask() }">
                    <i class="bi bi-plus-square-fill fs-5 text-light"></i>
                </button>
            </div>
        </div>

        <div class="card-header bg-primary text-light" v-if="pageView">
            <a class="d-flex justify-content-between align-items-center text-light text-decoration-none" href="#"
                @click="editTask()">
                <h3 class="card-title m-0">Inbox</h3>
                <i class="bi bi-plus-square-fill fs-3 text-light"></i>
            </a>
        </div>

        <div class="card-body overflow-hidden">
            <ul class="list-group list-group-flush">
                <li v-for="(task, index) in pageView ? tasks : tasks.slice(0, 17)" :key="index"
                    class="list-group-item bg-primary-subtle text-primary-emphasis">
                    <div class="row">
                        <span class="col-10">
                            {{ task.title }}
                            <span class="badge rounded-pill text-bg-secondary" v-if="pageView">{{ task.status }}</span>
                        </span>
                        <div class="col-1">
                            <i class="bi bi-pencil-square fs-5" @click="editTask(task)"></i>
                        </div>
                        <div class="col-1">
                            <i class="bi bi-trash-fill fs-5" @click="deleteTask(task)"></i>
                        </div>
                    </div>
                </li>
                <li v-if="tasks.length == 0" class="list-group-item bg-primary-subtle text-primary-emphasis">
                    You have no pending tasks
                </li>
            </ul>
        </div>
        <TaskModal modal-id="newTaskListModal" :target-task="targetTask" />
        <DeleteModal modal-id="newTaskListDeleteModal" :target-task="targetTask" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TaskModal from './TaskModal.vue';
import { getLocalTasks, getRemoteTasks, saveLocalTask, saveRemoteTask, deleteLocalTask, deleteRemoteTask } from '@/methods/tasks';
import { useRouter } from 'vue-router'
import DeleteModal from './DeleteModal.vue';

const lcl = import.meta.env.VITE_LOCAL_ONLY === "true"
const rtr = useRouter();
const props = defineProps({
    pageView: Boolean
})

const newTitle = defineModel({ type: String })
const tasks = ref([])
const targetTask = ref({})

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
    const newTasks = lcl ? getLocalTasks('None', '!completed') : await getRemoteTasks('None', '!completed');
    tasks.value = newTasks;
}
async function addTask() {
    if (newTitle.value == '') return;

    const newTask = {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        title: newTitle.value,
        description: '',
        category: 'None',
        status: 'pending'
    }
    if (lcl) newTask.id = createdAt;

    const saved = lcl ? saveLocalTask(newTask) : await saveRemoteTask(newTask);
    if (!saved) return alert('Unable to save task');

    newTitle.value = ''
    await fetchTasks();
}
function editTask(task) {
    // set proper task value
    targetTask.value = { createdAt: Date.now(), updatedAt: Date.now(), title: '', description: '', category: 'None', status: 'pending' };
    if (typeof task !== 'undefined') targetTask.value = task;

    // load modal
    const modalElement = document.getElementById('newTaskListModal');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.show();
}

function deleteTask(task) {
    // set proper task value
    if (typeof task == 'undefined') return;
    targetTask.value = task;

    // load modal
    const modalElement = document.getElementById('newTaskListDeleteModal');
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modal.show();
}
</script>

<style scoped>
.bi {
    cursor: pointer;
}
</style>
