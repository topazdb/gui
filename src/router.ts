import Vue from "vue";
import Router from "vue-router";
import { Home } from "./components";
import { Set, Rundown, Scans } from "./components/sets";


Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        { name: "home", path: '/', component: Home },
        { 
            path: '/sets/:id', 
            component: Set,
            children: [
                { path: '', component: Rundown },
                { path: ':barrel/:bullet', component: Scans }
            ]
        }
    ]
}); 