<template>
    <main class="container d-flex align-items-center justify-content-center vh-100">
        <div class="row w-100">
            <div class="col-10 m-auto">
                Logging out...
            </div>
        </div>
    </main>
</template>

<style scoped>
/* Ensure the main container takes the full viewport height */
.vh-100 {
    height: 100vh;
}
</style>

<script setup>
import { onBeforeMount } from 'vue';
import { logoutUser } from '@/methods/users';
import { useRouter } from 'vue-router';

const lcl = import.meta.env.VITE_LOCAL_ONLY === "true"
const rtr = useRouter();


onBeforeMount(() => {
    if (lcl) return rtr.push('/');
    logoutUser()
})
</script>
