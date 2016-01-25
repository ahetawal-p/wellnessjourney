var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var confirmEmailBody = fs.readFileSync(path.join(__dirname, '../views/confirm-email.ejs'), 'utf8');

var getConfirmEmailHTML = function(host, port, registerToken){
	var baseUrl = "http://" + host + ":" + port + "/"
	var registerUrl = baseUrl + "confirm?token=" + registerToken; 
	var imageUrl = baseUrl + "images/journey.jpg";
	var html = ejs.render(confirmEmailBody, { url: registerUrl, image: imageUrl });
	//console.log(html);
	return html;
}

module.exports = {
    getConfirmEmailHTML : getConfirmEmailHTML
};