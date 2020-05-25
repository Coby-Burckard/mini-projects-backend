const express = require('express');
const startWikiAPI = require('./wikiApi/wikiAPI');
const startStockAPI = require('./stockAPI/stockAPI');

const app = express();
const port = process.env.PORT || 4000;
startWikiAPI(app, port);
startStockAPI(app, port);
