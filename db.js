const { MongoClient } = require("mongodb"),
      uri = 'mongodb+srv://cscott53:Cpcc-2024!@naming-contests.ac30zfz.mongodb.net/ ',
      db_name = 'test'
let connectedClient
async function connectClient() {
    if(connectedClient)return connectedClient.db(db_name)
    let client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
    await client.connect()
    await client.db(db_name).command({ping:1})
    console.info('Connected to Mongo DB')
    connectedClient = client
    return connectedClient.db(db_name)
}
async function stopClient() {
    if(connectedClient)await connectedClient.close()
}
module.exports = {connectClient,stopClient}