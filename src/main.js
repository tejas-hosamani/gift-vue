import Vue from 'vue';
import App from './App.vue';
import head from './components/header/head.vue';
import body from './components/body/body.vue';
import foot from './components/footer/footer-info.vue';
import VueRouter from 'vue-router';
import Routes from './routes';

import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbvue/build/css/mdb.css';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

Vue.config.productionTip = false;

Vue.component('head-el', head);
Vue.component('body-el', body);
Vue.component('foot-el', foot);

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
