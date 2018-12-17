const express = require("express");
const fs = require("fs");
const path = require("path");
const serverBundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");

const server = express();
const renderer = require("vue-server-renderer").createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync("./index.html", "utf-8"),
    clientManifest
});

server.use("/dist", express.static(path.join(__dirname, "./dist")));

server.get("*", (req, res) => {
    const context = { url: req.url, meta: "", title: "TopazDB" };
    
    renderer.renderToString(context, (err, html) => {
        if(!err) return res.end(html);
        if(err.code === 404) res.status(404).end("Page not found");
        else res.status(500).end("Internal Server Error");
    });
});

server.listen(8080);