var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var express = require('express');
var app = express();
app.use(express.static('public')); 
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

/////************MAINPAGE*************************************
app.get('/', function (req, res) {
    MongoClient.connect(url, function(err, db1) 

    {
    
    var db=db1.db('mydb');
    db.collection("district").find().toArray(function(err, result)
    
     {
    res.write("<html><head>")  //bootstrap  
    res.write("<meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'><script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script><script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>") 
    res.write("</head>")
    res.write("<body>")
    res.write("<div class='container'>")
    res.write("<nav class='navbar navbar-expand-sm bg-dark navbar-dark'> <a class='navbar-brand' href='/'>PURI(ODISHA)</a><ul class='navbar-nav'><li class='nav-item dropdown'><a class='nav-link dropdown-toggle' href='#' id='navbardrop' data-toggle='dropdown'>TOURISM </a><div class='dropdown-menu'><a class='dropdown-item' href='/tplace'>TOURIST PLACE</a><a class='dropdown-item' href='/acco'>ACCOMODATION</a><a class='dropdown-item' href='/place'>PLACE OF INTEREST</a></div></li></ul></nav> ");
    res.write("<h3 style='margin-top:20px;'>DISTRICT AT A GLANCE</h3>")
    res.write("<table class='table table-hover' style='margin-top:5px;'>"); 
    res.write("<thead><tr class='table-success'><th>TYPE</th><th>INFORMATION</th></thead>");      
    
    for(var i=0;i<result.length;i++)
    {
    
    var type=result[i]['type'];
    var information=result[i]['information'];
    
    res.write("<tbody><tr><td>"+type+"</td><td>"+information+"</td></tbody>"); 
    }
    res.write("</table>"); 
    res.write("<a href='/log' class='btn btn-success'>Admin Login</a>");
    res.write("</div></body></html>")
    res.end();
      });
     });
});
/////*********LOGIN PAGE SEND*********************************
app.get('/log',(req,res)=>{
    res.sendFile(__dirname+"/"+"loginpage.html")
});
///***********************************************************
///**********LOGIN PAGE POST**********************************
app.post('/login', function (req, res) {
    var email=req.body.email;
    var pass=req.body.pwd;
   if((email==="ashispatel1998@gmail.com" ||"amanmund55@gmail.com" ||"bhavanideo1999@gmail.com") &&(pass==="1234")){
       res.sendFile(__dirname+"/"+"add.html")
   }
   else{
       res.sendFile(__dirname+"/"+"loginpage.html")
   }
 });
 //////*************PLACE OF INTEREST
 app.post('/placeinsert',(req,res)=>{
    var place=req.body.place;
    var description=req.body.description;

   
   MongoClient.connect(url, function(err, db) {
       var dbo = db.db("mydb");
       var myobj = { place: place,description: description};
   
    dbo.collection("cityplace").insertOne(myobj, function(err, res) 
   {
       if(err){console.log(err)}
       console.log("1 record inserted");
       db.close();
     });
    });
        res.sendFile(__dirname+"/"+"add.html")
 });
/////-----------------------------------------
 /////***********place of interset END************************
