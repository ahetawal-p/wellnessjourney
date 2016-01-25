var mailer = require("nodemailer");

var email_sender_id = process.env.email_sender_id;
var email_sender_pass = process.env.email_sender_pass;


// Use Smtp Protocol to send Email
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: email_sender_id,
        pass: email_sender_pass
    }
});

var payload = {
           	from: "Wellness Journey Team<do-not-reply@gmail.com>",
            subject: "Wellness Journey Confirm Email",
		    };


var sendMail = function(content, toEmail) {
	payload.html = content;
	payload.to = toEmail;

	console.log(payload);
	smtpTransport.sendMail(payload, function(error) {
		if (error) {
		 	console.log(error);
		 } else {
	  		console.log("SENDING EMAIL");
	  	}
	});
}


module.exports = {
    sendMail : sendMail
};