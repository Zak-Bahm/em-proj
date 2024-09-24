<script setup>
    import { useRouter, RouterView } from 'vue-router'
    import { ref, onMounted, onUnmounted } from 'vue'
    import { getCurrentUser, logoutUser  } from './methods/users';

    const router = useRouter();
    const isLoggedIn = ref(false)

    onMounted(() => {
        checkForUser();
    });

    // ensure we are logged in and redirect if not
    function checkForUser() {
        const user = getCurrentUser();
        if (user === false) return router.push('/login')

        isLoggedIn.value = true
    }
</script>

<template>
    <nav v-if="isLoggedIn" class="navbar navbar-expand-lg bd-navbar sticky-top bg-primary mt-3 rounded-start rounded-end border border-light border-3" data-bs-theme="dark">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Eisenhower Matrix</span>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#" @click="() => router.push('/')">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#" @click="logoutUser">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <RouterView />
</template>

<style>
</style>
