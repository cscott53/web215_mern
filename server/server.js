const express = require("express"),
      path = require('path'),
      router = require('./api')
      app = express(),
      port = process.env.PORT || 3000
app.use('/api',router)
app.use(express.static(path.join(__dirname,'../client/build')))
app.get(['/','/contest/:contestid'],(req,res)=>res.sendFile(path.join(__dirname,'../client/build','index.html')))
for (var image of ['validate_html.png','validate_css.png','edit_button.png','delete_button.png']) {
    app.get('/'+image,(req,res)=>res.sendFile(path.join(__dirname,'../client/public/'+image)))
}
app.listen(port,()=>console.log(`Server running at port ${port}`))
