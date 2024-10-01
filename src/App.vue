<script setup>
import { useRouter, RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { getCurrentUser, isLoggedIn, logoutUser } from './methods/users';

const router = useRouter();
const userPresent = ref(false)
const name = ref('');
const email = ref('');
const lcl = ref(import.meta.env.VITE_LOCAL_ONLY === "true")

onMounted(() => {
    checkForUser();
});

// ensure we are logged in and redirect if not
function checkForUser() {
    if (!isLoggedIn()) return router.push('/login')

    const user = getCurrentUser();

    name.value = user["username"];
    email.value = user["email"];
    userPresent.value = true
}
</script>

<template>
    <nav v-if="userPresent"
        class="navbar navbar-expand-lg bd-navbar sticky-top bg-primary mt-3 rounded-start rounded-end border border-light border-3"
        data-bs-theme="dark">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Task Prioritization App</span>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#" @click="() => router.push('/')">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#"
                            @click="() => router.push('/upcoming')">Upcoming</a>
                    </li>
                    <li v-if="!lcl" class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#" @click="logoutUser">Logout</a>
                    </li>
                </ul>
                <span class="navbar-text" v-if="userPresent">
                    {{ name }} - {{ email }}
                </span>
            </div>
        </div>
    </nav>

    <RouterView />
</template>

<style></style>
