import {createRouter, createWebHistory} from "vue-router";
import BoardCreate from '@/views/board/BoardCreate.vue'
import MemberLogin from "@/views/member/MemberLogin.vue";
import BoardView from "@/views/board/BoardView.vue";
import BoardList from "@/views/board/BoardList.vue";
import HomeView from "@/views/HomeView.vue";
import BoardUpdate from "@/views/board/BoardUpdate.vue";

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name:'HomeView',
            component:HomeView
        },
        {
            path:'/boards',
            name:'BoardList',
            component:BoardList,
        },
        {
            path:'/board/create',
            name:'BoardCreate',
            component:BoardCreate,
        },
        {
            path:'/board/:id',
            name:'BoardView',
            component:BoardView,
        },
        {
            path:'/board/update/:id',
            name:'BoardUpdate',
            component:BoardUpdate,
        },
        {
            path:'/member/login',
            name:'MemberLogin',
            component:MemberLogin
        }
    ]
})

export default router;