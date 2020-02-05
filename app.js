const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res)=>{
    let {pathname, query} = url.parse(req.url, true);
    if (pathname == '/') {
        fs.readFile(`./index.html`, (err, data)=> {
            if (err) {
                res.end('404 无法找到页面')
            }else {
                res.end(data)
            }
        })
    } else {
        fs.readFile(`./www${pathname}`, (err, data)=> {
            if (err) {
                res.end('404 无法找到页面')
            }else {
                res.end(data)
            }
        })
    }
}).listen(8080);