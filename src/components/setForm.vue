<template>
    <main class="setForm">
        <div class="add-head">
            <h1>New Set</h1>
        </div>
        <div class="add-set">
            <form @submit.prevent="getSetValues" class="set-add" id="set-add">
                Set Name<br>
                <input type="text" name="name" required><br>
            </form>
            <ScanForm></ScanForm>
            <div class="footer-add">
                <button class="btn btn-set" form="set-add">Add set</button>  
            </div>
        </div>
                   
    </main>
</template>

<style lang="scss">
    @import "../vars.scss";
    .scan-add-header {
        text-decoration: none;
    }
    .add-set{
        background: #ccccccb5;
        border-radius: 5px;
        .set-add{
            padding: 20px;
        }
        .btn-set {
            background: whitesmoke;
            border-radius: 5px;
            height: 30px;
            width: 80px;
            padding: 5px;
            text-align: center;
            border-style: solid;
            border-width:thin;
        }
        
        .btn-set {
            margin: 20px;
        }
        .btn-set:hover {
            cursor: pointer;
        }
        input {
            height: 25px;
            width: 160px;
            border-radius: 4px;
            border-width: thin;
            border-style: solid;
            border-color: #ccc;
            padding: 2px;
        }
        .footer-add{
            text-align: center;
        }
    }
   

    
</style>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import ScanForm from "./sets/scanForm.vue"

    Vue.component('ScanForm', ScanForm);
    
    @Component
    export default class SetForm extends Vue {
       
        asyncData({ store, route }: DataParameters) {
        }
        add(set){
            this.$store.dispatch("addSet", set).then(
                () => this.$router.push({ name: 'home' })
            );
        }
        getSetValues(submitEvent){
            let set = {
                name: submitEvent.target.elements.name.value
            }
            let scans = (this.$children[0] as any).getScans();
            let setobj = {
                set: set,
                scans: scans
            }
            this.add(setobj);

            document.forms["set-add"].reset();
        }

    }
</script>