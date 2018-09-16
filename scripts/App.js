
var rantemp = Math.random();        //random number for temperature
rantemp = Math.floor((rantemp*36)+65);  //Putting random number between 65-100

var ranhum = Math.random();        //random number for humidity
ranhum = Math.floor(ranhum*90);  //Putting random number somewhere for %

var mynum = document.querySelector('p1');
mynum.textContent = "Our temperature is: " + rantemp;

var mynum = document.querySelector('p2');
mynum.textContent = "Our humidity is: " + ranhum;

onSignIn();

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

/*
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
    //creation();
    //insertion();
    selection();

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
    request = new Request("INSERT INTO Data (username, temperature, humidity) VALUES ('Test1', 70, 40))", function(err) {
        if (err) {
            console.log(err);}
    });
    connection.execSql(request);
    console.log("Inserted Data");
}

function selection() {
    request = new Request('SELECT * FROM Data', function(err, result) {
        if (err) {
            console.log(err);}
        process.exit();
    });
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value == 'Tester') {
                console.log(column);
            }
            //console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
}
*/