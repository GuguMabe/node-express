const { pool } = require("./configurations");

const createTable = async function () {
  const sqlCommand =
    "CREATE TABLE IF NOT EXISTS Visitors(id SERIAL PRIMARY KEY,visitorName VARCHAR(50),visitorsAge INTEGER,dateOfVisit DATE,timeOfVisit TIME,nameOfAssistant VARCHAR(50),comments VARCHAR(50))";
  const results = await pool.query(sqlCommand);
  return results;
};

const addNewVisitor = async function (
  visitorName,
  visitorsAge,
  dateOfVisit,
  timeOfVisit,
  nameOfAssistant,
  comments
) {
  const sqlCommand =
    "INSERT INTO Visitors(visitorName,visitorsAge, dateOfVisit,timeOfVisit, nameOfAssistant,comments)VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *";
  const data = [
    visitorName,
    visitorsAge,
    dateOfVisit,
    timeOfVisit,
    nameOfAssistant,
    comments,
  ];

  const results = await pool.query(sqlCommand, data);
  return results;
};
const listAllVisitors = async function () {
  const sqlCommand = "SELECT * FROM Visitors";

  let results = await pool.query(sqlCommand);
  return results.rows;
};
const listAVisitor = async function (id) {
  const sqlCommand = "SELECT * FROM Visitors WHERE Id = $1";
  const data = [id];

  const results = await pool.query(sqlCommand, data);
  return results.rows;
};
const deleteAVisitor = async function (id) {
  const sqlCommand = "DELETE FROM Visitors WHERE id = $1";
  const input = [id];

  const results = await pool.query(sqlCommand, input);
  return results;
};

const updateVisitor = async function (field, id, newData) {
  const sqlCommand = `UPDATE Visitors SET ${field} = $2 WHERE id = $1`;
  const data = [id, newData];

  const results = await pool.query(sqlCommand, data);
  return results;
};

const deleteAllVisitors = async function () {
  const sqlCommand = "DELETE FROM Visitors";

  const results = await pool.query(sqlCommand);
  return results;
};

module.exports = {
  createTable,
  addNewVisitor,
  listAVisitor,
  listAllVisitors,
  deleteAVisitor,
  updateVisitor,
  deleteAllVisitors,
};
