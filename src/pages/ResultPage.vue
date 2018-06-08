<template>
  <div>
    <button class="btn">
      <router-link to="/">На Главную</router-link>
    </button>
    <hr />
    <p>Результат конвертации: {{exchangeInfo.result}} {{exchangeInfo.buyOrSale ? exchangeInfo.base_ccy : exchangeInfo.ccy}}</p>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'ResultPage',
    mounted () {
      this.calculateAmount();
    },
    methods: {
      ...mapActions([
        'calculateAmount'
      ])
    },
    computed: {
      ...mapGetters([
        'exchangeInfo'
      ])
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
</style>