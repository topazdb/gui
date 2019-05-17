import Vue from "vue";
import create from "./index";

declare var global;

export default (context: any) => {
    return new Promise(async (resolve, reject) => {

        const { app, router, store, mode } = await create({
            env: "node",
            cookies: context.cookies,
            apiBaseUrl: "http://api",
        });
        
        if(mode === "maintenance") {
            return reject({ code: 503 });
        }

        router.push(context.url);

        router.onReady(() => {
            const matched = router.getMatchedComponents() as any;
            if(matched.length === 0) return reject({ code: 404 });

            Promise.all(matched.map(component => {
                const methods = component.options.methods;

                if(methods.asyncData) {
                    return methods.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
            })).then(() => {
                context.state = store.state;
                resolve(app);

            }).catch(() => reject({ code: 404 }));

        }, reject);
    });
}