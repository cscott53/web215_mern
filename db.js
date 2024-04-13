const { MongoClient } = require("mongodb"),
      uri = 'mongodb://localhost:27017',
      db_name = 'test'
console.log(MongoClient)
let connectedClient
async function connectClient() {
    if(connectedClient)return connectedClient.db(db_name)
    let client = new MongoClient(uri)
    await client.connect()
    await client.db(db_name).command({ping:1})
    console.log('Connected to Mongo DB')
    connectedClient = client
    return connectedClient.db(db_name)
}
async function stopClient() {
    if(connectedClient)await connectedClient.close()
}
module.exports = {connectClient,stopClient}