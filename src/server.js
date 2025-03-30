const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Redis = require('ioredis')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
const httpServer = createServer(app);
const redisCache = new Redis();

const io = new Server(httpServer, {
    cors:{
        origin: "http://localhost:5500",
        methods: ["GET", "POST"]
    }
    /* options */ 
});

io.on("connection", (socket) => {
    console.log("A user is connected :", socket.id)
    socket.on("setUserId", (userId) => {
        console.log("Setting user id to connection id", userId, socket.id)
        redisCache.set(userId, socket.id)

    })
    socket.on("getConnectionId", async (userId) => {
        const connectionId = await redisCache.get(userId)
        console.log("Getting connectionId for user id" , userId, connectionId)
        socket.emit("connectId", connectionId)
    })
    
  // ...
});

app.post('/sendPayload',async  (req,res) => {
    const { userId , payload } = req.body;
    if(!userId || !payload) {
        res.status(400).send("invalid request")
    }
    const socketId = await redisCache.get(userId)

    if(socketId) {
        io.to(socketId).emit('submissionPayloadResponse', payload);
        res.send("payload Sent Successfully")
    }else {
        res.status(404).send("user not connected")
    }
})

httpServer.listen(3002, () => {
    console.log(`Socket Server running ar PORT : 3002`)
});