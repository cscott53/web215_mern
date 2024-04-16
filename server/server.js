const express = require("express"),
      path = require('path'),
      router = require('./api')
      app = express(),
      port = process.env.PORT || 3000
app.use('/api',router)
app.use(express.static(path.join(__dirname,'../client/build')))
app.get(['/','/contest/:contestid'],(req,res)=>res.sendFile(path.join(__dirname,'../client/build','index.html')))
app.get('/validate_html.png',(req,res)=>res.sendFile(path.join(__dirname,'../client/public/validate_html.png')))
app.get('/validate_css.png',(req,res)=>res.sendFile(path.join(__dirname,'../client/public/validate_css.png')))
app.listen(port,()=>console.log(`Server running at port ${port}`))
