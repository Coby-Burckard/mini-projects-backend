const miniProjectsController = require('../controllers/miniProjectsController');

const router = app => {
  //Wikipedia scraping
  app.route('/wiki/:word').get(miniProjectsController.scrapeWiki);
};

module.exports = router;
