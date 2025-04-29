import { Low } from "lowdb";
import { JSONFilePreset } from "lowdb/node"; // used to specify that we’re using a JSON file as our storage.

/* create an instance of the database
* data is stored in dbjson file
*/
const db = await JSONFilePreset('db.json', { users: [], quotes: [] })
export { db };