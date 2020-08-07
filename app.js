#!/usr/bin/env node

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 8000;
const jsonpath = path.join(__dirname, "chat", "chatdata.json");

app.use("/", express.static(path.join(__dirname, 'src')));

app.use("/api/chatdata", (req, res)=>{
  res.header({
    "Content-Type": "application/json"
  })
  textData = fs.readFileSync(jsonpath, "utf-8");
  res.json(JSON.parse(textData));
});

app.use((req, res) => {
  res.sendStatus(404);
})

var http = require('http').Server(app);
const io = require('socket.io')(http);

function addChatData(data) {
  rdata = fs.readFileSync(jsonpath, 'utf8')//, function (err, data){
  obj = JSON.parse(rdata);
  obj.push({username: data["username"], message:data["message"]});
  json = JSON.stringify(obj);
  fs.writeFileSync(jsonpath, json, 'utf8');
}

io.on('connection', (socket) => {
  console.log("[Websocket] Client connected.")
  socket.on('message', (msg) => {
    resMes = JSON.parse(msg)
    if (resMes["type"] == "message") {
      console.log('[WebSocket] Message: ' + msg);
      resMes["type"] = "message_received"
      addChatData(resMes);
      io.emit('message', JSON.stringify(resMes));
    }
  });
});


http.listen(PORT, () => {
  console.log('Running at Port ' + PORT + '...');
});
