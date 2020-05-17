const { getWikiPage } = require('../features/wikiScrape');

const getValidParagraph = async queryWord => {
  // a function to scrape up to the frist 5 paragraphs of a wikipedia article to find and return a non empty paragraph
  return getWikiPage(queryWord)
    .then(paragraphs => {
      console.log(paragraphs);
      return ['1', '2', '3', '4', '5'].map(num => paragraphs[num]);
    })
    .then(orderedParas => {
      return (validPara = orderedParas.find(para => !!para));
    })
    .catch(err => err);
};

const scrapeWiki = async (req, res) => {
  const queryWord = req.params.word;

  //validating the word
  if (queryWord && typeof queryWord === 'string') {
    //obtaining a non-empty paragraph if possible
    const paragraph = await getValidParagraph(queryWord);
    if (!!paragraph) {
      res.json({ paragraph });
    } else {
      res.json({ err: 'all paragraphs empty' });
    }
  } else {
    res.json({ err: 'invalid word' });
  }
};

module.exports = { scrapeWiki: scrapeWiki };
