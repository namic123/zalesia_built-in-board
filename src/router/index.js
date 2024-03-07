import {createRouter, createWebHistory} from "vue-router";
import Home from '@/pages/PageHome.vue';
import BoardCreate from '@/pages/board/BoardCreate.vue'
import MemberLogin from "@/pages/member/MemberLogin.vue";
import MemberSignUp from "@/pages/member/MemberSignUp.vue";

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
        },
        {
            path:'/member/login',
            name:'MemberLogin',
            component:MemberLogin
        },
        {
            path:'/member/signup',
            name:'MemberSignUp',
            component:MemberSignUp,
        },
    ]
})

export default router;