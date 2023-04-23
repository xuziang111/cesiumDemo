import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue'
import { createStore } from 'vuex'
const store = createStore({
    state () {
      return {
        count: 0,
        allCar:{},
        allStattion:{},
        allScore:{}
      }
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })
  
const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.mount('#app')

