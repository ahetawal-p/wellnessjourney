var express = require('express');
var router = express.Router();
var templateUtil = require('../util/ejsutil.js');
var emailUtil = require('../util/emailutil.js');
var url  = require('url');
var dbUtil = require('../util/dbutil.js');


/* GET users listing. */
router.post('/notify', function(req, res, next) {
  var newSurveyObj = req.body.new[0];
  console.log(newSurveyObj);
  var contactId = newSurveyObj.testAmit__Contact_ID__c;
  var surveyLink = newSurveyObj.testAmit__Survey_Link__c;
  var surveyName = newSurveyObj.Name;

  dbUtil.query("SELECT email FROM salesforce.contact where sfid=($1)", [contactId], true)
		.then(function(result){
			console.log(result);
			var emailBody = templateUtil.getNotifyNewSurveyEmail(surveyLink, surveyName, 'notify-new-survey.ejs');
			console.log(emailBody);
			return emailUtil.sendMail(emailBody, result.email, 'Wellness Journey New Survey Notification');
	}).done(function(successResult){
							console.log("Sucess >> " + successResult);
							res.send('Success');
						},
						function(errorResult){
							console.log("Error >> " + JSON.stringify(errorResult));
							res.send('Error');
						});
  
});

module.exports = router;