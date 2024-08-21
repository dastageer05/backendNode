const http = require("http");
const fs = require("fs");
const url = require("url");
// const { log } = require("console");

const myServer = http.createServer((req, res)=>{
    if (req.url === '/favicon.ico') return res.end();
    const log = `${req.method}  ${req.url} New req received\n`;
    const myUrl = url.parse(req.url, true);
    fs.appendFile("log.txt",log, (err,data)=>{
        switch (myUrl.pathname){
            case "/":
                res.end("HomePage");
                break;
            case "/about":
                const username = myUrl.query.myName;
                res.end(`Hi, ${username}`);
                break;
            default:
                res.end("404 not found")
        }
    });
});

myServer.listen(8000, ()=> console.log('Server Started'));