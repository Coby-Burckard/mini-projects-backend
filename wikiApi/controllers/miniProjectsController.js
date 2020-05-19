const { getWikiPage } = require('../features/wikiScrape');
const Response = require('../features/Response');

const getValidParagraph = async queryWord => {
  // a function to scrape up to the frist 5 paragraphs of a wikipedia article to find and return a non empty paragraph
  return getWikiPage(queryWord)
    .then(paragraphs => {
      return ['1', '2', '3', '4', '5'].map(num => paragraphs[num]);
    })
    .then(orderedParas => {
      return (validPara = orderedParas.find(para => !!para));
    })
    .catch(err => err);
};

const scrapeWiki = async (req, res) => {
  const queryWord = req.params.word;

  if (queryWord && typeof queryWord === 'string') {
    const paragraph = await getValidParagraph(queryWord);

    if (!!paragraph) {
      res.json(Response.fromObject(paragraph));
    } else {
      res.json(Response.fromErr('Missing Wikipedia entry'));
    }
  } else {
    res.json(Response.fromErr('Invalid word'));
  }
};

module.exports = { scrapeWiki: scrapeWiki };
