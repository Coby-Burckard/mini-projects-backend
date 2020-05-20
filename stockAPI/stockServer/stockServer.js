const uniqid = require('uniqid');
const User = require('../features/User');
const { updateFinnConnection } = require('../stockRequests/stockRequests');

const updateAndSendStocksInterval = (stocks, users) => {
  setInterval(() => {
    const payload = [];
    stocks.forEach(stock => {
      stock.updateClientPrices();
      payload.push(stock.toObject());
    });

    users.userList.forEach((user, id) => {
      user.connection.send(JSON.stringify(payload));
    });
  }, 1000);
};

const manageStockServer = (wss, stocks, users) => {
  updateAndSendStocksInterval(stocks, users);

  wss.on('connection', ws => {
    //initializing the new user
    const user = User.fromConnection(uniqid(), ws);
    users.addUser(user);
    console.log('new connection', user.id, users.userList.size);

    // managing connection to finnhub socket
    updateFinnConnection(users, stocks);

    ws.on('message', message => {
      console.log('received: %s', message);
    });

    ws.on('close', () => {
      users.deleteUser(user);

      console.log('removing user', user.id, users.userList.size);

      // managing connection to finnhub socket
      updateFinnConnection(users, stocks);
    });
  });
};

module.exports = { manageStockServer };
