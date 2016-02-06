CREATE TABLE IF NOT EXISTS salesforce.contact (
    id 				SERIAL,
    email        	TEXT NOT NULL PRIMARY KEY,
    lastname		TEXT,
    name			TEXT,
    testAmit__wellness_onboarded__c		BOOLEAN DEFAULT FALSE,
	testAmit__email_validation_token__c VARCHAR(40) NOT NULL UNIQUE,
	sfid			TEXT,
    createddate     TIMESTAMP DEFAULT current_timestamp
  );
