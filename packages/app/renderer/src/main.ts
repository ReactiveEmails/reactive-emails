import 'virtual:windi.css';
import 'tippy.js/dist/tippy.css';

import SimpleVueIcon from 'simple-vue-icon';
import { createApp } from 'vue';
import { VueLionPlugin } from 'vue-lion';
import VueNotify from 'vue3-notify';

import App from '~r/app.vue';

const app = createApp(App);
app.use(VueLionPlugin);
app.use(VueNotify);
app.component('VueIcon', SimpleVueIcon);
app.mount('#app');
