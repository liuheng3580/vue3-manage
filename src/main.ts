import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './style/tailwind.css'
import router from '@/router'
import Particles from 'particles.vue3'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App).use(Particles).use(pinia).use(router).mount('#app')
