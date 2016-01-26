var express = require('express');
var crypto = require('crypto');
var templateUtil = require('../util/ejsutil.js');
var emailUtil = require('../util/emailutil.js');
var dbUtil = require('../util/dbutil.js');


var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

	// dbUtil.query("SELECT * from items1")
 //        .then(function (stores) {
 //            console.log(JSON.stringify(stores));
 //        }).catch(next);

  	res.render('signup', { title: 'Sign Up!!' });
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Sign Up!!' });
});

router.post('/register', function(req, res, next) {
	var userEmail = req.body.user_email;
	console.log("HERE is the email passed.. " + userEmail);
	//*** TODO : REMOVE THIS LATER
		userEmail = "amit.hetawal@gmail.com";
	// ******
	var confirmToken = generateRandomValueHex(12);

	dbUtil.query("INSERT INTO USER_TABLE (userEmail, token) values ($1, $2)", [userEmail, confirmToken])
				.then(function(result){
					var emailBody = templateUtil.getConfirmEmailHTML(req.hostname, req.app.settings.port, confirmToken);
					return emailUtil.sendMail(emailBody, userEmail);
				}).done(function(successResult){
							console.log("Sucess >> " + successResult);
							res.send('Success');
						},
						function(errorResult){
							console.log("Error >> " + JSON.stringify(errorResult));
							console.log("Doing Cleanup now for the user entries...");
							dbUtil.query("DELETE FROM USER_TABLE WHERE userEmail=($1)", [userEmail]);
							next(errorResult);
						});

});

router.get('/confirm', function(req, res, next) {
	var userToken = req.query.token;
	res.send("Your seat is confirmed. Sit back and relax !! " + userToken);
	
});


var generateRandomValueHex = function(len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

module.exports = router;
