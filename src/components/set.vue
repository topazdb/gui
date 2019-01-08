<template>
    <main class="set">
        <div class="set-head">
            <h1>{{ set.name }}</h1>
            <div class="row">
                <div class="set-creationDate">Created on <time>{{ set.creationDate | format }}</time></div> / 
                <div class="set-lastScanDate">Last updated: <time>{{ set.lastScanDate | format }}</time></div>
            </div>
        </div>
        <ul class="set-barrels grid no-grow">
            <li v-for="barrel in set.barrelCount" :key="barrel">
                <router-link :to="{ name: 'barrels', params: { number: barrel } }">
                    <div class="barrel-number">{{ barrel }}</div>
                </router-link>
            </li>
        </ul>
    </main>
</template>

<style lang="scss">
    @import "../vars.scss";

    .set {
        padding: 15px;

        .set-head {
            padding: 20px 0;
            border-bottom: 5px solid $primaryColor;
        }
    }

    .row {
        div {
            display: inline-block;
            margin: 0 15px;

            &:first-of-type {
                margin-left: 0;
            }
        }
    }    

    .set-barrels {
        margin: 15px;

        li {
            font-size: 50px;
            text-align: center;
            font-weight: bold;
            line-height: 90px;
        }
    }
</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class Set extends Vue {
        asyncData({ store, route }: DataParameters) {
            return store.dispatch("getSet", route.params.name);
        }

        get set() {
            return this.$store.state.sets[this.$route.params.name];
        }
    }
</script>