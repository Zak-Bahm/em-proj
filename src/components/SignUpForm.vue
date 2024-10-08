<template>
    <div class="card-container">
        <div class="card bg-primary-subtle tall-card-max">
            <div class="card-header bg-primary text-light">
                <div class="d-flex justify-content-between align-items-center text-light text-decoration-none">
                    <h3 class="card-title m-0">Sign Up for Task Prioritization App</h3>
                </div>
            </div>

            <div class="card-body">
                <div v-if="errorMsg.length > 0" class="alert alert-danger" role="alert">
                    {{ errorMsg }}
                </div>
                <form>
                    <div class="mb-3">
                        <label for="signUpName" class="form-label">Name</label>
                        <input type="input" class="form-control" id="signUpName" v-model="name">
                    </div>
                    <div class="mb-3">
                        <label for="signUpEmail" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="signUpEmail" aria-describedby="emailHelp" v-model="email">
                    </div>
                    <div class="mb-3">
                        <label for="signUpPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="signUpPassword" v-model="password">
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <button type="button" class="btn btn-primary" @click="async () => { await signUpAction() }">Sign Up</button>
                        <button type="button" class="btn btn-secondary" @click="() => rtr.push('/login')">Go to Login</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="alert" v-for="(color, index) in colorOptions" :key="index" :class="`shadow-${index} alert-${color}`" role="alert"></div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import { ref, onMounted, onUnmounted } from 'vue'
    import { getCurrentUser, signUpUser } from '../methods/users';

    const colorOptions = ['danger', 'warning', 'info', 'dark']
    const rtr = useRouter();

    const errorMsg = ref("")
    const name = defineModel("name")
    const email = defineModel("email")
    const password = defineModel("password")

    onMounted(() => {
        checkForUser();
    });

    // ensure we are not logged in and redirect if we are
    function checkForUser() {
        const user = getCurrentUser();
        if (user !== false) return window.location = '/'
    }

    async function signUpAction() {
        const isSignedUp = await signUpUser(name.value, email.value, password.value)

        if (isSignedUp) {
            return window.location = '/'
        } else {
            errorMsg.value = "Unable to sign up."
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
