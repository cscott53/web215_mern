let {connectClient, stopClient} = require('./db')
(async()=>{
    let db = await connectClient()
    let collections = db.listCollections().toArray()
    console.log(collections.map(col=>col.name))
})()