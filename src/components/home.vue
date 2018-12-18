<template>
    <main>
        <h1>Sets</h1>
        <ul>
            <li v-for="set in sets" :key="set.id">
                <h3>{{ set.name }}</h3>
                <p>Created on {{ set.creationDate | format }}</p>
            </li>
        </ul>
    </main>
</template>

<style lang="scss" scoped>
    ul {
        display: flex;
        list-style-type: none;
        padding: 50px;

        li {
            flex-basis: 20%;
            flex-grow: 1;
            margin: 10px;
            height: 100px;
            padding: 15px;
            border-radius: 5px;
            background: #EEE;

            h3 {
                margin-bottom: 10px;
                text-transform: uppercase;
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
            //@ts-ignore
            return this.$store.state.sets;
        }
    }
</script>