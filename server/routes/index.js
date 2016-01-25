var express = require('express');
var crypto = require('crypto');
var templateUtil = require('../util/ejsutil.js');
var emailUtil = require('../util/emailutil.js');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
	var emailBody = templateUtil.getConfirmEmailHTML(req.host, req.app.settings.port, confirmToken);
	emailUtil.sendMail(emailBody, userEmail);
  	res.send('Success');
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
