import Vue, { VNode } from "vue";
import app from "./app.vue";
import store from "./store";
import router from "./router";
import moment from "moment";
import { config } from "../package.json";
import { sync } from "vuex-router-sync";

Vue.filter("format", (date: string, never?: string) => {
    if(date === null) return never || "never";
    else return moment(date).format(config.dateFormat)
});

export default () => {
    sync(store, router);

    return {
        router,
        store,
        app: new Vue({
            router, 
            store,
            render: h => h(app)
        })
    }
};  