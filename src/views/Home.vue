<template lang="pug">
include ../lib/pugDeps.pug

+b.Home
    +e.H2.header Vue Currency Exchange
    form(@submit.prevent="countForm")
        input(
            type="number"
            min="0"
            placeholder="Enter amount"
            v-model="amount"
        )
        +e.formButtons
            button(type="submit") Count
            button(@click="resetForm") Reset
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Mutation } from "vuex-class";

@Component
export default class Home extends Vue {
    amount: string = "";

    @Mutation setAmount!: (amount: string) => void;

    countForm(): void {
        this.setAmount(this.amount);
        this.$router.push("/choose-pair");
    }

    resetForm(e): void {
        e.preventDefault();
        this.amount = "";
    }
}
</script>

<style scoped lang="scss">
.Home {
    &__formButtons {
        margin-top: 1.5rem;
    }
}
</style>