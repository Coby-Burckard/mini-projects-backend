class Stock {
  constructor(symbol, APIKey) {
    this.symbol = symbol;
    this.recentPrice = null;
    this.pricesForClient = [[0], [0]];
    this.APIKey = APIKey;
    this.connection = null;
  }

  static fromSymbol(symbol, APIKey) {
    return new Stock(symbol, APIKey);
  }

  setRecentPrice(recentPrice) {
    this.recentPrice = recentPrice;
  }

  updateClientPrices() {
    this.pricesForClient.shift();
    this.pricesForClient.push(this.recentPrice);
  }

  toObject() {
    return { symbol: this.symbol, prices: this.pricesForClient };
  }
}

module.exports = Stock;
