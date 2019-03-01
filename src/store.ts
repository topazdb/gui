import Vue from "vue";
import { Route } from "vue-router";
import Vuex, { Store } from "vuex";
import { encode } from "./util";
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
            return axios.get("http://api/sets", {
                validateStatus: code => code === 200
            })
            
            .then(response => {
                commit("clearSets");
                
                for(let set of response.data) {
                    commit("setSet", set);
                }
            })
        },

        getSet({ commit }, name) {
            return axios.get(`http://api/sets/${name.replace(/%2D/, "%252D")}`, { 
                validateStatus: code => code === 200 
            })
            
            .then(response => commit("setSet", response.data));
        }
    },

    mutations: {
        clearSets(state) {
            state.sets = {};
        },

        setSet(state, set) {
            set.formattedName = encode(set.name);
            Vue.set(state.sets, set.formattedName, set);
        }
    }
});