<template>
    <main class="container mt-1">
        <div class="row">
            <div class="col-12 m-auto mt-3">
                <UpcomingTasks />
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-4">
                <StatusTasks status="pending" color-class="info" />
            </div>
            <div class="col-4">
                <StatusTasks status="in-progress" color-class="success" />
            </div>
            <div class="col-4">
                <StatusTasks status="completed" color-class="dark" />
            </div>
        </div>
    </main>
</template>

<script setup>
import UpcomingTasks from '@/components/UpcomingTasks.vue';
import StatusTasks from '@/components/StatusTasks.vue';
</script>
