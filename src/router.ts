import Vue from "vue";
import Router from "vue-router";
import { Home, SetForm, ScanForm, PageNotFound } from "./components";
import { Set, Rundown, Scans } from "./components/sets";


Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        
        { name: "home", path: '/', component: Home },

        {   
            path: '/setForm/add', 
            component: SetForm, 
            children: [
                { name: 'scanFormAdd', path: '/setForm/add', component: ScanForm}
            ]
        },

        { 
            path: '/sets/:id', 
            component: Set,
            children: [
                { path: '/', component: Rundown },
                { name: 'scans', path: '/:barrel/:bullet', component: Scans },
                { name: 'scanFormSet', path: '/sets/:id', component: ScanForm }
            ]
        },
        { path: '*', component: PageNotFound}
    ]
}); 