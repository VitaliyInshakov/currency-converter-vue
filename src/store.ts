import Vue from "vue";
import Vuex from "vuex";
import * as lockr from "lockr";

import api from "@/lib/api";

Vue.use(Vuex);

interface State {
    rates: Rates[];
    hasError: boolean;
    amount: string;
    exchangeInfo: null | Rates;
    history: string[];
}

export interface Rates {
    ccy: string;
    base_ccy: string;
    buy: string;
    sale: string;
    result?: number;
    tradeType?: string;
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
        setHistory(state, history) {
            state.history = [
                ...state.history,
                history,
            ];
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
            const isBuy = buyOrSale === "buy";
            const exchangeResult = (isBuy
                ? +state.amount * +buy
                : +state.amount / +sale
            ).toFixed(2);
            const dateHistory = new Date(new Date().getTime()).toLocaleDateString();
            const historyRecord = `${dateHistory} : ${state.amount} ${isBuy ? ccy : base_ccy} = ${exchangeResult} ${!isBuy ? ccy : base_ccy}`;

            commit("setHistory", historyRecord);
            lockr.set("history", state.history);

            localStorage.setItem('lastCurrency', `${ccy}_${base_ccy}_${buyOrSale}`);

            commit("setExchange", {
                ...payload,
                result: exchangeResult,
                tradeType: buyOrSale,
            });
        },
    },
});
