# 📡 Socket Service - Remote Code Executor

The **socket-service** is a WebSocket-based notification layer for the Remote Code Executor system. It acts as a real-time communication bridge between the backend services (like the submission service) and the frontend client.

## 🚀 Features

- Establishes WebSocket connection with frontend clients.
- Caches the `userId` to `socketId` mapping using Redis.
- Exposes an API endpoint `/sendPayload` to receive result payloads from backend services.
- Emits result payloads back to the respective frontend client in real-time.

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **Socket.IO**
- **Redis** (for caching `userId` ↔ `socketId` mappings)

## How it Works

### 1. WebSocket Connection 🔌

When a frontend client connects, a new socket connection is initialized. The client sends its `userId` which is mapped to the generated `socket.id` and stored in Redis for future reference.

### 2. REST API - /sendPayload 📨 
The backend (typically the submission service) sends the result of code execution to this endpoint. The service then emits the payload to the specific user via their associated socket connection.

### 3. Redis Key Mapping 🧰
- Key: userId
- Value: socketId
- Used to track which socket is connected to which user.

## ✨ Running Locally

### 🧱  Prerequisites

- Node.js (v16+)

- Redis Connection

### 📦 Installation
1. Clone the Repository
   ```
   git clone <repo-url>
   cd socket-service
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Setup .env file
4. Run the Service
    ```
    npm start  
