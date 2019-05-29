<template lang="pug">
include ../lib/pugDeps.pug

+b.History
    +e.H3.header Recent conversions
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ExchangeHistory extends Vue {

}
</script>

<style scoped lang="scss">
.History {
    &__header {
        text-align: center;
    }
}
</style>