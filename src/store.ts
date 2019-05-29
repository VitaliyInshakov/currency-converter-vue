import Vue from "vue";
import Vuex from "vuex";
import api from "@/lib/api";

Vue.use(Vuex);

interface State {
    rates: string[];
    hasError: boolean;
    amount: number;
    exchangeInfo: null | string;
    history: string[];
}

export default new Vuex.Store<State>({
    state: {
        rates: [],
        hasError: false,
        amount: 0,
        exchangeInfo: null,
        history: [],
    },
    mutations: {

    },
    actions: {
        async getRates({ commit }) {},
    },
});
