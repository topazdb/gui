<template>
    <main class="set">
        <div class="set-head">
            <h1>{{ set.name }}</h1>
            <div class="row">
                <div class="set-creationDate">Created on <time>{{ set.creationDate | format }}</time></div> 
                <div class="set-lastScanDate">Last updated on <time>{{ set.lastScanDate | format }}</time></div>
                <div class="opt" v-if="$store.state.authenticated">
                    <button class="btn add-scan" @click="editModeOn=true">Add Scan</button>
                    <button class="btn del" @click="remove">Delete Set</button>
                </div>
            </div>
            
        </div>
        <div class="edit" v-if="editModeOn">
            <ScanForm ></ScanForm>
            <button class="btn-scan save" @click="save">Save</button>
            <button class="btn-scan cancel" @click="cancel">Cancel</button>
        </div>
        
        <router-view></router-view>
    </main>
</template>

<style lang="scss">
    @import "../../vars.scss";
    .header {
        margin-left: 25px;
        margin-right: 25px;
        margin-top: 25px;
        border-bottom: 3px solid #ccc;
        padding: 0 0 10px;
    }
    .set {
        padding: 15px;

        .set-head {
            padding: 20px 0;
            border-bottom: 5px solid $primaryColor;
        }
    }

    .row {
        width: 100%;

        .opt {
            float:right;
        }
        .del, .add-scan {
            background: $primaryColor;
            border-radius: 5px;
            height: 30px;
            width: 130px;
            padding: 5px;
            margin: 0 5px;
            text-align: center;
            border-style: solid;
            border-width:thin;   
        }
        .del:hover, .add-scan:hover {
            cursor: pointer;
        }
        }    

    .barrels {
        li {

            h3 {
                text-decoration: none;
            }

            list-style-type: none;
        }
    }

    .bullets {
        margin: 15px;

        li {
            font-size: 30px;
            text-align: center;
            font-weight: bold;
            line-height: 90px;
            flex-basis: 10%;
        }
    }
    
    .edit {
        background: #eee;
        border-radius: 5px;
        margin-top: 10px;
        padding-bottom: 10px;
        .save {
            margin-left: 25px;
        }
        .cancel {
            margin-left: 10px;
        }
    }

</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import ScanForm from "./scanForm.vue"
     declare var require: any;

    Vue.component('ScanForm', ScanForm);

    @Component
    export default class Set extends Vue {
        editModeOn = false;

        asyncData({ store, route }: DataParameters) {
            return store.dispatch("getSet", route.params.id).then(
                () => store.dispatch("getInstruments")
            );
        } 

        get set() {
            return this.$store.state.sets[this.$route.params.id];
        }

        remove(){
            this.$store.dispatch("removeSet", this.set.id).then(
                () => this.$router.push({ name: 'home' })
            );
        }
         
        save(){
            this.editModeOn = false;
            let scans = (this.$children[1] as any).getScans();
            
            for(var key in scans){
                if (scans.hasOwnProperty(key)) {
                    scans[key].setId = this.set.id;
                }
            }
            let scanSet = {
                scans: scans
            }

            this.$store.dispatch("addAllScans", scanSet).then(
                () => this.$store.dispatch("getRundown", this.set.id)
            )
        }
        cancel() {
            this.editModeOn = false;
        }
    }
</script>