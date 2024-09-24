<script setup>
import NewTaskList from '@/components/NewTaskList.vue';
import CategorizedTaskList from '@/components/CategorizedTaskList.vue';
</script>

<template>
  <main class="container mt-1">
    <div class="row">
        <div class="col-12 col-lg-4 mt-3">
            <NewTaskList/>
        </div>

        <div class="col-12 col-lg-8">
            <div class="row">
                <div class="col-12">
                    <a class="mt-3 p-3 bg-secondary text-white rounded-start rounded-end d-flex justify-content-between align-items-center text-decoration-none" href="/tasks">
                        <h3 class="m-0">Categorized Tasks</h3>
                        <i class="bi bi-list-task fs-3 text-light"></i>
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 mt-3">
                    <CategorizedTaskList category="Urgent + Important" color-class="danger"/>
                </div>
                <div class="col-12 col-lg-6 mt-3">
                    <CategorizedTaskList category="Not Urgent + Important" color-class="warning"/>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-lg-6 mt-3">
                    <CategorizedTaskList category="Urgent + Not Important" color-class="info"/>
                </div>
                <div class="col-12 col-lg-6 mt-3">
                    <CategorizedTaskList category="Not Urgent + Not Important" color-class="dark"/>
                </div>
            </div>
        </div>
    </div>
  </main>
</template>
