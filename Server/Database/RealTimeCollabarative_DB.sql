USE RealTimeCollabarativeEditor

CREATE TABLE Real_Time_Users(
    User_Id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
);

SELECT * FROM Real_Time_Users