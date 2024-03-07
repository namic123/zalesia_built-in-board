import {createRouter, createWebHistory} from "vue-router";
import Home from '@/pages/Home.vue';
import BoardCreate from '@/pages/board/BoardCreate.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name:'Home',
            component:Home
        },
        {
            path:'/board/create',
            name:'BoardCreate',
            component:BoardCreate,
        }
    ]
})

export default router;