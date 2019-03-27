import Vue from "vue";
import { Route } from "vue-router";
import Vuex, { Store } from "vuex";
import AxiosBase from "axios";


const URL = typeof location === "undefined" ? "http://api" : "/api";
const axios = AxiosBase.create({
    baseURL: URL,
    validateStatus: code => code === 200
});

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
        rundown: {},
        scans: {}
    },

    actions: {
        getSets({ commit }, count, start = 0) {
            return axios({
                url: "/sets",
                method: "get",
            })
            
            .then(response => {
                commit("clearSets");
                
                for(let set of response.data) {
                    commit("setSet", set);
                }
            })
        },

        getSet({ commit }, id) {
            return axios({
                url: `/sets/${id}`,
                method: "get",
            })
            
            .then(response => commit("setSet", response.data));
        },
        
        addSet({ commit }, set) {
            let json = JSON.stringify(set);

            return axios({
                url: `/sets`,
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                data: json,
            })

            .then(function (response) {
                commit("setSet", response.data);
            })

            .catch(function (error) {
                console.log(error);
            });
        },

        editSet({ commit }, param) {
            let id = param[0];
            let set = param[1];
            
            return axios({
                url: `/sets/${id}`,
                method: 'put',
                headers: { 'Content-Type': 'application/json'},
                data: {
                    id: id, 
                    set
                }
            })

            .then(function (response) {
                commit("setSet", response.data);
            })
            
            .catch(function (error) {
                console.log(error);
            });
        },
        /**
         * Removing a set
         */
        removeSet({ commit }, id) {
            return axios({
                url: `/sets/${id}`,
                method: "delete",
            });
        },

        /**
         * Rundown of a scan (barrel => bullet mappings)
         */
        getRundown({ commit }, id) {
            return axios({
                url: `/sets/${id}/rundown`,
                method: "get",
            })

            .then(response => 
                commit("setRundown", { 
                    id, 
                    rundown: response.data 
                })
            );
        },

        /**
         * Scans for a bullet
         */
        getScans({ commit }, { setId, barrelNo, bulletNo }) {
            return axios({
                url: `/sets/${setId}/${barrelNo}/${bulletNo}`,
                method: "get",

            })

            .then(response => 
                commit("setScans", { 
                    id: setId, 
                    scans: response.data 
                })
            );
        },

        /** 
         * Add scan to set
         */
        addScan({ commit }, scan) {
            return axios({
                url: `/scans`,
                method: 'post',
                headers: { 'Content-Type': 'application/json'},
                data: scan
            })
            
            .then(function (response) {
                commit("setScans", response.data);
            })
            
            .catch(function (error) {
                console.log(error);
            });
        },

        /** 
         * Add list of scans to set
         */
        addAllScans({ commit }, scans) {
            let json = JSON.stringify(scans);
            return axios({
                url: `/scans/addAll`,
                method: 'put',
                headers: { 'Content-Type': 'application/json'},
                data: json
            })
            
            .then(function (response) {
                commit("setScans", response.data);
            })
            
            .catch(function (error) {
                console.log(error);
            });
        },
    },
    

    mutations: {
        clearSets(state) {
            state.sets = {};
        },

        setSet(state, set) {
            Vue.set(state.sets, set.id, set);
        },

        setRundown(state, { id, rundown }) {
            Vue.set(state.rundown, id, rundown);
        },

        setScans(state, { id, scans }) {
            Vue.set(state.scans, id, scans)
        }
    }
});