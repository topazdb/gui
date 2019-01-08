<template>
    <main>
        <h1>Sets</h1>
        <ul class="grid">
            <li v-for="set in sets" :key="set.id">
                <router-link :to="{ name: 'set', params: { name: set.formattedName } }">
                    <h3>{{ set.name }}</h3>
                    <div class="last-updated">Last updated: <time>{{ set.lastScanDate | format }}</time></div>
                    <div class="counts"><span>{{ set.barrelCount }}</span> Barrels, <span>{{ set.bulletCount }}</span> Bullets</div>
                </router-link>
            </li>
        </ul>
    </main>
</template>

<style lang="scss" scoped>
    .last-updated {
        font-size: 0.8em;
        margin: 5px 0;
    }

    .counts {
        font-size: 0.9em;
        
        span {
            font-weight: bold;
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