const WebSocket = require('ws');
const fs = require('fs');
const http = require('http');
const Stock = require('./features/Stock');
const UserList = require('./features/UserList');
const APIparams = require('./constants/APIConstants');
const { manageStockServer } = require('./stockServer/stockServer');

const startStockAPI = () => {
  //initializing API data storage
  const stocks = APIparams.map(({ symbol, APIKey }) =>
    Stock.fromSymbol(symbol, APIKey)
  );
  const users = new UserList();

  // itializing server for client connections
  const server = http.createServer();
  const wss = new WebSocket.Server({ server });
  manageStockServer(wss, stocks, users);
  server.listen(8080);
};

module.exports = startStockAPI;
