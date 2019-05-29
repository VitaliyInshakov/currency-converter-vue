import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const loadView = (component: string) => () => import(/* webpackChunkName: "view-[request]" */ `@/views/${component}.vue`);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: loadView("Home"),
        },
        {
            path: "/choose-pair",
            name: "CurrencySelect",
            component: loadView("CurrencySelect"),
        },
        {
            path: "/result",
            name: "ResultPage",
            component: loadView("ResultPage"),
        },
    ],
});
