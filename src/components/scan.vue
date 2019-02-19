<template>
    <main class="scan">
        <div class="set-head">
            <h1>{{ set.name }}</h1>
            <div class="row">
                <div class="set-creationDate">Created on <time>{{ set.creationDate | format }}</time></div> / 
                <div class="set-lastScanDate">Last updated: <time>{{ set.lastScanDate | format }}</time></div>
            </div>
        </div>
        <ul class="set-barrels scan-barrels grid no-grow">
                <li v-for="scan in scans" :key="scan.id">
                    <div></div>
                    <router-link :to="{ name: '' }">
                        <div class="barrel-number">{{ scan }}</div>
                    </router-link>
                </li>
        </ul>
    </main>
</template>

<style lang="scss">
    @import "../vars.scss";
        .scan {
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
        margin: 15px;

        li {
            font-size: 10px;
            text-align: center;
            font-weight: bold;
            line-height: 10px;
        }
    }


</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class Scan extends Vue {
        
        async asyncData({ store, route }: DataParameters) {
            let data = store.dispatch("getScansFromSet",[store.state.sets[route.params.name].id, parseInt(route.params.number)]);
            return data;
        }
        scanList=this.$store.state.scans;
        get scans() {
            var tempList;
            // for(var key in this.$store.state.scans){
            //     if (this.$store.state.scans.hasOwnProperty(key) ) {
            //         tempList = this.$store.state.scans[key];
            //         for(var key2 in tempList){
            //             if(tempList.hasOwnProperty(key2)){
            //                 var bulletNo = parseInt(this.$route.params.number);
            //                 if(tempList[key2].setId === this.set.id && tempList[key2].bulletNo === bulletNo){
            //                     this.scanList[key2] = tempList[key2];
            //                 }   
            //             }
            //         }
            //     }
            // }
            console.log(this.$store.state.scans);
            return this.$store.state.scans;
        }

        get set() {
            return this.$store.state.sets[this.$route.params.name];
        }

        get sets() {
            return this.$store.state.sets;
        }
    }
</script>

