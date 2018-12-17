import Vue, { VNode } from "vue";
import app from "./app.vue";
import store from "./store";
import router from "./router";
import { sync } from "vuex-router-sync";

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