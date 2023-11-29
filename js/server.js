const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
console.log("Requested URL: "+ req.url);
const urlParts = req.url.split("/");
console.log(urlParts);
res.statusCode = 200;
res.setHeader("Content-Type", "text/html");
res.write(`
<html>
    <head>
    </head>
    <body>
        Welcome!
    </body>
</html>`);
res.end;
});

server.listen(3000, "localhost", () => {
    console.log("Ready to accept requests on port 3000.");
});