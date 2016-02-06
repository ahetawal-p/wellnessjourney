var express = require('express');
var crypto = require('crypto');
var templateUtil = require('../util/ejsutil.js');
var emailUtil = require('../util/emailutil.js');
var dbUtil = require('../util/dbutil.js');
var url  = require('url');


var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('signup', { title: 'Wellness Journey' });
});

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Wellness Journey' });
});


router.get('/delete', function(req, res, next) {
	var userEmail = req.query.email;
	dbUtil.query("DELETE FROM USER_TABLE WHERE userEmail=($1)", [userEmail])
	.done(function(result){
		res.send("Deleted " + userEmail);
	},
    function(error){
    	console.log(error);
    	next(error);
	});
	
});



router.post('/register', function(req, res, next) {
	var userEmail = req.body.user_email;
	console.log("HERE is the email passed.. " + userEmail);
	//*** TODO : REMOVE THIS LATER
		userEmail = "amit.hetawal@gmail.com";
	// ******
	var confirmToken = generateRandomValueHex(12);

	dbUtil.query("SELECT COUNT(*) FROM USER_TABLE where userEmail=($1)", [userEmail], true)
		.then(function(result){
			if(result && result.count == 0) {
				console.log("Inserting");
				insertNewUser(req, res, userEmail, confirmToken);
			} else {
				console.log("Not inserting");
				return next(new Error('User Already Registered'));
			}
		});

});

router.get('/confirm', function(req, res, next) {
	var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var userToken = query.token;
    var userEmail = query.email;
    dbUtil.query("UPDATE USER_TABLE set isConfirmed=($1), updatedAt=($2) where userEmail=($3) and token=($4) and isConfirmed=($5)", ["true", new Date(), userEmail, userToken, "false"])
    	.done(function(updateCount){
    			console.log("UPDATE COUNT IS >> " + updateCount);
    			if(updateCount == 1){
    				res.send("Your seat is confirmed. Sit back and relax !! ");
    			} else {
    				res.send("Invalid Confirmation request...");
    			}
    		},
    		function(error){
    			console.log(error);
    			next(error);
    	});
});


var insertNewUser = function(req, res, userEmail, confirmToken){
	dbUtil.query("INSERT INTO USER_TABLE (userEmail, token) values ($1, $2)", [userEmail, confirmToken])
				.then(function(result){
					var emailBody = templateUtil.getConfirmEmailHTML(req.hostname, req.app.settings.port, confirmToken, userEmail);
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
}



var generateRandomValueHex = function(len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

module.exports = router;
