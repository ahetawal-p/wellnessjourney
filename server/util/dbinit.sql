CREATE TABLE IF NOT EXISTS user_table (
    id 				 	SERIAL,
    userEmail        	TEXT NOT NULL PRIMARY KEY,
    token            	VARCHAR(40) NOT NULL UNIQUE,
    isConfirmed		 	BOOLEAN,
    createdAt        	TIMESTAMP DEFAULT current_timestamp,
    updatedAt        	TIMESTAMP DEFAULT current_timestamp
  );
