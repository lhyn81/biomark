import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/display.css';
import "element-plus/dist/index.css"


createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app');
