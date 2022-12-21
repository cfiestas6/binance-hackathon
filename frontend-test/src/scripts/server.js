var http = require('http'); 
const fs = require('fs');
const bodyParser = require('body-parser');

var server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.url == '/timer.json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var json = require('../timer.json')
        res.write(JSON.stringify(json));  
        res.end();  
    }
    if (req.url == '/timer.json' && req.method === 'PUT'){
        req.on('data', function (chunk) {
            chunk = chunk.toString()
            var json = JSON.stringify(chunk);
            json = JSON.parse(json)
            fs.writeFile('../timer.json', json, 'utf8', (error) => {
              if (error) {
                console.error(error);
                return;
                }
            })
        })  
        res.end();
    }
    if (req.method === 'POST'){
        // Poner la conexion con el contrato
        }
});

server.listen(5000); 

console.log('Node.js web server at port 5000 is running..')