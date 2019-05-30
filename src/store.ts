import Vue from "vue";
import Vuex from "vuex";
import * as lockr from "lockr";

import api from "@/lib/api";

Vue.use(Vuex);

interface State {
    rates: string[];
    hasError: boolean;
    amount: string;
    exchangeInfo: null | string;
    history: string[];
}

export default new Vuex.Store<State>({
    state: {
        rates: [],
        hasError: false,
        amount: "",
        exchangeInfo: null,
        history: lockr.get("history") || [],
    },
    mutations: {
        setRates(state, response: string[]) {
            state.rates = response;
        },
        setAmount(state, amount: string) {
            state.amount = amount;
        },
    },
    actions: {
        async getRates({ commit }) {
            const { response, errors } = await api.getRates();

            if (errors) {
                console.error(errors);
                return;
            }

            commit("setRates", response);
        },
    },
});
