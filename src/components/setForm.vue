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
                <button class="btn-set" form="set-add"><i class="fas fa-plus"></i> Add Set</button>  
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
        background: #eee;
        border-radius: 5px;
        .set-add{
            padding: 20px;
            border-bottom: 2px solid #FA8C2D
        }
        .btn-set {
            background: $primaryColor;
            border-radius: 0 0 5px 5px;
            height: 70px;
            width: 100%;
            padding: 25px;
            text-align: center;
            border-style: solid;
            border-width: thin;
            margin: 0;
            color: white;
            font-size: 20px;

        }
        .btn-set:hover {
            cursor: pointer;
            background: #bd5a04;
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