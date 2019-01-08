import Vue from "vue";
import { Route } from "vue-router";
import Vuex, { Store } from "vuex";
import axios from "axios";

Vue.use(Vuex);

declare global {
    export interface DataParameters {
        store: Store<any>,
        route: Route
    }
}

export default new Store({
    state: {
        sets: {},
        scans: {}
    },

    actions: {
        getSets({ commit }, count, start = 0) {
            return axios.get("http://localhost/api/sets")
            
            .then(response => {
                for(let set of response.data) {
                    commit("setSet", set);
                }
            })
        },

        getSet({ commit }, name) {
            return axios.get(`http://localhost/api/sets/${name}`)
            
            .then(response => commit("setSet", response.data));
        }
    },

    mutations: {
        setSet(state, set) {
            set.formattedName = set.name.toLowerCase().replace(" ", "-");
            Vue.set(state.sets, set.formattedName, set);
        }
    }
});