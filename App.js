//Connection to Server
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    console.log('request was made: ' + req.url);
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
    myReadStream.pipe(res);
});

server.listen(1818, '127.0.0.1');
console.log('Now listening');


//Random Number Generator For Temp/Humidity (Not Working)
/*
var rantemp = Math.random();        //random number for temperature
rantemp = Math.floor((rantemp*36)+65);  //Putting random number between 65-100

var ranhum = Math.random();        //random number for humidity
ranhum = Math.floor(ranhum*90);  //Putting random number somewhere for %

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
    //insertion();      //To insert elements into DB table
    selection();        //To select certain data from DB table
});


function creation() {
    request = new Request("CREATE TABLE Data (username varchar(255), temperature varchar(3), humidity varchar(3))", function(err) {
        if (err) {
            console.log(err);}
    });
    connection.execSql(request);
    console.log("Table Created!");
}

function insertion() {
    request = new Request("INSERT INTO Data (username, temperature, humidity) VALUES ('Payt', 50, 90))", function (err) {
        if (err) {
            console.log(err);}
    });
    connection.execSql(request);
    console.log("Inserted Data!");
}

function selection() {
    request = new Request('SELECT * FROM Data', function(err, result) {
        if (err) {
            console.log(err);}
        //process.exit();
    });
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value == 'Tester') {
                console.log(column);
                username = column.value;
            }
            //console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}

