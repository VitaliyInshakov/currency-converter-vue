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
import { Hash, Rates } from "../store";

@Component
export default class Result extends Vue {
    @State exchangeInfo!: Hash<Rates>;

    get exchangeResult(): string {
        return "";
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