# Assetto Corsa Telemetry Bridge (`bridge.js`) v0.2



## Overview

`bridge.js` is the core backend service for the **Live Telemetry** dashboard. It operates as a high-performance Node.js server designed to act as a real-time bridge between Assetto Corsa (v1) and the web-based frontend application.

Since web browsers cannot natively listen to local UDP ports for security reasons, this bridge solves the problem by receiving raw telemetry data streams from the game, parsing the physics and graphics data packets, and broadcasting them instantly via WebSockets to the web dashboard. It also supports driver stint separation and persistent data handling locally.

## What's New in Version 0.2

* **Cloud WebSocket Transport Support:** Upgraded the bridge client connection to securely stream telemetry payloads directly to remote centralized backend servers (such as Render) over WebSockets.


* **Composite Session Context Integration:** Seamlessly packages and forwards real-time physics, graphics, and tracking metrics to support multi-car identification (`sessionKey`) on the live web grid.
* **Optimized Local UDP Ingestion:** Refined the internal `dgram` socket binding mechanism on port `9996` to process high-frequency game packets with minimal latency.



## Architecture

1. **Assetto Corsa (Game & Python Plugin):** Reads the game's shared memory data and transmits telemetry packets via UDP.


2. **Telemetry Bridge (`bridge.js`):** Listens on the configured UDP port (`127.0.0.1:9996`), parses incoming telemetry payloads, and transmits data packets securely via Socket.io to the cloud server.


3. **Socket.io Server:** Relays and broadcasts the parsed telemetry data streams in real-time over WebSockets to connected browser clients.


4. **Web Dashboard:** The frontend application connects to render real-time track maps via HTML Canvas, live tire metrics, and multi-car lobbies.



---

## Prerequisites

To run the source code directly, you will need:

* [Node.js](https://nodejs.org/) (v16 or higher recommended)



*(Note: If you are using the pre-compiled standalone version, no external installation is required. Download link coming soon for version 0.2)*

## Installation & Setup

1. Download or clone the project repository containing `bridge.js`.


2. Open your terminal or command prompt in the project directory.


3. Install the required dependencies (such as Socket.io and UDP dgram handlers):


```bash
npm install

```