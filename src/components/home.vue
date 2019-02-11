<template>
    <main>
        <h1>Sets</h1>
        <div class="filters">
            <select @change="sort($event)" class="form-control dropdown" >
                    <option value="0" disabled selected>Sort By</option>
                    <option value="barrelCount">Barrel Count</option>
                    <option value="bulletCount">Bullet Count</option>
                    <option value="lastScanDate">Scan Date</option>
                    <option value="name">Name</option>
            </select>
            <select @change="filterNumItems($event)" class="form-control dropdown" >
                    <option value="0" disabled selected>Number Items</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="101">All</option>
            </select>
        </div>
        
        <ul class="grid">  
            <li v-for="set in sets" :key="set.id">
                <router-link :to="{ name: 'set', params: { name: set.formattedName } }">
                    <h3>{{ set.name }}</h3>
                    <div class="last-updated">Last updated: <time>{{ set.lastScanDate | format }}</time></div>
                    <div class="counts"><span>{{ set.barrelCount }}</span> Barrels, <span>{{ set.bulletCount }}</span> Bullets</div>
                </router-link>
            </li>
        </ul>
        <div class="paging">
            <button class="btn btn-paging" @click="prevPage">Previous</button>
            <button class="btn btn-paging" @click="nextPage">Next</button>
        </div>
        
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

    .filters {
        background: #EEE;
        border-radius: 5px;
        height:fit-content;
        padding: 10px;
        margin: 10px;
    }
    .dropdown {
        background: whitesmoke;
        border-radius: 5px;
        padding: 4px;
    }
    .paging {
        margin: 10px;
        float: right;
        display: inline;
    }
    .btn-paging {
        background: whitesmoke;
        border-radius: 5px;
        width: 80px;
        padding: 5px;
        text-align: center;
        border-style: solid;
        border-width:thin;
    }
    .btn-paging:hover {
        background: #d0d0d0;
    }
</style>

<script lang="ts">
    import Vue from 'vue';
    import Component from "vue-class-component";
    import Prop from 'vue-property-decorator';
    declare var require: any
    var _ = require('lodash');
    

    @Component
    export default class Home extends Vue {
        defaultSets = this.$store.state.sets;
        setsList = this.$store.state.sets;
        pageNumber=0;
        itemsPerPage=101;

        asyncData({ store, route }: DataParameters) {
            return store.dispatch("getSets");
        }

        get sets() {
            if(this.itemsPerPage < 100){
                return this.limitPages;
            }
            return this.setsList;
        }
        get pageCount(){
            let size = Object.keys(this.setsList).length;
            return Math.ceil(size/this.itemsPerPage);
        }
        get limitPages(){
            let start = this.pageNumber * this.itemsPerPage;
            let end = start + this.itemsPerPage;
            let newList = Object.keys(this.setsList).slice(start, end).reduce((result, key) => {
                    result[key] = this.setsList[key];

                    return result;
                }, {});
            return newList;
        }

        nextPage(){
            if(this.pageNumber+1 < this.pageCount){
                this.pageNumber++;
            }   
        }
        prevPage(){
            if(this.pageNumber-1 >= 0){
                this.pageNumber--;
            }
        }

        sort(option){
            let sel = option.target.value;
            if(sel == '0'){
                this.setsList = this.defaultSets;
            }else{
                this.setsList = _.orderBy(this.setsList, sel);
            }
        }

        filterNumItems(option){
            let sel = parseInt(option.target.value);
            this.pageNumber = 0;
            this.itemsPerPage = parseInt(option.target.value);
        }
        
    }
</script>  