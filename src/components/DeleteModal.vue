<template>
    <div class="modal" tabindex="-1" :id="modalId">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Deletion</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this task?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" @click="async () => { await deleteTask() }">Delete Task</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { deleteLocalTask, deleteRemoteTask } from '@/methods/tasks';
import { defineProps } from 'vue';

const lcl = import.meta.env.VITE_LOCAL_ONLY === "true"

const props = defineProps({
    modalId: String,
    targetTask: Object
})

async function deleteTask() {
    const task = props.targetTask
    if (typeof task === 'undefined') return alert('No task found');

    const deleted = lcl ? deleteLocalTask(task) : await deleteRemoteTask(task);
    if (!deleted) alert('Unable to delete task');

    // hide modal
    const modal = bootstrap.Modal.getInstance(document.getElementById(props.modalId));
    modal.hide();
}
</script>

<style scoped>
.alert {
    cursor: pointer;
}
</style>
