<template>
    <ul class="grid no-grow">
        <li v-for="subset in set.subsets" :key="subset.name">
            <a v-bind:href="'sets/' + subset.id">
                <h3>{{ set.childPrefix }} {{ subset.name }}</h3>
            </a>
        </li>
    </ul>
</template>

<style scoped>
    @import "../../vars.scss";

    
</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Prop from "vue-property-decorator";

    @Component({
        // @ts-ignore
        name: "rundown",
        props: ["set"]
    })
    export default class Rundown extends Vue {
        asyncData() {}
    }
</script>