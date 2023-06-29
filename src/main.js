import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.config.productionTip = false;
app.use(router)
app.use(VueAxios, axios);
app.component('VueDatePicker', VueDatePicker);
app.mount('#app')
