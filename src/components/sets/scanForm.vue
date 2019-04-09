<template>
  <main class="scanForm">
    <div class="scan-add">
      <form @submit.prevent="getScanValues" class="scan-add-form" id="scan-add-form">
        <h3 class="scan-add-header">Scan</h3>
        <div class="scan-info">
          <div class="scan-add-input">
            <p>Barrel No</p>
            <input type="number" step="any" name="barrelNo" required>
          </div>
          <div class="scan-add-input">
            <p>Bullet No</p>
            <input type="number" step="any" name="bulletNo" required>
          </div>
          <div class="scan-add-input">
            <p>Magnification</p>
            <input type="number" step="any" name="magnification" required>
          </div>
          <div class="scan-add-input">
            <p>Threshold</p>
            <input type="number" step="any" name="threshold" required>
          </div>
          <div class="scan-add-input">
            <p>Resolution</p>
            <input type="number" step="any" name="resolution" required>
          </div>
        </div>
        <h4 class="scan-add-header">Instrument</h4>

        <select @change="changeOption($event)" class="form-control dropdown" >
              <option value="new">New</option>
              <option value="existing">Existing</option>
        </select>

        <div v-if="newinst" class="instrument-container">
          <div class="scan-add-input">
            <p>Serial No</p>
            <input type="text" name="sn" required>
          </div>
          <div class="scan-add-input">
            <p>Calibration Date</p>
            <input type="date" name="calDate" required>
          </div>

          <div class="scan-add-input">
            <p>Model</p>
            <input type="text" name="model" required>
          </div>
          <div class="scan-add-input">
            <p>Version</p>
            <input type="number" step="any" name="version" required>
          </div>
          <div class="scan-add-input">
            <p>Manufacturer</p>
            <input type="text" name="manufacturer" required>
          </div>
        </div>
        
        <div v-else>       
           <select class="form-control dropdown" v-model="selected" required>
              <option v-for="i in instruments" :key="i.id" :value="i.id"> SerialNo: {{i.serialNo}} - Calibrated: {{i.calibrationDate | format}}</option>
          </select>
        </div>

      </form>
      <button class="btn-scan btn-scan-add" form="scan-add-form">Add scan</button>
      <div class="adding">
        <p class="scan-add-placeholder" v-if="noScans">No Scans Added</p>
        <ul class="adding-list">
          <li class="adding-item" v-for="scan in tempScans" :key="scan.id">
            <h4>Scan</h4>
            <div class="adding-item-scan">
              <p>Barrel No: {{ scan.barrelNo }}</p>
              <p>Bullet No: {{ scan.bulletNo }}</p>
              <p>Magnification: {{ scan.magnification }}</p>
              <p>Threshold: {{ scan.threshold }}</p>
              <p>Resolution: {{ scan.resolution }}</p>
            </div>
            <div class="adding-item-ins">
              <p>Serial No: {{ scan.instrument.serialNo }}</p>
              <p>Model: {{ scan.instrument.type.model }}</p>
              <p>Version: {{ scan.instrument.type.version }}</p>
              <p>Manufacturer: {{ scan.instrument.type.manufacturer }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import "../../vars.scss";

.scanForm {
  padding: 0;
}
.scan-add-header {
  text-decoration: none;
}

.btn-scan {
  background: whitesmoke;
  border-radius: 5px;
  height: 30px;
  width: 80px;
  padding: 5px;
  text-align: center;
  border: 1px solid #ccc;
  margin: 5px;
}

.btn-scan:hover {
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
.footer-add {
  text-align: center;
}

.scan-add {
  width: 100%;
  padding-left: 20px;
  padding-top: 20px;
  background: #eee;
  .scan-add-form {
    h3 {
      margin-top: 5px;
    }
    .scan-info,
    .instrument-container {
      padding-bottom: 10px;
      margin-left: 5px;
    }
    .scan-add-input {
      display: inline-block;
      padding-right: 5px;
      padding-bottom: 5px;
    }
    .dropdown {
        background: whitesmoke;
        border-radius: 5px;
        padding: 4px;
        margin-bottom: 10px;
        margin-left: 5px;
    }
  }
  .adding {
    font-size: 12px;
    padding: 10px;
    text-decoration: underline;
    .adding-list{
        display: inline-block;
        .adding-item{
            display:inline-flex;
            padding: 15px;
            margin: 10px;
            background: whitesmoke;
            border-radius: 5px;
            border: 1px solid #FA8C2D;
            .adding-item-scan {
                padding-right: 15px;
                padding-left: 15px;
            }
        }
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ScanForm extends Vue {
  noScans = true;
  newinst = true;
  scans: Object[] = [];
  tscans: Object[] = [];
  selected = "";
  asyncData({ store, route }: DataParameters) {
    return store.dispatch("getInstruments");
  }

  get tempScans() {
    return this.tscans;
  }
  get instruments(){
    return this.$store.state.instruments;
  }
  changeOption(option){
      let sel = option.target.value;
      if(sel === "new"){
        this.newinst = true;
      }else{
        this.newinst = false;
      }
  }
  getScans() {
    return this.scans;
  }
  addScan(scan,tscan) {
    this.scans.push(scan);
    this.tscans.push(tscan);
  }
  getInstrument(submitEvent){
    let serialNo,calDate,model,version,manufacturer;
    let instrument;
    if(this.newinst){
        serialNo = submitEvent.target.elements.sn.value;
        calDate = new Date(submitEvent.target.elements.calDate.value);

        model = submitEvent.target.elements.model.value;
        version = parseInt(submitEvent.target.elements.version.value);
        manufacturer = submitEvent.target.elements.manufacturer.value;
        
        let instrumentType = {
          model: model,
          version: version,
          manufacturer: manufacturer
        };
        
        instrument = {
          serialNo: serialNo,
          calibrationDate: calDate,
          type: instrumentType
        };

    }else{
        return this.$store.state.instruments[parseInt(this.selected)];
    }
    return instrument;
  }
  getScanValues(submitEvent) {
    this.noScans = false;
    let barrelNo = parseFloat(submitEvent.target.elements.barrelNo.value);
    let bulletNo = parseFloat(submitEvent.target.elements.bulletNo.value);
    let magnification = parseInt(
      submitEvent.target.elements.magnification.value
    );

    let threshold = parseInt(submitEvent.target.elements.threshold.value);
    let resolution = parseInt(submitEvent.target.elements.resolution.value);
    let scan,tscan;
    let instrument = this.getInstrument(submitEvent);

    scan = {
        barrelNo: barrelNo,
        bulletNo: bulletNo,
        magnification: magnification,
        threshold: threshold,
        resolution: resolution, 
        authorId: 1 //Updating
    };
    //for display only
    tscan = {
        barrelNo: barrelNo,
        bulletNo: bulletNo,
        magnification: magnification,
        threshold: threshold,
        resolution: resolution, 
        authorId: 1 
    };
    if(this.newinst){
      scan.instrument = instrument;
    }else{
      scan.instrumentId = instrument.id;
      tscan.instrumentId = instrument.id;
    }
    tscan.instrument = instrument;
    
    this.addScan(scan,tscan);

    document.forms["scan-add-form"].reset();
  }
}
</script>