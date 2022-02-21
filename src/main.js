import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from "axios";

createApp(App).use(ElementPlus).use(VueAxios, axios).mount('#app')
