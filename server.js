const express = require("express");
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const VueSSR = require("vue-server-renderer");

const server = express();
var serverBundle, clientManifest, renderer;

function exec(command) {
    return new Promise((resolve, reject) => {
        cp.exec(command, { encoding: 'utf-8' }, (error, stdout, stderr) => {
            if(error) reject(stderr);
            else resolve(stdout);
        })
    });
}

async function reload() {
    let result = await exec("npm run build");
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
        monitor.on("changed", async () => {
            console.log("Source changed, reloading server");
            await reload();
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
server.listen(80);