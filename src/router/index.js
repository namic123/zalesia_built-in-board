import {createRouter, createWebHistory} from "vue-router";
import Home from '@/pages/PageHome.vue';
import BoardCreate from '@/pages/board/BoardCreate.vue'
import MemberLogin from "@/pages/member/MemberLogin.vue";

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name:'Home',
            component:Home
        },
        {
            path:'/member/login',
            name:'MemberLogin',
            component:MemberLogin
        },
        {
            path:'/board/create',
            name:'BoardCreate',
            component:BoardCreate,
        }
    ]
})

export default router;