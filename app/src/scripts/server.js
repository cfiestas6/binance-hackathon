var http = require('http'); 
const fs = require('fs');
const { parse } = require('querystring');
const ethers = require("ethers");
const { rewardAddress, raffleAddress, raffleABI, rewardABI } = require("./constants.js");
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
        res.write(json);  
        res.end();  
    }
    if (req.url == '/timer.json' && (req.method === 'OPTIONS' || req.method === 'PUT')){
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
    if (req.url === '/' && (req.method === 'OPTIONS' || req.method === 'POST')){
        req.on('data', async function (chunk) {
            chunk = chunk.toString()
            //json = JSON.stringify(chunk);
            //json = JSON.parse(json)
            chunk = JSON.parse(chunk)
            let subscriber = chunk.subscriber; // Aqui 1 si es subscriptor, 0 si no
            let address = chunk.wallet;
            // Poner la conexion con el contrato
            const provider = new ethers.providers.JsonRpcProvider(QUICKNODE_RPC_URL);
            const signer = new ethers.Wallet(PRIVATE_KEY, provider);
            const raffleContract = new ethers.Contract(raffleAddress, raffleABI, signer);
            if (subscriber == 1) {
                try{
                const tx1 = await raffleContract.enterToRaffle(address);
                await tx1.wait();
                }
                catch{
                    console.log("error")
                }
            }
            try{
                const tx = await raffleContract.enterToRaffle(address);
                await tx.wait();
            }
            catch{
                console.log("error")
            }
        }) 
        res.end(); 
        }
    if (req.url === '/open-raffle' && req.method === 'GET') {
        console.log("Rifa Abierta")
        const provider = new ethers.providers.JsonRpcProvider(QUICKNODE_RPC_URL);
        const signer = new ethers.Wallet(PRIVATE_KEY, provider);
        const raffleContract = new ethers.Contract(raffleAddress, raffleABI, signer);

        const tx = await raffleContract.openRaffle();
        await tx.wait();
        res.end();
    }
    if (req.url === '/end-raffle' && req.method === 'GET') {
        console.log("Rifa Cerrada")
        const provider = new ethers.providers.JsonRpcProvider(QUICKNODE_RPC_URL);
        const signer = new ethers.Wallet(PRIVATE_KEY, provider);
        const raffleContractWrite = new ethers.Contract(raffleAddress, raffleABI, signer);
        const rewardContract = new ethers.Contract(rewardAddress, rewardABI, signer);
        const raffleContractRead = new ethers.Contract(raffleAddress, raffleABI, provider);
        const tx = await raffleContractWrite.endRaffle({gasLimit: 100000});
        await tx.wait(); 
        const winner = await raffleContractRead.getWinner({gasLimit: 100000});
        console.log(winner);
        const mintTx = await rewardContract.mint(winner, {gasLimit: 2500000 , value: ethers.utils.parseEther("0.0001")});
        // enviar respuesta con el winner.
        res.write(winner);
        res.end();
    }
});

server.listen(5000); 

console.log('Node.js web server at port 5000 is running..')