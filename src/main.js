import { createApp } from 'vue'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { supabase } from "./supabase"

import store from './store'
import router from './routes'

const app = createApp(App)

app.config.globalProperties.supabase = supabase;

app.use(store)
    .use(router)
    .mount('#app')




