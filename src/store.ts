import Vue from "vue";
import { Route } from "vue-router";
import Vuex, { Store } from "vuex";
import createAuth from "./auth";
import { removeTrailingSlash } from "./util";
import AxiosBase from "axios";

Vue.use(Vuex);

const HANDLED_SCHEMA_VERSION = 2;

declare global {
    export interface DataParameters {
        store: Store<any>,
        route: Route
    }
}

export default function createStore({ auth, env, apiBaseUrl }) {

    let axios = AxiosBase.create({
        baseURL: apiBaseUrl,
        validateStatus: code => code === 200,
        headers: {
            "Content-Type": "application/json",
        },
        transformRequest: [
            function(data, headers) {
                if(auth.isAuthenticated()) {
                    headers["Authorization"] = `Bearer ${auth.getToken()}`;
                }
            }
        ]
    });

    axios.interceptors.response.use(function(response) {
        let schemaVersion = 1;
        if("x-topaz-schema-version" in response.headers) {
            schemaVersion = parseInt(response.headers["x-topaz-schema-version"]);
        }

        if(schemaVersion !== HANDLED_SCHEMA_VERSION) {
            return Promise.reject("Unhandled schema version");
        }

        return response;
    });

    return new Store({
        state: {
            authenticated: auth.isAuthenticated(),
            sets: {},
            rundown: {},
            scans: {},
            status: {},
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
                    method: "post",
                    data: json,
                })

                .then(function (response) {
                    commit("setSet", response.data);
                })

                .catch(function (error) {
                    console.error(error);
                });
            },

            editSet({ commit }, param) {
                let id = param[0];
                let set = param[1];
                
                return axios({
                    url: `/sets/${id}`,
                    method: "put",
                    data: {
                        id: id, 
                        set
                    }
                })

                .then(function (response) {
                    commit("setSet", response.data);
                })
                
                .catch(function (error) {
                    console.error(error);
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
                    method: "post",
                    data: scan
                })
                
                .then(function (response) {
                    commit("setScans", response.data);
                })
                
                .catch(function (error) {
                    console.error(error);
                });
            },

            /** 
             * Add list of scans to set
             */
            addAllScans({ commit }, scans) {
                let json = JSON.stringify(scans);
                return axios({
                    url: `/scans/addAll`,
                    method: "put",
                    data: json
                })
                
                .then(function (response) {
                    commit("setScans", response.data);
                })
                
                .catch(function (error) {
                    console.error(error);
                });
            },

            /**
             * Get populator status
             */
            getPopulatorStatus({ commit }) {
                return axios({
                    url: "/status/populator",
                    method: "get"                
                })

                .then(response => 
                    commit("setPopulatorStatus", response.data)
                )
            },

            /**
             * Get populator errors
             */
            getPopulatorErrors({ commit }) {
                return axios({
                    url: "/status/populator/errors",
                    method: "get"
                })

                .then(response => 
                    commit("setPopulatorErrors", response.data)
                );
            }
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
            },

            setPopulatorStatus(state, status) {
                Vue.set(state.status, "populator", status);
            },

            setPopulatorErrors(state, errors) {
                let status = state.status["populator"] || {};
                status.errors = errors;
                Vue.set(state.status, "populator", status);
            }
        }
    });
}