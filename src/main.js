import {createApp} from 'vue'
import App from './App.vue'
import '@/assets/styles/index.css'
import router from "@/router/routes";
import {createPinia} from "pinia";

const pinia = createPinia();

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app');
