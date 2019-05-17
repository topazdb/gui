const express = require("express");
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const VueSSR = require("vue-server-renderer");
const LRU = require("lru-cache");
const axios = require("axios");
const querystring = require("querystring");
const cache = new LRU({ max: 10000, maxAge: 100000 });

const LOG_NAME = "error.log";
const PORT = 80;

const BASEURL = process.env.TOPAZ_BASEURL || "https://isu-csafe.stat.iastate.edu/topazdb/";

// okta variables
const OKTA_DOMAIN = process.env.TOPAZ_OKTA_DOMAIN;
const OKTA_CLIENT_ID = process.env.TOPAZ_OKTA_CLIENTID;
const OKTA_CLIENT_SECRET = process.env.TOPAZ_OKTA_CLIENTSECRET;
const OKTA_AUTHSERV = process.env.TOPAZ_OKTA_AUTHSERV;
const OKTA_REDIRECTURI = process.env.TOPAZ_OKTA_REDIRECTURI;

console.assert(OKTA_DOMAIN !== null);
console.assert(OKTA_CLIENT_ID !== null);
console.assert(OKTA_CLIENT_SECRET !== null);
console.assert(OKTA_REDIRECTURI !== null);

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

        if(process.env.NODE_ENV !== "production") {
            let result = await exec("npm run --silent build");
            if(!result.match(/Build Complete/g)) return;
        } else {
            var client = fs.readFileSync("./dist/client.js");
            client = client.replace("{{TOPAZ_OKTA_DOMAIN}}", OKTA_DOMAIN);
            client = client.replace("{{TOPAZ_OKTA_AUTHSERV}}", OKTA_AUTHSERV);
            client = client.replace("{{TOPAZ_OKTA_CLIENTID}}", OKTA_CLIENT_ID);
            client = client.replace("{{TOPAZ_OKTA_REDIRECTURI}}", OKTA_REDIRECTURI);

            fs.writeFileSync("./dist/client.js", client);
        }

        delete require.cache[require.resolve("./dist/vue-ssr-server-bundle.json")];
        delete require.cache[require.resolve("./dist/vue-ssr-client-manifest.json")];
        
        serverBundle = require("./dist/vue-ssr-server-bundle.json");
        clientManifest = require("./dist/vue-ssr-client-manifest.json");
        renderer = VueSSR.createBundleRenderer(serverBundle, {
            runInNewContext: false,
            template: fs.readFileSync("./index.html", "utf-8"),
            clientManifest,
            inject: false,
            cache,
        });

        console.log("reload complete");
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
            await reload();
        });
    });
}

server.use(express.json());
server.use("/dist", express.static(path.join(__dirname, "./dist")));

server.get("*", (req, res) => {
    const context = { 
        url: req.url, 
        base: BASEURL,
        meta: "", 
        title: "TopazDB",
        cookies: req.headers["cookie"],
    };
    
    renderer.renderToString(context, (err, html) => {
        console.log(err);
        let code = err !== null && typeof err.code === "number" ? err.code : 200;
        res.status(code);

        switch(code) {            
            case 404:
                html = "Page not found";
                break;
            
            case 500:
                html = "Internal Server Error";
                break;

            case 503:
                html = "TopazDB is currently undergoing maintenance.  Please check back later.";
                break;
            
            default:
            case 200: break;
        }
        
        res.end(html);
    });
});

(async function() {
    await reload();
    server.listen(PORT);
})();