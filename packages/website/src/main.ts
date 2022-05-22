import 'quasar/src/css/index.sass';
import 'virtual:windi.css';

import { Notify, Quasar } from 'quasar';
import SimpleVueIcon from 'simple-vue-icon';
import { createApp } from 'vue';
import { plugin as VueInputAutowidth } from 'vue-input-autowidth';

import App from './app.vue';

const app = createApp(App);
app.use(VueInputAutowidth as any);
app.use(Quasar as any, {
	plugins: {
		Notify,
	},
});
app.use(SimpleVueIcon as any);
app.mount('#app');
