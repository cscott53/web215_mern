let express = require('express'),
    path = require('path'),
    port = 3000,
    app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'src')))
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/src/app.js', (req,res) => {
    res.sendFile(path.join(__dirname, 'src', 'app.js'))
})
app.listen(port,()=>{console.log(`Server running at port ${port}`)})
process.on('SIGINT',()=>process.exit(0))