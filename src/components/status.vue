<template>
    <main class="status">
        <section class="populator">
            <h2>Populator Status: <span>{{ status.populator.message }}</span></h2>
            <p><strong>Processed Files:</strong> {{ status.populator.processedFiles }}</p>
            <p><strong>Errored Files:</strong> {{ status.populator.erroredFiles }}</p>

            <ul class="populator-errors">
                <li v-for="(errors, file) in status.populator.errors" :key="file" class="populator-error">
                    <h3>{{ file }}</h3>
                    
                    <ul>
                        <li v-for="(message, key) in errors" :key="key">{{ message }}</li>
                    </ul>
                </li>
            </ul>
        </section>
    </main>
</template>

<style scoped lang="scss">
    .populator-errors {
        list-style-type: none;
    }

    ul {
        padding: 15px;

        h3 {
            text-decoration: none;
        }
    }
</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class Status extends Vue {
        asyncData({ store, route }) {
            return store.dispatch("getPopulatorStatus")
                .then(() => store.dispatch("getPopulatorErrors"));
        }

        get status() {
            return this.$store.state.status;
        }
    }
</script>