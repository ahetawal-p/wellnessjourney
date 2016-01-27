var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var confirmEmailBody = fs.readFileSync(path.join(__dirname, '../views/confirm-email.ejs'), 'utf8');
var querystring = require("querystring");

var getConfirmEmailHTML = function(host, port, registerToken, userEmail){
	var baseUrl;
	if(host == 'localhost'){
		baseUrl = "http://" + host + ":" + port + "/";
	}else {
		baseUrl = "http://" + host + "/";
	}
	var params = querystring.stringify({ token: registerToken, email: userEmail});
	console.log("QUERY IS >> " + params);

	var registerUrl = baseUrl + "confirm?" + params;
	var imageUrl = baseUrl + "images/journey.jpg";
	var html = ejs.render(confirmEmailBody, { url: registerUrl, image: imageUrl });
	return html;
}

module.exports = {
    getConfirmEmailHTML : getConfirmEmailHTML
};