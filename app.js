#!/usr/bin/env node

const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8000;

app.use("/", express.static(path.join(__dirname, 'src')));

// その他のリクエストに対する404エラー
app.use((req, res) => {
  res.sendStatus(404);
})

var http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log("[Websocket] Client connected.")
  socket.on('message', (msg) => {
    resMes = JSON.parse(msg)
    if (resMes["type"] == "message") {
      console.log('[WebSocket] Message: ' + msg);
      resMes["type"] = "message_received"
      io.emit('message', JSON.stringify(resMes));
    } else if (resMes["type"] == "request_pastmessage") {
      // 過去のメッセージを全て返す
    }
  });
  io.on('disconnect', (socket) => {
    console.log("[Websocket] Client disconnected.")
  });
});


http.listen(PORT, () => {
  console.log('Running at Port ' + PORT + '...');
});
