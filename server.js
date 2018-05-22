const express = require('express');
const hbs = require('hbs');
const fs=require('fs');
const port= process.env.PORT || 3000;

var app=express();
hbs.registerPartials(__dirname+'/views/partial');

app.set('view engine','hbs');
app.use(express.static(__dirname));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.use((req,res,next)=>{
var now = new Date().toString();
var log =` ${now} : ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log,(error)=> {
    if(error)
        {
            console.log(error);
        }
});
next();
});

// app.use((req,res,next)=> {
//     res.render('maintenance.hbs', {

//     });
// });

hbs.registerHelper('screamIt',(text)=> {
    return text.toUpperCase();
});
app.get('/',(req,res)=>{
    //res.send('<h1>Hello World </h1>');
    res.render('home.hbs',{
        welcomeMessage : 'Chandni',
      //  date : new Date().getFullYear()
    })
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : 'Error Handling Page'
    })
});



app.listen(port,`Server is starting up on ${port}`);