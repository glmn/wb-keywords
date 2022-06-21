const Datastore = require('nedb');

class KeywordsDB {
  constructor(database) {
    this.db = database
  }

  static create(){
    let database = new Datastore({filename: `${__dirname}/keys.db`});
    return new Promise((resolve, reject) => {
      database.loadDatabase((err) => {
        if(err) reject(err)
        resolve(new KeywordsDB(database))
      })
    })
  }

  find(keyword){
    return new Promise((resolve, reject) => {
      this.db.find({ keyword: new RegExp(keyword) }, (err, docs) => {
        if (err) reject(err)
        let res = docs
          .map((v) => { return {keyword: v.keyword, count: v.count}})
          .sort((a, b) => b.count - a.count)
        resolve(res)
      })
    })
  }
}

module.exports = KeywordsDB