import Vue, { VNode } from "vue";
import app from "./app.vue";
import router from "./router";

export default () => {
    return {
        router,
        app: new Vue({
            router,
            render: h => h(app)
        })
    }
};