app.get('/place',(req,res)=>{
    MongoClient.connect(url, function(err, db1) 

    {
    
    var db=db1.db('mydb');
    db.collection("cityplace").find().toArray(function(err, result)
    
     {
    res.write("<html><head>")  //bootstrap  
    res.write("<meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'><script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script><script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>") 
    res.write("</head>")
    res.write("<body>")
    res.write("<div class='container'>")
    res.write("<nav class='navbar navbar-expand-sm bg-dark navbar-dark'> <a class='navbar-brand' href='/'>PURI(ODISHA)</a><ul class='navbar-nav'><li class='nav-item dropdown'><a class='nav-link dropdown-toggle' href='#' id='navbardrop' data-toggle='dropdown'>TOURISM </a><div class='dropdown-menu'><a class='dropdown-item' href='/tplace'>TOURIST PLACE</a><a class='dropdown-item' href='/acco'>ACCOMODATION</a><a class='dropdown-item' href='/place'>PLACE OF INTEREST</a></div></li></ul></nav> ");
    
    res.write("<table class='table table-hover' style='margin-top:20px;'>"); 
    res.write("<thead><tr class='table-success'><th>PLACE</th><th style='text-align:center;'>DESCRIPTION</th></thead>");      
    
    for(var i=0;i<result.length;i++)
    {
    
    var place=result[i]['place'];
    var description=result[i]['description'];
    
    res.write("<tbody><tr><td>"+place+"</td><td>"+description+"</td></tbody>"); 
    }
    res.write("</table>"); 
    res.write("</div></body></html>")
    res.end();
      });
     });
});
///////*******************ACCOMODATION DETAILS****************
app.get('/acco',(req,res)=>{
    MongoClient.connect(url, function(err, db1) 

    {
    
    var db=db1.db('mydb');
    db.collection("res").find().toArray(function(err, result)
    
     {
    res.write("<html><head>")  //bootstrap  
    res.write("<meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'><script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script><script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>") 
    res.write("</head>")
    res.write("<body>")
    res.write("<div class='container'>")
    res.write("<nav class='navbar navbar-expand-sm bg-dark navbar-dark'> <a class='navbar-brand' href='/'>PURI(ODISHA)</a><ul class='navbar-nav'><li class='nav-item dropdown'><a class='nav-link dropdown-toggle' href='#' id='navbardrop' data-toggle='dropdown'>TOURISM </a><div class='dropdown-menu'><a class='dropdown-item' href='/tplace'>TOURIST PLACE</a><a class='dropdown-item' href='/acco'>ACCOMODATION</a><a class='dropdown-item' href='/place'>PLACE OF INTEREST</a></div></li></ul></nav> ");
    
    res.write("<table class='table table-hover' style='margin-top:20px;'>"); 
    res.write("<thead><tr class='table-success'><th>RESTAURANT</th><th>MOBILE NO</th><th>EMAIL</th><th>ADDRESS</th><th>WEBSITE</th></thead>");      
    
    for(var i=0;i<result.length;i++)
    {
    
    var rname=result[i]['rname'];
    var mobile=result[i]['phone'];
    var email=result[i]['email'];
    var address=result[i]['address'];
    var website=result[i]['website'];
    
    res.write("<tbody><tr><td>"+rname+"</td><td>"+mobile+"</td><td>"+email+"</td><td>"+address+"</td><td>"+website+"</td></tbody>"); 
    }
    res.write("</table>"); 
    res.write("</div></body></html>")
    res.end();
      });
     });
});
////********************ACCOMODATION END**********************
////******************TOURIST PLACE***************************
app.get('/tplace',(req,res)=>{
    MongoClient.connect(url, function(err, db1) 

    {
    
    var db=db1.db('mydb');
    db.collection("touristplace").find().toArray(function(err, result)
    
     {
    res.write("<html><head>")  //bootstrap  
    res.write("<meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1'><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'><script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script><script src='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>") 
    res.write("</head>")
    res.write("<body>")
    res.write("<div class='container'>")
    res.write("<nav class='navbar navbar-expand-sm bg-dark navbar-dark'> <a class='navbar-brand' href='/'>PURI(ODISHA)</a><ul class='navbar-nav'><li class='nav-item dropdown'><a class='nav-link dropdown-toggle' href='#' id='navbardrop' data-toggle='dropdown'>TOURISM </a><div class='dropdown-menu'><a class='dropdown-item' href='/tplace'>TOURIST PLACE</a><a class='dropdown-item' href='/acco'>ACCOMODATION</a><a class='dropdown-item' href='/place'>PLACE OF INTEREST</a></div></li></ul></nav> ");
    
    res.write("<table class='table table-hover' style='margin-top:20px;'>"); 
    res.write("<thead><tr class='table-success'><th>PLACE</th><th style='text-align:center;'>DESCRIPTION</th><th>PHOTO</td></thead>");      
    
    for(var i=0;i<result.length;i++)
    {
    
    var place=result[i]['place'];
    var description=result[i]['description'];//"+i+"
    res.write("<tbody><tr><td>"+place+"</td><td>"+description+"</td><td><img style='margin-left:5px;width='100%' height='100%''  src=http://localhost:9000/images/puri"+i+".jpg></td></tr></tbody>"); 
    }
    res.write("</table>"); 
    res.write("</div></body></html>")
    res.end();
      });
     });
});
////*******************TOURIST PLACE END**********************
/////*****************ACCOMODATION INSERT DETAILS*************
app.post('/accoadd',(req,res)=>{
    var rname=req.body.rname;
    var phone=req.body.phone;
    var em=req.body.email;
    var address=req.body.addr;
    var web=req.body.web;
   
   MongoClient.connect(url, function(err, db) {
       var dbo = db.db("mydb");
       var myobj = { rname: rname,phone: phone,email: em,address: address,website:web};
   
    dbo.collection("res").insertOne(myobj, function(err, res) 
   {
       if(err){console.log(err)}
       console.log("1 record inserted");
       db.close();
     });
    });
    res.sendFile(__dirname+"/"+"add.html")
});

 ///////*****************ACCOMODATION INSERT END**************
/////*******************************tplace insert*************
app.post('/tplaceinsert',(req,res)=>{
    var place=req.body.place;
    var des=req.body.desc;

   
   MongoClient.connect(url, function(err, db) {
       var dbo = db.db("mydb");
       var myobj = { place:place,description:des};
   
    dbo.collection("touristplace").insertOne(myobj, function(err, res) 
   {
       if(err){console.log(err)}
       console.log("1 record inserted");
       db.close();
     });
    });
    res.sendFile(__dirname+"/"+"add.html")
});
//////********************tplace end***********
//////********************server connection start*************
var port=9000;
var server = app.listen(port, function () {
    console.log('Node server is running on '+port);
});
//////********************server connection end***************