import {createRouter, createWebHistory} from "vue-router";
import Home from '@/pages/PageHome.vue';
import PageBoardCreate from '@/pages/board/PageBoardCreate.vue'

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
            name:'PageBoardCreate',
            component:PageBoardCreate,
        }
    ]
})

export default router;