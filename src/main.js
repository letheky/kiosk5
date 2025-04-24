import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import videoThumbnail from '@/directives/videoThumbnail.js'

import './style.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'

import router from './router/router.js'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.directive('video-thumbnail', videoThumbnail);
app.use(pinia)
app.use(router)
app.mount('#app')
