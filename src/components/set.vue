<template>
    <div class="set">
        <h1>{{ set.name }}</h1>
    </div>
</template>

<style lang="scss">
    .set {
        padding: 15px;
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