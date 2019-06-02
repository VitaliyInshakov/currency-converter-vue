<template lang="pug">
include ../lib/pugDeps.pug

+b.Result
    +e.BUTTON.btn: router-link(to="/") To main page
    hr/
    p {{exchangeResult}}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { Rates } from "../store";

@Component
export default class Result extends Vue {
    @State exchangeInfo!: Rates;

    get exchangeResult(): string {
        return `Result: ${this.exchangeInfo.result} ${this.exchangeInfo.tradeType === "buy" ? this.exchangeInfo.base_ccy : this.exchangeInfo.ccy}`;
    }
}
</script>

<style scoped lang="scss">
.Result {
    &__btn {
        display: flex;

        a {
            text-decoration: none;
            color: inherit;
        }
    }
}
</style>