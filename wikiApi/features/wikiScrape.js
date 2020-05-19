const osmosis = require('osmosis');

//configuring osmosis
osmosis.config(
  'user_agent',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
);
osmosis.config('tries', 1);
osmosis.config('concurrency', 2);

const getWikiPage = query => {
  return new Promise((resolve, reject) => {
    let paragraphs;

    console.log('starting osmosis scrape for', query);

    //scraping the requested wiki article for the first three paragraphs
    osmosis
      .get(`https://en.wikipedia.org/wiki/${query}`)
      .find('.mw-parser-output:first')
      .set({
        '0': `p:eq(0)`,
        '1': `p:eq(1)`,
        '2': `p:eq(2)`,
        '3': `p:eq(3)`,
        '4': `p:eq(4)`,
      })
      .data(para => {
        paragraphs = para;
      })
      .error(err => reject(err))
      .done(() => resolve(paragraphs));
  });
};

module.exports = { getWikiPage };
