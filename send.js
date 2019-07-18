var disc = require("./req_disc")
var url = require('url');

'use strict'
let http = require('http');
let server = http.createServer(function (req, res) {
    if( req.method === 'GET' ) {
        console.log(req.url)
        console.log(req.parameter)

        var parsed = url.parse(req.url, true);
        console.log(parsed.host)
        console.log(parsed.pathname)
        console.log(parsed.search)
        var obj = parsed.query
        console.log(obj['year'])

        var ans = disc.desc("2")

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(ans.toString());
    } else {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('Method Not Allowed\n');
    }
});
server.listen(8800);
console.log('Server running on port 8443');