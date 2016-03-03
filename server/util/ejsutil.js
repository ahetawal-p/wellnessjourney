var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

var querystring = require("querystring");

var getConfirmEmailHTML = function(host, port, registerToken, userEmail, templateName){
	var baseUrl;
	var templateLocation = '../views/' + templateName;
	var confirmEmailBody = fs.readFileSync(path.join(__dirname, templateLocation), 'utf8');
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


var getNotifyNewSurveyEmail = function(surveyLink, surveyName, templateName){
	var baseUrl;
	var templateLocation = '../views/' + templateName;
	var confirmEmailBody = fs.readFileSync(path.join(__dirname, templateLocation), 'utf8');
	if(host == 'localhost'){
		baseUrl = "http://" + host + ":" + port + "/";
	}else {
		baseUrl = "http://" + host + "/";
	}
	
	var imageUrl = baseUrl + "images/journey.jpg";
	var html = ejs.render(confirmEmailBody, { url: surveyLink, image: imageUrl, surveyName: surveyName });
	return html;
}



module.exports = {
    getConfirmEmailHTML : getConfirmEmailHTML
};