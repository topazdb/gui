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
        sets: {}
    },

    actions: {
        getSets({ commit }, count, start = 0) {
            return axios.get("http://localhost/api/sets")
            
            .then(response => {
                for(let set of response.data) {
                    commit("setSet", set);
                }
            })
        }
    },

    mutations: {
        setSet(state, set) {
            Vue.set(state.sets, set.id, set);
        }
    }
});