import create from "./index";
import Vue from "vue";

void async function main() {
    const { app, router, store } = await create();

    if(window.__INITIAL_STATE__) {
        store.replaceState(window.__INITIAL_STATE__);
    }

    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to) as any[];

        Promise.all(matched.map(c => {
            const methods = c.options.methods;
            
            if(typeof methods !== "undefined" && typeof methods.asyncData !== "undefined") {
                return methods.asyncData({ store, route: to });
            }
        }))
            
        .then(() => next())
        .catch(() => new Error("404 Not Found"));
    }); 
    
    router.onReady(() => app.$mount("#app"));
}();
