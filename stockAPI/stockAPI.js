const WebSocket = require('ws');
const fs = require('fs');
const http = require('http');
const express = require('express');
const Stock = require('./features/Stock');
const UserList = require('./features/UserList');
const APIparams = require('./constants/APIConstants');
const { manageStockServer } = require('./stockServer/stockServer');

const startStockAPI = () => {
  //initializing API data storage
  const users = new UserList();
  const production = true;
  let stocks;

  if (production) {
    stocks = {
      AAPL: process.env.STOCK_ONE,
      AMZN: process.env.STOCK_TWO,
    };
  } else {
    stocks = APIparams.map(({ symbol, APIKey }) =>
      Stock.fromSymbol(symbol, APIKey)
    );
  }

  // itializing server for client connections
  const server = http.createServer();
  const wss = new WebSocket.Server({ server });
  manageStockServer(wss, stocks, users);
  server.listen(8080);
};

module.exports = startStockAPI;
