const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname+"/views/partials");
app.set('view engine', 'hbs');

app.use((req,res,next) => {
    const now = new Date().toString();
    const log = `${now} : ${req.method} ${req.url}\n`;
    fs.appendFile('server.log',log,(err) => {
        if(err){
            console.log('Unable to write to the file');
        }
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+"/public"));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/',(req,res) => {
    res.render('welcome.hbs',{
        pageTitle:"Welcome Page",
        welcomeMessage:"Welcome to home page",
        currentYear: 'Hello',
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle:'About Page',
    })
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to fulfil the request'
    })
});

app.listen('3000', () => {
    console.log('Server is listening to port 3000');
});