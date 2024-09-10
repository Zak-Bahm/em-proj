<template>
    <div class="modal" tabindex="-1" :id="modalId">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="taskTitle" class="form-label">Task Title</label>
                            <input type="text" class="form-control" id="taskTitle" v-model="title">
                        </div>
                        <div class="mb-3">
                            <label for="taskDesc" class="form-label">Task Description</label>
                            <input type="textarea" class="form-control" id="taskDesc" v-model="desc">
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="taskCat">Task Category</label>
                            <select class="form-select" aria-label="Default select example" id="taskCat" v-model="cat">
                                <option v-for="(opt, index) in catOptions" :key="index" :value="opt"
                                    :selected="cat == opt ? 'true' : 'false'">
                                    {{ fullOptions[index] }}
                                </option>
                            </select>
                            <div class="row mt-3">
                                <div class="col-6" v-for="(label, index) in fullOptions" :key="index" >
                                    <div class="alert" :class="`alert-${colorOptions[index]}`" role="alert">
                                        {{ label }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const catOptions = ['ImportantUrgent', 'ImportantNotUrgent', 'NotImportantUrgent', 'NotImportantNotUrgent'];
    const fullOptions = ['Urgent + Important', 'Not Urgent + Important', 'Urgent + Not Important', 'Not Urgent + Not Important']
    const colorOptions = ['danger', 'warning', 'info', 'dark']


    const props = defineProps({
        modalId: String
    })

    const title = defineModel('title');
    const desc = defineModel('desc');
    const cat = defineModel('cat');
</script>
