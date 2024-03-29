import {createApp} from 'vue'
import App from './App.vue'
import '@/assets/styles/index.css'
import router from "@/router/routes";
import {createPinia} from "pinia";
import {createPersistedState} from 'pinia-plugin-persistedstate'
import { VueSpinnersPlugin } from 'vue3-spinners';


const pinia = createPinia();
pinia.use(createPersistedState({
    storage:localStorage,
    auto:true,
}))

createApp(App)
    .use(pinia)
    .use(VueSpinnersPlugin)
    .use(router)
    .mount('#app');
