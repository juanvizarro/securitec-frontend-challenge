import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import antd from './plugins/antd'

const app = createApp(App)
app.use(antd)
app.mount('#app')
