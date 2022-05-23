import 'virtual:windi.css';

import SimpleVueIcon from 'simple-vue-icon';
import { createApp } from 'vue';
import { plugin as VueInputAutowidth } from 'vue-input-autowidth';
import VueNotify from 'vue3-notify';

import App from './app.vue';

const app = createApp(App);
app.use(VueInputAutowidth as any);
app.use(VueNotify);
app.component('VueIcon', SimpleVueIcon);
app.mount('#app');
