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

module.exports = { manageDataRequests };
