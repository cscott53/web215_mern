const express = require("express"),
      path = require('path'),
      router = require('./api')
      app = express(),
      port = 3000
app.use('/api',router)
app.use(express.static(path.join(__dirname,'../client/build')))
app.get(['/','/contest/:contestid'],(req,res)=>res.sendFile(path.join(__dirname,'../client/build','index.html')))
app.listen(port,()=>console.log(`Server running at port ${port}. PID: ${process.pid}`))