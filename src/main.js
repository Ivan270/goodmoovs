import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueYoutube from 'vue-youtube';
import 'animate.css/animate.min.css';

Vue.use(VueYoutube);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
