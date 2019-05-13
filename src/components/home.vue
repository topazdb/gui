<template>
    <main>
        <div class="heading">
            <h1>Sets</h1>
            <div v-if="$store.state.authenticated" class="add-set-option">
                <a href="/setForm/add" class="btn btn-add-set"><i class="fas fa-plus"></i> Add Set</a>
            </div>
        </div>
        <div class="filters">
            <div class="searchbar">
                <input type="text" placeholder="Search By Name" v-model="searchBy"/>
            </div>
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
                <a v-bind:href="'sets/' + set.id">
                    <h3>{{ set.name }}</h3>
                    <div class="last-updated">Last updated: <time>{{ set.lastScanDate | format }}</time></div>
                    <div class="counts"><span>{{ set.barrelCount }}</span> Barrels, <span>{{ set.bulletCount }}</span> Bullets</div>
                </a>
            </li>
        </ul>
        <div class="paging">
            <button class="btn btn-paging" @click="prevPage"><i class="fas fa-chevron-left"></i></button>
            <button class="btn btn-paging" @click="nextPage"><i class="fas fa-chevron-right"></i></button>
        </div>
        
    </main>
</template>

<style lang="scss" scoped>
    @import "../vars.scss";

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
        color: black;
        border-radius: 5px;
        font-size: initial;
        width: 80px;
        padding: 5px;
        text-align: center;
        border-style: solid;
        border-width:thin;
    }

    .heading {
        padding: 0 10px;
        display: flex;
        flex-wrap: wrap;

        h1 {
            flex-basis: 80%;
            flex-grow: 1;
        }

        > div {
            flex-basis: 20%;
            flex-grow: 1;

            .btn {
                width: 100%;
                text-align: center;
            }
        }
    }
    .btn:hover {
        cursor: pointer;
    }

    .filters {
        border-radius: 5px;
        height: fit-content;
        margin: 10px;
        display: flex;
        flex-wrap: wrap;
        border: 1px solid $primaryColor;

        input, select, .btn {
            height: 50px;
            border-radius: 0;
            border: none;
        }

        .searchbar {
            display: inline;
            flex-basis: 80%;
            flex-grow: 1;

            input {
                padding: 0 10px;
                width: 100%;
                border-radius: 5px 0 0 5px;
            }
        }

        select {
            flex-basis: 10%;
            flex-grow: 1;

            &:last-child {
                border-radius: 0 5px 5px 0;
            }
        }

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
        searchBy = '';

        asyncData({ store, route }: DataParameters) {
            return store.dispatch("getSets");
        }

        get sets() {
            if(this.itemsPerPage < 100){
                return this.limitPages;
            }if(this.searchBy.length > 0){
                return this.search;
            }
            else {return this.setsList;}
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
        get search(){
            var result = {};
            var list = this.defaultSets;
            for (var key in list) {
                if (list.hasOwnProperty(key) && list[key].name.toLowerCase().includes(this.searchBy.toLowerCase())) {
                    result[key] = this.defaultSets[key];
                }
            }
            return result;
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
        
    };
</script>  