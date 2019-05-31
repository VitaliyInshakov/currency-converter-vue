import Vue from "vue";
import Vuex from "vuex";
import * as lockr from "lockr";

import api from "@/lib/api";

Vue.use(Vuex);

interface State {
    rates: Rates[];
    hasError: boolean;
    amount: string;
    exchangeInfo: null | Hash<Rates>;
    history: string[];
}

export interface Rates {
    ccy: string;
    base_ccy: string;
    buy: string;
    sale: string;
}

export type Hash<T = string> = { [key: string]: T };

export default new Vuex.Store<State>({
    state: {
        rates: [],
        hasError: false,
        amount: "",
        exchangeInfo: null,
        history: lockr.get("history") || [],
    },
    mutations: {
        setRates(state, response: Rates[]) {
            state.rates = response;
        },
        setAmount(state, amount: string) {
            state.amount = amount;
        },
        setError(state) {
            state.hasError = true;
        },
        setExchange(state, payload) {
            state.exchangeInfo = payload;
        },
    },
    actions: {
        async getRates({ commit }) {
            const { response, errors } = await api.getRates();

            if (errors) {
                console.error(errors);
                commit("setError");

                return;
            }

            commit("setRates", response);
        },
        calculateExchange({state, commit}, { payload, buyOrSale }: {payload: Rates; buyOrSale: string;}) {
            const { buy, sale, ccy, base_ccy } = payload;

        },
    },
});
