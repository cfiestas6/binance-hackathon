var http = require('http'); 
const fs = require('fs');
const { parse } = require('querystring');
const ethers = require("ethers");
//const { rewardAddress, raffleAddress, raffleABI, rewardABI } = require("./constants.js");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const QUICKNODE_RPC_URL = process.env.QUICKNODE_RPC_URL;

var server = http.createServer(async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.url == '/timer.json' && req.method === 'GET') {
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
    if (req.url == '/'){
        req.on('data', function (chunk) {
            chunk = chunk.toString()
            //json = JSON.stringify(chunk);
            //json = JSON.parse(json)
            chunk = JSON.parse(chunk)
            console.log(chunk.wallet) // Aqui sacas la wallet
            console.log(chunk.subscriber) // Aqui 1 si es subscriptor, 0 si no
            // Poner la conexion con el contrato
            /*const provider = new ethers.providers.JsonRpcProvider(QUICKNODE_RPC_URL);
            const signer = new ethers.Wallet(PRIVATE_KEY, provider);
            const raffleContract = new ethers.Contract(raffleAddress, raffleABI, signer);
            if (subscriber) {
                const tx1 = await raffleContract.enterToRaffle(/* ADDRESS );
                await tx1.wait();
            }
            const tx = await raffleContract.enterToRaffle(/* ADDRESS /*);
            await tx.wait();*/
        }) 
        res.end(); 
        }
});

server.listen(5000); 

console.log('Node.js web server at port 5000 is running..')