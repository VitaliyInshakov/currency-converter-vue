<template lang="pug">
include ../lib/pugDeps.pug

+b.History
    +e.H3.header Recent conversions
    p(
        v-for="(item, index) in history"
        :key="index"
    ) {{item}}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class ExchangeHistory extends Vue {
    @State history!: string[];
}
</script>

<style scoped lang="scss">
.History {
    &__header {
        text-align: center;
    }
}
</style>