const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node"); // used to specify that we’re using a JSON file as our storage.

/* create an instance of the database
* data is stored in db.json file
*/
const db = new Low(new JSONFile("db.json"))

async function initDB() {
    await db.read() // load data from db.json
    db.data ||= { users: [], quotes: [] } // if empty, create defaults
    await db.write() // save to db.json
}

module.exports = { db, initDB };