<template>
    <main class="Scans">
        <ul class="set-barrels scan-barrels grid no-grow">
            <li v-for="scan in scans" :key="scan.id">
                <h3>Scan {{ scan.id }} by {{ scan.author.name }}</h3>
                <div class="counts">
                    Barrel: <span> {{ scan.barrelNo }}</span> 
                </div>
                <div class="counts">
                    Threshold: <span> {{ scan.threshold }}</span><br>
                    Resolution: <span> {{ scan.resolution }}</span><br>
                    Magnification: <span>{{ scan.magnification }}</span><br>
                </div>
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

    .scan-barrels {
        margin: 0 auto;
        display: table;
        li {
            font-size: 10px;
            text-align: center;
            font-weight: bold;
            line-height: 10px;
            display: inline-block;
            width: 200px;
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

        get bullet(){
            return this.$route.params.bullet;
        }

    }
</script>
