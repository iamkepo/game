const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("Connected "+process.env.MONGODB_NAME+" successfully");
  } catch (error) {
    console.error(error);
    await client.close();
  }
}

function getDatabase() {
  return client.db(process.env.MONGODB_NAME);
}


module.exports = {
  connect,
  getDatabase,
};
