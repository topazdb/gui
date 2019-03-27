<template>
    <div id="app">
        <header>
            <h1><a href="/" rel="home">TopazDB</a></h1>
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