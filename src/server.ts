import create from "./index";

export default (context: any) => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = create();
        router.push(context.url);

        router.onReady(() => {
            const matched = router.getMatchedComponents();
            if(!matched.length) return reject({ code: 404 });

            Promise.all(matched.map(component => {
                //@ts-ignore
                if(component.options.methods.asyncData) {
                    //@ts-ignore
                    return component.options.methods.asyncData({
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