// bridge.js - this is the .exe file

const { log } = require('console');
const dgram = require('dgram');
const { io } = require("socket.io-client");

// 1. Connects via WebSocket
const serverUrl = "https://transmissorlivetelemetry.onrender.com";

const socket = io(serverUrl);

socket.on("connect", () => {
    console.log(`✅ Connected to the server in render! ID: ${socket.id}`);
});

socket.on("connect_error", (err) => {
    console.log(`❌ Connection error: ${err.message}`);
});

//2. Creates a local UDP server to listen AC
const udpServer = dgram.createSocket('udp4');
const UDP_PORT = 9996;

udpServer.on('error', (err) => {
    console.log(`Error in local UDP:\n${err.stack}`);
    udpServer.close();
});

udpServer.on('message', (msg, rinfo) => {
    try {
        // Receive JSON
        const telemetryData = JSON.parse(msg.toString('utf-8'));
        
        // sends to server
        socket.emit('telemetry_from_bridge', telemetryData);
        
    } catch (error) {
        console.error("Error while reading Python:", error.message);
    }
});

udpServer.on('listening', () => {
    const address = udpServer.address();
    console.log(`🏎️  UDP bridge listening Assetto corsa in: ${address.address}:${address.port}`);
});


udpServer.bind(UDP_PORT, '127.0.0.1');