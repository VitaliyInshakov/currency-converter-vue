import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as types from './mutations-types'

const API = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';

Vue.use(Vuex);

const state = {
  rates: [],
  hasError: false,
  amount: 0,
  exchangeInfo: null,
  history: []
}

const mutations = {
  [types.GET_REQUEST_SUCCESS] (state, payload) {
    state.rates = payload;
    state.hasError = false;
  },
  [types.GET_REQUEST_FAILURE] (state) {
    state.hasError = true;
  },
  [types.SET_AMOUNT_CURRENCY] (state, payload) {
    state.amount = payload;
  },
  [types.GET_EXCHANGE] (state, payload) {
    state.exchangeInfo = payload;
  },
  [types.SET_HISTORY_RECORD] (state, payload) {
    state.history = payload;
  },
  initialiseStore (state) {
    if (localStorage.getItem('history')) {
      state.history = JSON.parse(localStorage.getItem('history'));
    }
  }
}

const actions = {
  getRates ({ commit }) {
    return axios.get(API)
      .then(response => commit(types.GET_REQUEST_SUCCESS, response.data))
      .catch(error => commit(types.GET_REQUEST_FAILURE))
  },
  setAmount ({ commit }, amount) {
    commit(types.SET_AMOUNT_CURRENCY, amount);
  },
  doExchange ({ state, commit }, picked) {
    const info = picked.split('_');
    let result = state.rates.find(rate => rate.ccy === info[0] && rate.base_ccy === info[1]);
    commit(types.GET_EXCHANGE, {...result, buyOrSale: info[info.length-1] === 'buy'});
  },
  calculateAmount ({ state, commit }) {
    const { buyOrSale, buy, sale, ccy, base_ccy } = state.exchangeInfo;
    const exchangeResult = (buyOrSale ? state.amount * buy : state.amount / sale).toFixed(2);

    let dateHistory = new Date(new Date().getTime()).toLocaleDateString();
    let historyRecord = state.history;
    historyRecord.push(`${dateHistory} : ${state.amount} ${buyOrSale ? ccy : base_ccy} = ${exchangeResult} ${!buyOrSale ? ccy : base_ccy}`);
    commit(types.GET_EXCHANGE, {...state.exchangeInfo, result: exchangeResult });
    commit(types.SET_HISTORY_RECORD, historyRecord);
  }
}

const getters = {
  rates: (state) => state.rates,
  hasError: (state) => state.hasError,
  exchangeInfo: (state) => state.exchangeInfo,
  history: (state) => state.history
}

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});

store.subscribe((mutation, state) => {
  localStorage.setItem('history', JSON.stringify(state.history));
  if (state.exchangeInfo) {
    const lastChange = `${state.exchangeInfo.ccy}_${state.exchangeInfo.base_ccy}_${state.exchangeInfo.buyOrSale ? 'buy' : 'sale'}`;
    localStorage.setItem('lastCurrency', lastChange);
  }
});

export default store;