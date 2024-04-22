import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
moment.locale('es-MX')

const app = createApp(App)  

app.use(store)
app.use(router)
app.config.globalProperties.$filters = {
    edad(fecha){
        if(!fecha) return ''
        fecha = moment().diff(moment(fecha), 'years')
        return fecha
      }
}
app.mount('#app')

import 'bootstrap/dist/js/bootstrap';


