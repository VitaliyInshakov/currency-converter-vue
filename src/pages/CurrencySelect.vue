<template>
  <div>
    <button class="btn">
      <router-link to="/">Назад</router-link>
    </button>
    <hr />
    <p v-if="hasError">Упс!!! Что то пошло не так! Не удалось загрузить список валют</p>
    <form @submit.prevent="doExchange" class="form_currencies" v-if="!hasError">
      <div v-for="(rate, idx) in rates" v-bind:key="idx + 'buy'">
        <input type="radio" :value="rate.ccy + '_' + rate.base_ccy + '_buy'" :id="rate.ccy + idx" v-model="picked">
        <label :for="rate.ccy + idx">{{rate.ccy}} to {{rate.base_ccy}}</label>
      </div>
      <div v-for="(rate, idx) in rates" v-bind:key="idx + 'sale'">
        <input type="radio" :value="rate.ccy + '_' + rate.base_ccy + '_sale'" :id="rate.base_ccy + idx" v-model="picked">
        <label :for="rate.base_ccy + idx">{{rate.base_ccy}} to {{rate.ccy}}</label>
      </div>
      <button type="submit">Обмен</button>
    </form>
    <hr />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'CurrencySelect',
  data() {
    return {
      picked: localStorage.getItem('lastCurrency') || ''
    }
  },
  computed: {
    ...mapGetters([
      'rates',
      'hasError'
    ])
  },
  methods: {
    doExchange() {
      this.$store.dispatch('doExchange', this.picked);
      this.$router.push('/result');
    }
  }
}
</script>
<style>
  .btn {
    display: flex;
  }
  .btn a {
    text-decoration: none;
    color: inherit;
  }
  .form_currencies {
    display: flex;
    flex-wrap: wrap;
  }
  .form_currencies div {
    flex: 1 0 50%;
    padding: 10px;
    box-sizing: border-box;
  }
</style>