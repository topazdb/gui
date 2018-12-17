<template>
    <div id="app">
        <header>
            TopazDB
        </header>

        <router-view></router-view>
    </div>
</template>

<style lang="scss">
    @import "./style.scss";
</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class App extends Vue {} 
</script>