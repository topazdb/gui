<template>
    <div id="app">
        <header>
            <h1><a href="" rel="home">TopazDB</a></h1>
            <button v-if="$store.state.authenticated" v-on:click="logout()">Logout</button>
            <button v-else v-on:click="login()">Login</button>
        </header>

        <Announcement v-if="pending">
            Some scans may be missing until all X3P files have been processed.
            
            <div>
                <a class="btn" href="status">Check Status <i class="fas fa-chevron-right"></i></a>
            </div>
        </Announcement>

        <Announcement v-if="errored" class="critical">
            The database populator encountered an error.

            <div>
                <a class="btn" href="status">Check Status <i class="fas fa-chevron-right"></i></a>
            </div>
        </Announcement>

        <router-view></router-view>
    </div>
</template>

<style lang="scss">
    @import "./style.scss";

    header {
        display: flex;

        h1 {
            flex-basis: 90%;
        }

        button {
            flex-basis: 10%;
            font-size: 1.2em;
            text-transform: uppercase;
            background: none;
            border: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            color: white;
            cursor: pointer;

            &:hover {
                background: darken($primaryColor, 20%);
            }
        }
    }
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

        async login() {
            await this.$auth.authenticate("okta");
            Vue.set(this.$store.state, "authenticated", this.$auth.isAuthenticated());
        }

        async logout() {
            await this.$auth.logout();
            Vue.set(this.$store.state, "authenticated", this.$auth.isAuthenticated());
        }

        mounted() {
            this.$store.state.authenticated = this.$auth.isAuthenticated();
        }
    } 
</script>