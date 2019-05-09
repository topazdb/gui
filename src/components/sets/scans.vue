<template>
    <main class="Scans">
        <h2>Barrel {{ barrel }}, Bullet {{ bullet }}</h2>
        
        <ul class="scan-list no-grow">
            <li v-for="scan in scans" :key="scan.id">
                <h3>Scan by {{ scan.author.name }} on {{ scan.creationDate | format }}</h3>
                <div class="counts">
                    Threshold: <span> {{ scan.threshold }}</span> |
                    Resolution: <span> {{ scan.resolution }}</span> |
                    Magnification: <span>{{ scan.magnification }}</span>
                </div>
                <ul class="grid lands no-grow">
                    <li v-for="(landId, key) in scan.landIds" :key="landId">
                        <a v-bind:href="'/api/lands/' + landId ">{{ key + 1 }}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </main>
</template>

<style lang="scss">
    @import "../../vars.scss";

    h3 {
        text-decoration: underline;
    }
    
    .counts {
        font-size: 1.2em;
        font-weight: normal;
        text-align: left;
            
        span {
            font-weight: bold;
            line-height: 20px;
        }
    }

    .scans {
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

    .scan-list {
        margin: 0 auto;
        list-style-type: none;

        h3 {
            text-decoration: none;
        }

        .lands {
            margin: 15px 0;

            li {
                flex-basis: calc(90% / 6);
                font-size: 50px;
                text-align: center;
            }
        }
    }


</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    declare var require: any
    var _ = require('lodash');

    @Component
    export default class Scans extends Vue {
        asyncData({ store, route }: DataParameters) {
            return store.dispatch("getScans", {
                setId: route.params.id,
                barrelNo: route.params.barrel,
                bulletNo: route.params.bullet
            });
        }

        get scans() {
            var tempscans = this.$store.state.scans[this.$route.params.id];
            var bNum = this.bullet;
            var scanList = _.filter(tempscans, function(s) { 
                return s.bulletNo == bNum; 
            });
            return scanList;
        }

        get set() {
            return this.$store.state.sets[this.$route.params.id];
        }

        get sets() {
            return this.$store.state.sets;
        }

        get barrel() {
            return this.$route.params.barrel;
        }

        get bullet(){
            return this.$route.params.bullet;
        }

    }
</script>
