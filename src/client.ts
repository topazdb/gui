import create from "./index";
import store from "./store";
import Vue from "vue";

const { app, router } = create();

if(window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

Vue.mixin({
    beforeMount() {
        //@ts-ignore
        const { asyncData } = this.$options;
        
        if(asyncData) {
            //@ts-ignore
            this.dataPromise = asyncData({
                //@ts-ignore
                store: this.$store,

                //@ts-ignore
                route: this.$route
            })
        }
    }
});

Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        //@ts-ignore
        const { asyncData } = this.$options;

        if(asyncData) {
            asyncData({
                // @ts-ignore
                store: this.$store,
                route: to
            }).then(next).catch(next);
        } else {
            next();
        }
    }
})

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);

        let diffed = false;
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = prevMatched[i] !== c);
        });

        if(!activated.length) return next();

        Promise.all(activated.map(c => {
            //@ts-ignore
            if(c.asyncData) return c.asyncData({ store, route: to });

        }))
        
        .then(() => next())
        .catch(() => new Error("404 Not Found"));
    });

    app.$mount("#app");
});