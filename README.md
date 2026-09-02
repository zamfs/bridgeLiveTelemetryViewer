# Assetto Corsa Telemetry Bridge (`bridge.js`)

## Overview
`bridge.js` is the core backend service for the **Live Telemetry** dashboard. It operates as a high-performance Node.js server designed to act as a real-time bridge between Assetto Corsa (v1) and the web-based frontend application.

Since web browsers cannot natively listen to local UDP ports for security reasons, this bridge solves the problem by receiving raw telemetry data streams from the game, parsing the physics and graphics data packets, and broadcasting them instantly via WebSockets to the web dashboard. It also supports driver stint separation and persistent data handling locally.

## Architecture
1. **Assetto Corsa (Game & Python Plugin):** Reads the game's shared memory data and transmits telemetry packets via UDP.
2. **Telemetry Bridge (`bridge.js`):** Listens on the configured UDP port, parses incoming telemetry payloads, manages connected driver sessions, and handles stint separations.
3. **Socket.io Server:** Broadcasts the parsed telemetry data streams in real-time over WebSockets to connected clients.
4. **Web Dashboard:** The frontend application connects to this local WebSocket server to render real-time track maps via HTML Canvas, live tire metrics, and car physics.

---

## Prerequisites
To run the source code directly, you will need:
* [Node.js](https://nodejs.org/) (v16 or higher recommended)

*(Note: If you are using the pre-compiled standalone version, no external installation is required. Here is the .exe link: https://drive.google.com/file/d/1JFvy793TomJVYKcJUhmOXH10j0BT0BVU/view?usp=sharing BETA version (14/07/26))*

## Installation & Setup
1. Download or clone the project repository containing `bridge.js`.
2. Open your terminal or command prompt in the project directory.
3. Install the required dependencies (such as Socket.io and UDP dgram handlers):
   ```bash
   npm install