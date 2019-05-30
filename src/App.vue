<template lang="pug">
#app
    .baseLayout: router-view/
    .sidebar: ExchangeHistory/
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";
import ExchangeHistory from "@/components/ExchangeHistory.vue";

@Component({
    components: {
        ExchangeHistory,
    },
})
export default class App extends Vue {
    beforeMount() {
        this.getRates();
    }

    @Action getRates!: () => void;
}
</script>

<style lang="scss">
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
.baseLayout {
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
