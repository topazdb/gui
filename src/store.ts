import Vue from "vue";
import { Route } from "vue-router";
import Vuex, { Store } from "vuex";
import { encode } from "./util";
import axios from "axios";


const URL = typeof location === "undefined" ? "http://api" : "/api";

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
            return axios.get(`${URL}/sets`, {
                validateStatus: code => code === 200
            })
            
            .then(response => {
                commit("clearSets");
                
                for(let set of response.data) {
                    commit("setSet", set);
                }
            })
        },

        getSet({ commit }, id) {
            return axios.get(`${URL}/sets/${id}`, { 
                validateStatus: code => code === 200 
            })
            
            .then(response => commit("setSet", response.data));
        },

        getBarrels({ commit }, id) {
            return axios.get(`${URL}/sets/${id}/barrels`, {
                validateStatus: code => code === 200
            })

            .then(response => commit("setBarrels", { id, barrels: response.data }));
        }
    },

    mutations: {
        clearSets(state) {
            state.sets = {};
        },

        setSet(state, set) {
            Vue.set(state.sets, set.id, set);
        },

        setBarrels(state, { id, barrels }) {
            let set = state.sets[id];
            set.barrels = barrels;
            Vue.set(state.sets, set.id, set);
        }
    }
});