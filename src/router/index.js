import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InboxView from '../views/InboxView.vue'
import TaskView from '@/views/TaskView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/inbox',
            name: 'inbox',
            component: InboxView
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: TaskView
        }
    ]
})

export default router
