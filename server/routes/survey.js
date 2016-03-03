var express = require('express');
var router = express.Router();
var templateUtil = require('../util/ejsutil.js');
var emailUtil = require('../util/emailutil.js');
var url  = require('url');

/* GET users listing. */
router.post('/notify', function(req, res, next) {
  console.log(req.body);
  //var emailBody = templateUtil.getNotifyNewSurveyEmail('http://yahoo.com', 'notify-new-survey.ejs');
  //return emailUtil.sendMail(emailBody, userEmail);

  res.send('respond with a resource');
});



module.exports = router;