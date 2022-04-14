var rp = require('request-promise')
var express = require('express')
var app = express()
var bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: true}))
let port = process.env.PORT || 3000;
var url, jsondata, finaldata;
var movien; 

app.get('/', function(req, res){
    res.render('home.ejs');    
})



app.post('/moviesearch', function(req, res){
    movien = req.body.movie;
    movien = movien.replace(/ /g,"+");
    console.log(movien) 
    url = ("http://www.omdbapi.com/?s="+movien+"&apikey=thewdb")
    // console.log(url)
    rp(url)
        .then(function(htmlrender){
            jsondata = JSON.parse(htmlrender)
            finaldata= jsondata.Search
            //console.log(finaldata)
            console.log(jsondata.Search.length)
            res.redirect('/searchresults');
        })
        .catch(function(err){
            console.log("Error!"+ err)
        })
    // res.redirect('/');    
        
})

app.get('/searchresults',function(req, res){
    console.log("this is from search results ")
    console.log(finaldata)
    res.render('search.ejs',{search: finaldata})
})

app.listen(port,function(){
    console.log("Server is running on port ",port)
})
