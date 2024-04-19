const express = require('express'),
      {connectClient,stopClient} = require('../db'),
      router = express.Router()
router.use(express.json())
router.get('/contests',async(req,res)=>{
    let db = await connectClient(),
        data = await db.collection('contests').find({},{
            _id:0,id:1,categoryName:1,contestName:1
        }).toArray()
    res.send(JSON.stringify(data,4))
})
router.get('/contest/:contestId',async({params},res)=>{
    let db = await connectClient(),
        data = await db.collection('contests').findOne({id:params.contestId})
    res.send(data)
})
router.post('/contest/:contestId',async({params,body},res)=>{
    let db = await connectClient(),
        data = await db.collection('contests').findOneAndUpdate({id:params.contestId},{
            $addToSet: {names: {
                id:body.value.toLowerCase().replace(/\s/g,'-'),
                name:body.value,
                timestamp:new Date
            }}
        },{returnDocument:'after'})
    res.send(data.value)
})
router.post('/contests', async({body},res)=>{
    let {name,category,description} = body,
        db = await connectClient(),
        doc = await db.collection('contests').insertOne({
            contestName: name,
            categoryName: category,
            description,
            id: name.toLowerCase().replace(/\s/g,'-'),
            names: []
        }),
        contest = await db.collection('contests').findOne({_id:doc.insertedId})
        res.send({contest})
        router.get('/contests', async (req,res2)=>{
            let data = await db.collection('contests').find({},{
                _id:0,id:1,categoryName:1,contestName:1
            }).toArray()
            res2.send(JSON.stringify(data))
        })
})
router.put('/contest/:contestIdd',async({params,body})=>{
    try {
        let db = await connectClient(),
            {contestId} = params,
            {newName,id} = body,
            data = await db.collection('contests').findOneAndUpdate(
                {id:contestId,'names.id':id},
                {$set:{'names.$.name':newName}},
                {returnDocument: 'after'}
            )
            res.send(data.value)
    } catch (error) {
        console.error(`Error updating name:\n${error}`)
        res.status(500).send('Internal server error')
    }
})
module.exports = router