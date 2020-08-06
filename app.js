#!/usr/bin/env node
// express モジュールのインスタンス作成
const express = require('express');
const app = express();
// パス指定用モジュール
const path = require('path');


// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, 'public')));

// その他のリクエストに対する404エラー
app.use((req, res) => {
  res.sendStatus(404);
})

// 3000番ポートで待ちうける
app.listen(8000, () => {
  console.log('Running at Port 8000...');
});
