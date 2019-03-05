import create from "./index";
import Vue from "vue";

const { app, router, store } = create();

if(window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to) as any[];

    Promise.all(matched.map(c => {
        const methods = c.options.methods;
        
        if(methods.asyncData) {
            return methods.asyncData({ store, route: to });
        }
    }))
        
    .then(() => next())
    .catch(() => new Error("404 Not Found"));
}); 
 
router.onReady(() => app.$mount("#app"));