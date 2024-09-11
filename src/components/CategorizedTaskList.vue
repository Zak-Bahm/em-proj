<template>
    <div class="card short-card-max" :class="`bg-${colorClass}-subtle`">
        <div class="card-header text-light" :class="`text-bg-${colorClass}`">
            <h3 class="card-title m-0">{{ category }}</h3>
        </div>
        <div class="card-body overflow-hidden">
            <ul class="list-group list-group-flush">
                <li v-for="(task, index) in tasks.slice(0, 7)" :key="index" class="list-group-item" :class="`bg-${colorClass}-subtle text-${colorClass}-emphasis`">
                    <div v-if="!pageView" class="row" >
                        <span class="col-10">{{ task.title }}</span>
                        <div class="col-1">
                            <i class="bi bi-pencil-square fs-5" @click="editTask(task)"></i>
                        </div>
                        <div class="col-1">
                            <i class="bi bi-trash-fill fs-5" @click="deleteTask(index)"></i>
                        </div>
                    </div>
                    <div v-if="pageView" class="row" >
                        <div class="col-10">
                            <h5>{{ task.title }}</h5>
                            <p>{{ task.description }}</p>
                        </div>
                        <div class="col-1">
                            <i class="bi bi-pencil-square fs-3" @click="editTask(task)"></i>
                        </div>
                        <div class="col-1">
                            <i class="bi bi-trash-fill fs-3" @click="deleteTask(index)"></i>
                        </div>
                    </div>
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
import { getLocalTasks, deleteLocalTask } from '@/methods/tasks';

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
function deleteTask(ind) {
    if (typeof ind === 'undefined') return;

    // remove from localstorage then ref
    const taskList = tasks.value;
    deleteLocalTask(taskList[ind]);
    taskList.splice(ind, 1);
    tasks.value = taskList;
}
</script>

<style scoped>
.bi {
    cursor: pointer;
}
</style>
