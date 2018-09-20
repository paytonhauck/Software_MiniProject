var express = require('express');
var app = express();

//Connection to Server
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    console.log('request was made: ' + req.url);

    //Parse to write user's name to text file
    if (req.url[1] == '?'){
        var splitname = req.url;
        var namearr = splitname.split('=');
        var username = namearr[1];
        fs.appendFile('testing.txt', '\n' + 'Username: ' + username, function (err){
            if (err) throw err;
        });

        //Send data to Database
        request = new Request("INSERT INTO Data (username, temperature, humidity) VALUES (Payton, 39, 70)");
        connection.execSql(request);

        //Read local file with data needed
        fs.readFile('testing.txt','utf8', function (err, data){
            var printdata = data;
            console.log(data);
        });
        /*
        var x = "Hello";
        document.getElementById("mytext").value = x;
        */
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    myReadStream.pipe(res);
});
server.listen(1818, '127.0.0.1');
console.log('Now listening');


var rantemp = Math.random();        //random number for temperature
rantemp = Math.floor((rantemp*36)+65);  //Putting random number between 65-100

var ranhum = Math.random();        //random number for humidity
ranhum = Math.floor(ranhum*90);  //Putting random number somewhere for %

//Write Number data to local Text File
fs.writeFile('testing.txt', 'Temperature:' + rantemp, function (err) {
    if (err) throw err;
});
fs.appendFile('testing.txt', '\n' + 'Humidity: ' + ranhum, function (err) {
    if (err) throw err;
});


//Random Number Generator For Temp/Humidity (Not Working)
/*
var mynum = document.querySelector('p1');
mynum.textContent = "Your temperature is: " + rantemp;

var mynum = document.querySelector('p2');
mynum.textContent = "Your humidity is: " + ranhum;
*/


//Connecting to Database
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var mysql = require('mysql');
var config = {
    userName: 'phauck',
    password: 'Larissa30',
    server: 'plhauckserver.database.windows.net',
    options: {
        database: 'EC463_Mini',
        encrypt: true
    }
};

var connection = new Connection(config);

connection.on('connect', function(err) {
    console.log("Connected!");
    //creation();       //To create DB table, not necessary anymore
    selection();        //To select certain data from DB table and Print
});


function creation() {
    request = new Request("CREATE TABLE Data (username varchar(255), temperature varchar(3), humidity varchar(3))", function(err) {
        if (err) {
            console.log(err);}
    });
    connection.execSql(request);
    console.log("Table Created!");
}

function selection() {
    request = new Request('SELECT * FROM Data', function(err, result) {
        if (err) {
            console.log(err);}
    });
    request.on('row', function(columns) {
        console.log("Database Contents: ");
        columns.forEach(function(column) {
            console.log(column.value);
        });
    });
    connection.execSql(request);
}

