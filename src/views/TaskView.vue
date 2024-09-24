<template>
    <main class="container mt-1">
        <div class="row">
            <div class="col-10 m-auto">
                <div class="mt-3 p-3 bg-secondary text-white rounded-start rounded-end d-flex justify-content-between align-items-center text-decoration-none">
                    <h3 class="m-0">Categorized Tasks</h3>
                    <i class="bi bi-list-task fs-3 text-light"></i>
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
    </main>
</template>

<script setup>
import CategorizedTaskList from '@/components/CategorizedTaskList.vue';
</script>
