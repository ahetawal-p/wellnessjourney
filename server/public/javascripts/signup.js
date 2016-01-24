$(document).ready(function() {
  $('.login-input').on('focus', function() {
  		$('.login').addClass('focused');
	});

   $('.login-btn').hover(function() {
  		validateEmail($("#email-input").val());
  	});

	$('.login').on('submit', function(e) {
		  e.preventDefault();
		  var email = "";
		  email = $("#email-input").val();
		  if(!isValidEmailAddress(email)){
		  	$("#validation-msg").show();
		  } else {
		  	// TODO: make ajax call for registering user
		 	//$('.login').removeClass('focused').addClass('loading');
		 	$('.login-form').hide();
		 	$('.confirmEmailMsg').show();
		 }
	});

$("#email-input").keyup(function(){
		var email = $("#email-input").val();
        validateEmail(email);
    });
	
	function validateEmail(email){
		if(email != 0) {
        	email = email.trim();
            if(isValidEmailAddress(email)) {
                $("#email-input-error").css({
                    "background-image": "url('../images/accept.png')"
                });
            } else {
                $("#email-input-error").css({
                    "background-image": "url('../images/exclamation.png')"
                });
            }
        } else {
            $("#email-input-error").css({
                "background-image": "none"
            });
        }
         $("#validation-msg").hide();    
    }

	function isValidEmailAddress(emailAddress) {
    		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    		if(pattern.test(emailAddress)){
    			if (emailAddress.indexOf('@salesforce.com', emailAddress.length - '@salesforce.com'.length) !== -1) {
            		return true;
        		} else {
            		//console.log('Email must be a salesforce e-mail address (your.name@salesforce.com).');
            		return false;
        		}
    		} else {
        		//console.log('Not a valid e-mail address.');
        		return false;
    		}
		}

});