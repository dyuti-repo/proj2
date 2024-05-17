const express = require('express');
const app = express();
const port = 3000;

//static files reading for style.css
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/img',express.static(__dirname + 'public/img'))
app.use('/js',express.static(__dirname + 'public/js'))

//template engine
app.set('views','./src/views/')
app.set('view engine','hbs')

//Routes
const pcmsRouter = require('./src/routes/pcms')

app.use('/',pcmsRouter)

//listen to port 3000
app.listen(port,()=>{
    console.log("listening on port: " + port);
    console.log('connection established');
})