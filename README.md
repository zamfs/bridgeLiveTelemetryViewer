# Assetto Corsa Telemetry Bridge (`bridge.js`) v0.3.1

## Overview

`bridge.js` is the core backend service for the **Live Telemetry** dashboard. It operates as a high-performance Node.js server designed to act as a real-time bridge between Assetto Corsa (v1) and the web-based frontend application.

Since web browsers cannot natively listen to local UDP ports for security reasons, this bridge solves the problem by receiving raw telemetry data streams from the game, parsing the physics and graphics data packets, and broadcasting them instantly via WebSockets to the web dashboard. It also supports driver stint separation and persistent data handling locally.

## What's New in Version 0.3.1

* **30 Hz Telemetry Transmission Rate:** Introduced a configurable transmission rate limit of 30 updates per second to optimize network usage while maintaining smooth real-time telemetry visualization.

* **Latest Packet Optimization:** The bridge now retains only the most recent UDP telemetry packet before transmission, preventing unnecessary processing and avoiding the accumulation of outdated telemetry data.

* **Improved Connection Handling:** Enhanced Socket.IO connection management with automatic reconnection, configurable retry delays, and connection timeout settings to improve reliability during temporary network interruptions.

* **Optimized JSON Parsing:** Telemetry payloads are now parsed immediately before transmission, reducing unnecessary processing of incoming UDP packets.

* **Improved Error Handling:** Added controlled JSON parsing error reporting to prevent excessive console output when invalid telemetry packets are received.

* **Disconnected State Handling:** Incoming telemetry packets are discarded while the cloud server is disconnected, allowing the bridge to resume transmission using fresh data once the connection is restored.

## Architecture

1. **Assetto Corsa (Game & Python Plugin):** Reads the game's shared memory data and transmits telemetry packets via UDP.

2. **Telemetry Bridge (`bridge.js`):** Listens on the configured UDP port (`127.0.0.1:9996`), parses incoming telemetry payloads, and transmits data packets securely via Socket.io to the cloud server.

3. **Socket.io Server:** Relays and broadcasts the parsed telemetry data streams in real-time over WebSockets to connected browser clients.

4. **Web Dashboard:** The frontend application connects to render real-time track maps via HTML Canvas, live tire metrics, and multi-car lobbies.

---

## Prerequisites

To run the source code directly, you will need:

* [Node.js](https://nodejs.org/) (v16 or higher recommended)

**(Note: If you are using the pre-compiled standalone version, no external installation is required. Here is the link to install it: https://drive.google.com/file/d/15bfw5Y6bOgRE4AVc5XpZKhkPfW7diXaR/view?usp=sharing)**

## Installation & Setup

1. Download or clone the project repository containing `bridge.js`.

2. Open your terminal or command prompt in the project directory.

3. Install the required dependencies (such as Socket.io and UDP dgram handlers):

```bash
npm install
```