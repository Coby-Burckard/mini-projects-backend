const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/miniProjectsRoutes');
const { logAll } = require('./middleware/middleware');

const startWikiAPI = (app, port) => {
  //setting up custom middleware
  app.use(logAll);

  //allowing all cors
  app.use(cors());

  //setting up bodyParser middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //registering the routes
  router(app);

  console.log('wikiAPI listening on port: ' + port);
};

module.exports = startWikiAPI;
