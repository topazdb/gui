<template>
    <div id="app">
        <header>
            <h1><a href="/" rel="home">TopazDB</a></h1>
        </header>

        <Announcement v-if="pending">
            Some scans may be missing until all X3P files have been processed.
            
            <div>
                <a class="btn" href="/status">Check Status <i class="fas fa-chevron-right"></i></a>
            </div>
        </Announcement>

        <Announcement v-if="errored" class="critical">
            The database populator encountered an error.

            <div>
                <a class="btn" href="/status">Check Status <i class="fas fa-chevron-right"></i></a>
            </div>
        </Announcement>

        <router-view></router-view>
    </div>
</template>

<style lang="scss">
    @import "./style.scss";
</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Announcement from "./components/announcement.vue";
    
    @Component({
        // @ts-ignore
        components: {
            Announcement
        }
    })
    export default class App extends Vue {
        get pending() {
            if(!this.$store.state.status.populator) return false;
            let code = Number(this.$store.state.status.populator.code);
            return code < 5;
        }

        get errored() {
            if(!this.$store.state.status.populator) return false;
            let code = Number(this.$store.state.status.populator.code);
            return code === 7;
        }
    } 
</script>