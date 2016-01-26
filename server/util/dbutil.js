var pg = require('pg');
var config = require('../util/constants.js');
var Q = require('q');
var databaseURL = config.databaseURL;

/**
 * Utility function to execute a SQL query against a Postgres database
 * @param sql
 * @param values
 * @param singleItem
 * @returns {promise|*|Q.promise}
 */
exports.query = function (sql, values, singleItem, dontLog) {

    if (!dontLog) {
        typeof values !== 'undefined' ? console.log(sql, values) : console.log(sql);
    }

    var deferred = Q.defer();

    pg.connect(databaseURL, function (err, conn, done) {
        if (err) return deferred.reject(err);
        try {
            conn.query(sql, values, function (err, result) {
                done();
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(singleItem ? result.rows[0] : result.rows);
                }
            });
        }
        catch (e) {
            done();
            deferred.reject(e);
        }
    });

    return deferred.promise;
 
};

exports.close = function() {
    pg.end();
}