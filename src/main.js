import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Meta from "vue-meta";
import store from "./store";

Vue.use(Meta);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
