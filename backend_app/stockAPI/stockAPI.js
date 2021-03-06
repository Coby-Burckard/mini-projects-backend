const WebSocket = require('ws');
const fs = require('fs');
const http = require('http');
const express = require('express');
const Stock = require('./features/Stock');
const UserList = require('./features/UserList');
// const APIparams = require('./constants/APIConstants');
const { manageStockServer } = require('./stockServer/stockServer');

const startStockAPI = (app, PORT) => {
  //initializing API data storage
  const users = new UserList();
  const production = true;
  let stockParams;

  if (production) {
    stockParams = [
      { symbol: 'AAPL', APIKey: process.env.STOCK_ONE },
      { symbol: 'AMZN', APIKey: process.env.STOCK_TWO },
    ];
  } else {
    stockParams = APIparams;
  }

  stocks = stockParams.map(({ symbol, APIKey }) =>
    Stock.fromSymbol(symbol, APIKey)
  );

  // itializing server for client connections
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });
  manageStockServer(wss, stocks, users);
  console.log('stock api listening on port ', PORT);
  server.listen(PORT);
};

module.exports = startStockAPI;
