/**
Script for setting the tables. 
ONLY for one time use...
**/

var fs = require('fs'),
    path = require('path'),
    db = require('./dbutil');

var filePath = path.join(__dirname, './dbinit.sql');

fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        db.query(data)
            .then(function() {
                console.log('Postgres tables successfully initialized') ;
                db.close();
            })
            .catch(function(error) {
                console.log('Error initializing Postgres tables initialized');
                console.log(error)
                db.close();
            })
    }

});