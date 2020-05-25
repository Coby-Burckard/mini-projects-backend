const WebSocket = require('ws');

const connectToFinn = stocks => {
  //connecting to the two stock subscriptions on finhub and starting the data management process
  stocks.forEach(stock => {
    console.log('new websocket with ', stock.symbol, stock.APIKey);
    const ws = new WebSocket(`wss://ws.finnhub.io?token=${stock.APIKey}`);
    stock.connection = ws;
    manageDataRequests(ws, stock);
  });
};

const disconnectFromFinn = stocks => {
  stocks.forEach(stock => {
    stock.connection.send(
      JSON.stringify({ type: 'unsubscribe', symbol: stock.symbol })
    );
    stock.connection.close();
  });
};

const updateFinnConnection = (users, stocks) => {
  //if there are users and we are not connected
  console.log('need to connect to Finn', users.needFinnConnection);
  if (users.needFinnConnection) {
    console.log('connecting to finn');
    connectToFinn(stocks);
  }
  //if there are no users, disconnecting from finnhub to conserve dyno hours
  else {
    console.log('disconnecting from finn');
    disconnectFromFinn(stocks);
  }
};

const updateStocks = (data, stock) => {
  if (!!!data.p || !!!data.s) {
    console.log('missing data from finnhub');
    return;
  }

  const price = data.p.toFixed(2);

  stock.setRecentPrice(price);
};

const handleMessage = (data, stock) => {
  switch (data.type) {
    case 'trade':
      updateStocks(data.data[0], stock);
      break;
    case 'ping':
      console.log(data.type);
      break;
    case 'msg':
      console.log(data);
      break;
    default:
      console.log('unknown type recieved from finnhub ', data);
  }
};

const manageDataRequests = (ws, stock) => {
  ws.on('open', () => {
    ws.send(JSON.stringify({ type: 'subscribe', symbol: stock.symbol }));
  });

  ws.on('message', jsonData => {
    if (!jsonData) {
      return;
    }

    const data = JSON.parse(jsonData);
    handleMessage(data, stock);
  });
};

module.exports = { updateFinnConnection };
