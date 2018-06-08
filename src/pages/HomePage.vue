<template>
  <div>
    <h2>Vue Currency Exchange</h2>
    <form @submit.prevent="setAmount">
      <input type="number" placeholder="Введите сумму" min="0" v-model="amount">
      <div>
        <button type="submit">Посчитать</button>
        <button v-on:click="resetForm">Очистить</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  data() {
    return {
      amount: ''
    }
  },
  methods: {
    setAmount() {
      this.$store.dispatch('setAmount', this.amount);
      this.$router.push('/choose-pair');
    },
    resetForm: function(e) {
      e.preventDefault();
      this.amount = 0;
    }
  }
}
</script>

<style>

</style>
