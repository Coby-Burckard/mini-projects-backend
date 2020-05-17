const express = require('express');
const bodyParser = require('body-parser');
const router = require('./api/routes/miniProjectsRoutes');
const { logAll } = require('./api/middleware/middleware');

const app = express();
const port = process.env.PORT || 4000;

//setting up custom middleware
app.use(logAll);

//setting up bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//registering the routes
router(app);

app.listen(port);

console.log('mini_projects backend listening to port: ' + port);
