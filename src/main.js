import {createApp} from 'vue'
import App from './App.vue'
import '@/assets/styles/index.css'
import router from "@/router/routes";
import {createPinia} from "pinia";
import {createPersistedState} from 'pinia-plugin-persistedstate'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faYoutube);

const pinia = createPinia();
pinia.use(createPersistedState({
    storage:localStorage,
    auto:true,
}))

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(pinia)
    .use(router)
    .mount('#app');
