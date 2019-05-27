import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: h => h(App),
} as any);

app.$mount("#app");
