import Vue from "vue";
import Router from "vue-router";
import { Home, Set } from "./components";


Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        { name: "home", path: '/', component: Home },
        { name: "set", path: '/sets/:name', component: Set }
    ]
}); 