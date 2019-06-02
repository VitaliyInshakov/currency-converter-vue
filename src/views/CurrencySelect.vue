<template lang="pug">
include ../lib/pugDeps.pug

+b.CurrencySelect
    +e.BUTTON.btn: router-link(to="/") Back
    hr/
    p(v-if="hasError") Whoops!!!Something went wrong! Couldn't load currency list
    +e.FORM.form(v-else @submit.prevent="submitExchange")
        div(v-for="(rate, index) in rates" :key="`${index}_buy`")
            label {{rate.ccy}} to {{rate.base_ccy}}
                input(
                    type="radio"
                    :value="`${rate.ccy}_${rate.base_ccy}_buy`"
                    v-model="picked"
                )
        div(v-for="(rate, index) in rates" :key="`${index}_sale`")
            label {{rate.base_ccy}} to {{rate.ccy}}
                input(
                    type="radio"
                    :value="`${rate.ccy}_${rate.base_ccy}_sale`"
                    v-model="picked"
                )
        button(type="submit") Exchange
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import * as lockr from "lockr";
import { Rates } from "@/store";

@Component
export default class CurrencySelect extends Vue {
    picked: string = lockr.get("lastCurrency") || "";

    @State rates!: Rates[];
    @State hasError!: boolean;

    @Action calculateExchange!: (o: {payload: Rates; buyOrSale: string;}) => void;

    submitExchange(): void {
        const info = this.picked.split("_");
        const buyOrSale: string = info[info.length-1];

        const result = this.rates.find(({ ccy, base_ccy }) => ccy === info[0] && base_ccy === info[1])!;

        this.calculateExchange({payload: result, buyOrSale});

        this.$router.push("/result");
    }
}
</script>

<style scoped lang="scss">
.CurrencySelect {
    &__btn {
        display: flex;

        a {
            text-decoration: none;
            color: inherit;
        }
    }

    &__form {
        display: flex;
        flex-wrap: wrap;

        div {
            flex: 1 0 50%;
            padding: 10px;
            box-sizing: border-box;
        }
    }
}
</style>