<template>
    <main>
        <h1>Sets</h1>
        <ul>
            <li v-for="set in sets" :key="set.id">
                <router-link :to="{ name: 'set', params: { name: set.name } }">
                    <h3>{{ set.name }}</h3>
                    <p>Created on {{ set.creationDate | format }}</p>
                </router-link>
            </li>
        </ul>
    </main>
</template>

<style lang="scss" scoped>
    ul {
        display: flex;
        list-style-type: none;

        li {
            flex-basis: 20%;
            flex-grow: 1;
            margin: 10px;
            height: 100px;
            padding: 15px;
            border-radius: 5px;
            background: #EEE;

            a {
                text-decoration: none;
                cursor: pointer;
                display: block;
                height: 100%;
                width: 100%;
                color: black;

                h3 {
                    margin: 10px 0;
                    text-transform: uppercase;
                }
            }
        }
    }
</style>

<script lang="ts">
    import Vue from 'vue';
    import Component from "vue-class-component";

    @Component
    export default class Home extends Vue {
        asyncData({ store, route }: DataParameters) {
            return store.dispatch("getSets");
        }

        get sets() {
            return this.$store.state.sets;
        }
    }
</script>