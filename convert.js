const xlsx = require('node-xlsx').default;
const fs = require('fs');
const Datastore = require('nedb');

(async () => {

const sheets = xlsx.parse(fs.readFileSync(`${__dirname}/keys_2.xlsx`));
const keysSheet = sheets[0]

const db = new Datastore({filename: `${__dirname}/keys.db`});

await db.loadDatabase()

let docs = keysSheet.data.map(data => {
  return {
    'keyword': data[0],
    unique: true,
    'count': data[1],
  }
})

db.insert(docs, (err, newDoc) => {
  console.log(err)
})

})();