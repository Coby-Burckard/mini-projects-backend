const uniqid = require('uniqid');
const User = require('../features/User');

const updateAndSendStocksInterval = (stocks, users) => {
  setInterval(() => {
    const payload = [];
    stocks.forEach(stock => {
      stock.updateClientPrices();
      payload.push(stock.toObject());
    });

    users.forEach((user, id) => {
      user.connection.send(JSON.stringify(payload));
    });
  }, 1000);
};

const manageStockServer = (wss, stocks) => {
  const users = new Map();
  updateAndSendStocksInterval(stocks, users);

  wss.on('connection', ws => {
    //initializing the new user
    const user = User.fromConnection(uniqid(), ws);
    users.set(user.id, user);
    console.log('new connection', user.id);

    ws.on('message', message => {
      console.log('received: %s', message);
    });

    ws.on('close', () => {
      console.log('removing user', user.id);
      users.delete(user.id);
    });
  });
};

module.exports = { manageStockServer };
