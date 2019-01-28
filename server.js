const express = require("express");
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const VueSSR = require("vue-server-renderer");

const LOG_NAME = "error.log";
const server = express();
var serverBundle, clientManifest, renderer;

function createLogHeader() {
    return new Date().toDateString() + " ========\n";
}

function exec(command) {
    return new Promise((resolve, reject) => {
        cp.exec(command, { encoding: 'utf-8' }, (error, stdout, stderr) => {
            if(error) reject(stdout); // when webpack is run inside npm scripts, stderr from webpack will be piped to stdout
            else resolve(stdout); 
        })
    });
}

async function reload() {
    try {
        let result = await exec("npm run --silent build");
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

        return true;
    } catch(err) {
        console.error("An error occurred reloading the server.  The output has been written to gui/error.log");
        fs.appendFileSync(LOG_NAME, createLogHeader() + err + "\n\n");

        return false;
    }
}

if(process.argv.includes("--watch")) {
    const watch = require("watch");
    watch.createMonitor(__dirname + "/src", monitor => {
        monitor.on("changed", async () => {
            console.log("Source changed, reloading server");
            let success = await reload();

            if(success) {
                console.log("Reload complete");
            }
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


(async function() {
    await reload();
    server.listen(80);
})();