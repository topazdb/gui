import create from "./index";

export default (context: any) => {
    return new Promise((resolve, reject) => {
        const { app, router } = create();
        router.push(context.url);

        router.onReady(() => {
            const matched = router.getMatchedComponents();
            if(!matched.length) return reject({ code: 404 });
            resolve(app);
        });
    });
}