<template>
    <main class="set">
        <div class="set-head">
            <h1>{{ set.name }}</h1>
            <div class="row">
                <div class="set-creationDate">Created on <time>{{ set.creationDate | format }}</time></div> / 
                <div class="set-lastScanDate">Last updated: <time>{{ set.lastScanDate | format }}</time></div>
            </div>
        </div>

        <router-view></router-view>
    </main>
</template>

<style lang="scss">
    @import "../../vars.scss";
    .header {
        margin-left: 25px;
        margin-right: 25px;
        margin-top: 25px;
        border-bottom: 3px solid #ccc;
        padding: 0 0 10px;
    }
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

    .barrels {
        li {

            h3 {
                text-decoration: none;
            }

            list-style-type: none;
        }
    }

    .bullets {
        margin: 15px;

        li {
            font-size: 30px;
            text-align: center;
            font-weight: bold;
            line-height: 90px;
            flex-basis: 10%;
        }
    }
</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class Set extends Vue {
        asyncData({ store, route }: DataParameters) {
            return store.dispatch("getSet", route.params.id);
        } 

        get set() {
            return this.$store.state.sets[this.$route.params.id];
        }
    }
</script>