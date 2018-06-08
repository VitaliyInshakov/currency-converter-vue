<template>
  <div id="app">
    <div class="page">
      <router-view/>
    </div>
    <div class="sidebar">
      <exchange-history />
    </div>
  </div>
</template>

<script>
import ExchangeHistory from '@/components/ExchangeHistory';

export default {
  name: 'App',
  components: {
    ExchangeHistory
  },
  created: function() {
    this.$store.dispatch('getRates');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 30px auto;
  width: 75%;
  display: flex;
  flex-wrap: wrap;
}
.page {
  flex: 1 0 55%;
  box-sizing: border-box;
}
.sidebar {
  flex: 1 0 35%;
  box-sizing: border-box;
  background: #f5f5dc;
  margin-left: 10px;
  padding: 5px;
  text-align: left;
}
</style>
