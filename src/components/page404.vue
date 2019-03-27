<template>
    <main class="page-not-found">
        <div class="not-found-msg">
            <h4>Page not found</h4>
            <router-link :to="{ name: 'home' }"><p class="redirect">Home</p></router-link>
        </div>
                   
    </main>
</template>

<style lang="scss">
    @import "../vars.scss";
   .not-found-msg {
       text-align: center;    
       .redirect {
            font-size: 14px;
        }
        .redirect:hover {
            cursor: pointer;
        }
   }
    
</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    
    @Component
    export default class PageNotFound extends Vue {
        asyncData({ store, route }: DataParameters) {
        }      

    }
</script>