const WebSocket = require('ws');
const fs = require('fs');
const http = require('http');
const Stock = require('./features/Stock');
const APIparams = require('./constants/APIConstants');
const { manageStockServer } = require('./stockServer/stockServer');
const { manageDataRequests } = require('./stockRequests/stockRequests');

//br10b3frh5reisn4o3qg api key
const startStockAPI = () => {
  //initializing API data storage
  const stocks = APIparams.map(({ symbol, APIKey }) =>
    Stock.fromSymbol(symbol, APIKey)
  );

  console.log(stocks);

  // itializing server for client connections
  const server = http.createServer();
  const wss = new WebSocket.Server({ server });
  manageStockServer(wss, stocks);
  server.listen(8080);

  // initializing finnhub socket connection
  console.log('starting connection to finnhub');
  stocks.forEach(stock => {
    console.log('new websocket with ', stock.symbol, stock.APIKey);
    const ws = new WebSocket(`wss://ws.finnhub.io?token=${stock.APIKey}`);
    manageDataRequests(ws, stock);
  });
};

module.exports = startStockAPI;
