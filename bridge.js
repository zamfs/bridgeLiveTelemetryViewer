// bridge.js - this is the .exe file

const dgram = require('dgram');
const { io } = require("socket.io-client");

// 1. Connects via WebSocket
const serverUrl = "http://150.230.230.27:3000/";
//const serverUrl = "http://localhost:3000"; //local tests

const socket = io(serverUrl, {
    reconnection: true,
    reconnectionDelay:1000,
    reconnectionDelayMax: 5000,
    timeout:10000
});

socket.on("connect", () => {
    console.log(`✅ Connected to the server! ID: ${socket.id}`);
});

socket.on('disconnect', (reason) => {
    console.log(`Disconnected from server: ${reason}`);
});

socket.on("connect_error", (err) => {
    console.log(`❌ Connection error: ${err.message}`);
});

//2. Creates a local UDP server to listen AC
const udpServer = dgram.createSocket('udp4');
const UDP_PORT = 9996;

let latestMessage = null;
let lastParseError = 0;

udpServer.on('error', (err) => {
    console.log(`Error in local UDP:\n${err.stack}`);
    udpServer.close();
});

udpServer.on('message', (msg) => {
   latestMessage = msg;
});

udpServer.on('listening', () => {
    const address = udpServer.address();
    console.log(`🏎️  UDP bridge listening Assetto corsa in: ${address.address}:${address.port}`);
});

//Limit 30Hz
const SEND_INTERVAL_MS = 1000/30;

setInterval(() => {
    if (!socket.connected) {
        latestMessage = null;
        return;
    }

    if (latestMessage === null) {
        return;
    }

    const msg = latestMessage;
    latestMessage = null;

    try {
        const telemetryData = JSON.parse(msg.toString('utf-8'));

        socket.emit('telemetry_from_bridge', telemetryData);
    } catch(error) {
        const now = Date.now();

        if (now - lastParseError >= 5000) {
            console.error(`Invalid telemetry JSON: ${error.message}`);
            lastParseError = now;
        }
    }
}, SEND_INTERVAL_MS);


udpServer.bind(UDP_PORT, '127.0.0.1');