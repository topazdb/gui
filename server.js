const express = require("express");
const fs = require("fs");
const path = require("path");
const bundle = require("./dist/server.js");

const server = express();
const renderer = require("vue-server-renderer").createRenderer({
    template: fs.readFileSync("./index.html", "utf-8")
});

server.use("/dist", express.static(path.join(__dirname, "./dist")));

server.get("*", (req, res) => {
    bundle.default({ url: req.url }).then(app => {
        const context = { 
            title: "TopazDB - 404 Not Found",
            meta: ""
        };
        
        renderer.renderToString(app, context, (err, html) => {
            if(!err) return res.end(html);
            if(err.code === 404) res.status(404).end("Page not found");
            else res.status(500).end("Internal Server Error");
        });
    }, err => console.log(err));
});

server.listen(80);