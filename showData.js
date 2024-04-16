let {connectClient, stopClient} = require('./db');
/*
I usually don't use semicolons but this time I had to since the
IIFE (immediately invoked function expression) below surrounded
by () seems to make JS think I'm trying to invoke what's returned
from require() thus throwing an error
*/
(async()=>{
    let db = await connectClient()
    let collections = await db.listCollections().toArray()
    console.log(collections.map(col=>col.name))
})()
