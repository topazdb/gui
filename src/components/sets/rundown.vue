<template>
    <ul class="barrels">
        <li v-for="(bullets, barrel) in barrels" :key="barrel">
            <h3>{{ parseInt(barrel) === 0 ? "Unknowns" : `Barrel ${barrel}` }}</h3>
            
            <ul class="bullets grid no-grow">
                <li v-for="bullet in bullets" :key="bullet">
                    <router-link :to="{ path: `/sets/${setId}/${barrel}/${bullet}` }">
                        <div class="barrel-number">{{ bullet }}</div>
                    </router-link>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class Barrels extends Vue {
        asyncData({ store, route }) {
            return store.dispatch("getRundown", route.params.id);
        }

        get barrels() {
            console.log(this.$store.state.rundown);
            return this.$store.state.rundown[this.$route.params.id];
        }
        
        get setId() {
            return this.$route.params.id;
        }
    }
</script>