// bridge.js - Este é o arquivo que vai virar o ".exe" para o seu amigo

const dgram = require('dgram');
const { io } = require("socket.io-client");

// 1. Conecta ao SEU servidor no Render via WebSocket
// Usamos WebSocket direto em vez de HTTP POST, é mais rápido e dribla bloqueios
const serverUrl = "https://transmissorlivetelemetry.onrender.com";
const socket = io(serverUrl);

socket.on("connect", () => {
    console.log(`✅ Conectado ao servidor Render com sucesso! ID: ${socket.id}`);
});

socket.on("connect_error", (err) => {
    console.log(`❌ Erro ao conectar no Render: ${err.message}`);
});

// 2. Cria o servidor UDP local para ouvir o Assetto Corsa
const udpServer = dgram.createSocket('udp4');
const UDP_PORT = 9996;

udpServer.on('error', (err) => {
    console.log(`Erro no UDP local:\n${err.stack}`);
    udpServer.close();
});

udpServer.on('message', (msg, rinfo) => {
    try {
        // Recebe o JSON do Python (Assetto Corsa)
        const telemetryData = JSON.parse(msg.toString('utf-8'));
        
        // Pega os dados e CHUTA para o Render usando o evento do Socket
        // (O seu server.js no Render precisará escutar isso)
        socket.emit('telemetry_from_bridge', telemetryData);
        
    } catch (error) {
        console.error("Erro ao ler dados do Python:", error.message);
    }
});

udpServer.on('listening', () => {
    const address = udpServer.address();
    console.log(`🏎️  Ponte UDP ouvindo o Assetto Corsa em ${address.address}:${address.port}`);
});

// Inicia a escuta UDP
udpServer.bind(UDP_PORT, '127.0.0.1');