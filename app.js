#!/usr/bin/env node

const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8000;

// 静的ファイルのルーティング
app.use("/", express.static(path.join(__dirname, 'src')));

// その他のリクエストに対する404エラー
// app.use((req, res) => {
//   res.sendStatus(404);
// })

// var http = require('http').Server(app);
// const io = require('socket.io')(http);
//
// io.on('connection', (socket) => {
//   socket.on('message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });

// 3000番ポートで待ちうける
app.listen(PORT, () => {
  console.log('Running at Port ' + PORT + '...');
});
