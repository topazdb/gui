<template>
    <main class="status">
        <section class="status-populator">
            <h2>Populator Status: <span>{{ status.populator.message }}</span></h2>
            <p><strong>Processed Files:</strong> {{ status.populator.processedFiles }}</p>
            <p><strong>Errored Files:</strong> {{ status.populator.erroredFiles }}</p>
        </section>
    </main>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class Status extends Vue {
        asyncData({ store, route }) {
            return store.dispatch("getPopulatorStatus");
        }

        get status() {
            return this.$store.state.status;
        }
    }
</script>