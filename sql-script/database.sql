CREATE DATABASE db


CREATE TABLE Visitors (
    id SERIAL PRIMARY KEY,
    visitorName VARCHAR(50),
    visitorsAge INTEGER,
    dateOfVisit DATE,
    timeOfVisit TIME,
    nameOfAssistant VARCHAR(50),
    comments VARCHAR(50)
)