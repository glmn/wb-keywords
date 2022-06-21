const KeywordsDB = require('./Keywords');

(async () => {

  const kdb = await KeywordsDB.create()
  const results = await kdb.find('менструальн')
  console.log(results)

})();