<template>
  <div>
    <h3 class="header_history">Недавние конвертации</h3>
    <p v-for="(item, idx) in history" v-bind:key="idx">{{item}}</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ExchangeHistory',
  computed: {
    ...mapGetters([
      'history'
    ])
  }
}
</script>
<style>
  .header_history {
    text-align: center;
  }
</style>
