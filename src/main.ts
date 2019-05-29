import Vue from "vue";
import VueResource from "vue-resource";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.use(VueResource);

Vue.config.productionTip = process.env.NODE_ENV !== "production";
Vue.config.devtools = process.env.NODE_ENV !== "production";
Vue.config.performance = process.env.NODE_ENV !== "production";

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount("#app");
