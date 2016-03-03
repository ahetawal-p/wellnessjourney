var mailer = require("nodemailer");
var constants = require('../util/constants.js');
var Q = require('q');

var email_sender_id = constants.email_sender_id;
var email_sender_pass = constants.email_sender_pass;


// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: email_sender_id,
        pass: email_sender_pass
    }
});

var payload = {
           	from: "Wellness Journey Team<do-not-reply@gmail.com>"
            };


var sendMail = function(content, toEmail, subject) {
	payload.html = content;
	payload.to = toEmail;
	payload.subject = subject;

	var deferred = Q.defer();
	smtpTransport.sendMail(payload, function(error) {
		if (error) {
			console.log(error);
		 	deferred.reject(error);
		 } else {
	  		deferred.resolve("Success");
	  	}

	});
	return deferred.promise;
}


module.exports = {
    sendMail : sendMail
};