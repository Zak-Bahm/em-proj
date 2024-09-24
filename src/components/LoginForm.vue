<template>
    <div class="card-container">
        <div class="card bg-primary-subtle tall-card-max">
            <div class="card-header bg-primary text-light">
                <div class="d-flex justify-content-between align-items-center text-light text-decoration-none">
                    <h3 class="card-title m-0">Eisenhower Matrix</h3>
                </div>
            </div>

            <div class="card-body">
                <div v-if="errorMsg.length > 0" class="alert alert-danger" role="alert">
                    {{ errorMsg }}
                </div>
                <form>
                    <div class="mb-3">
                        <label for="loginEmail" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp" v-model="email">
                    </div>
                    <div class="mb-3">
                        <label for="loginPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="loginPassword" v-model="password">
                    </div>
                    <button type="button" class="btn btn-primary" @click="async () => { await loginAction() }">Login</button>
                </form>
            </div>
        </div>

        <div class="alert" v-for="(color, index) in colorOptions" :key="index" :class="`shadow-${index} alert-${color}`" role="alert"></div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import { ref, onMounted, onUnmounted } from 'vue'
    import { getCurrentUser, loginUser } from '../methods/users';

    const colorOptions = ['danger', 'warning', 'info', 'dark']
    const router = useRouter();

    const errorMsg = ref("")
    const email = defineModel("email")
    const password = defineModel("password")

    onMounted(() => {
        checkForUser();
    });

    // ensure we are not logged in and redirect if we are
    function checkForUser() {
        const user = getCurrentUser();
        if (user !== false) return router.push('/')
    }

    async function loginAction() {
        const isLoggedIn = await loginUser(email.value, password.value)

        if (isLoggedIn) {
            return router.push('/')
        } else {
            errorMsg.value = "Unable to log in. Please check your email and password."
        }
    }
</script>

<style scoped>
.card-container {
    position: relative;
    display: inline-block;
    width: 100%;
}

.card {
    position: relative;
    z-index: 2; /* Ensure the card is on top */
}

.shadow-0, .shadow-1, .shadow-2, .shadow-3 {
    position: absolute;
    width: 80%; /* Adjust size as needed */
    height: 20vh; /* Adjust size as needed */
    z-index: 1; /* Behind the card */
}

.shadow-0 {
    top: 0;
    left: 0;
    transform: translate(-40%, -50%);
}

.shadow-1 {
    top: 0;
    right: 0;
    transform: translate(40%, -50%);
}

.shadow-2 {
    bottom: 0;
    left: 0;
    transform: translate(-40%, 50%);
}

.shadow-3 {
    bottom: 0;
    right: 0;
    transform: translate(40%, 50%);
}
</style>
