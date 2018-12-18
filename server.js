const express = require("express");
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const VueSSR = require("vue-server-renderer");

const server = express();
var serverBundle, clientManifest, renderer;

function reload() {
    let result = cp.execSync("npm run build", { encoding: 'utf-8' });
    if(!result.match(/Build Complete/g)) return;

    delete require.cache[require.resolve("./dist/vue-ssr-server-bundle.json")];
    delete require.cache[require.resolve("./dist/vue-ssr-client-manifest.json")];
    
    serverBundle = require("./dist/vue-ssr-server-bundle.json");
    clientManifest = require("./dist/vue-ssr-client-manifest.json");
    renderer = VueSSR.createBundleRenderer(serverBundle, {
        runInNewContext: false,
        template: fs.readFileSync("./index.html", "utf-8"),
        clientManifest
    });
}

if(process.argv.includes("--watch")) {
    const watch = require("watch");
    watch.createMonitor(__dirname + "/src", monitor => {
        monitor.on("changed", () => {
            console.log("Source changed, reloading server");
            reload();
            console.log("Reload complete");
        });
    });
}

server.use("/dist", express.static(path.join(__dirname, "./dist")));

server.get("*", (req, res) => {
    const context = { url: req.url, meta: "", title: "TopazDB" };
    
    renderer.renderToString(context, (err, html) => {
        if(!err) return res.end(html);
        if(err.code === 404) res.status(404).end("Page not found");
        else res.status(500).end("Internal Server Error");
    });
});

reload();
server.listen(8080);