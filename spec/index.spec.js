const jasmine = require("jasmine");
const { pool } = require("../src/configurations");

const {
  createTable,
  addNewVisitor,
  listAVisitor,
  listAllVisitors,
  deleteAVisitor,
  updateVisitor,
  deleteAllVisitors,
} = require("../src/index");

describe("database manipulation", () => {
  beforeEach(() => {
    spyOn(pool, "query");
  });
  it("createTable function should not throw an error", () => {
    createTable();
    expect(pool.query).toHaveBeenCalledOnceWith(
      "CREATE TABLE IF NOT EXISTS Visitors(id SERIAL PRIMARY KEY,visitorName VARCHAR(50),visitorsAge INTEGER,dateOfVisit DATE,timeOfVisit TIME,nameOfAssistant VARCHAR(50),comments VARCHAR(50))"
    );
  });

  it("addNewVisitor function should not throw an error", () => {
    addNewVisitor("gugu", 26, "02022020", "030403", "vusi", "great");

    expect(pool.query).toHaveBeenCalledOnceWith(
      "INSERT INTO Visitors(visitorName,visitorsAge, dateOfVisit,timeOfVisit, nameOfAssistant,comments)VALUES ($1, $2, $3, $4, $5, $6)  RETURNING *",
      ["gugu", 26, "02022020", "030403", "vusi", "great"]
    );
  });
  it("listAVisitor function should not throw an error", async () => {
    try {
      await listAVisitor(1);
    } catch {
      expect(pool.query).toHaveBeenCalledOnceWith(
        "SELECT * FROM Visitors WHERE Id = $1",
        [1]
      );
    }
  });
  it("listAllVisitors function should not throw an error", async () => {
    try {
      await listAllVisitors();
    } catch {
      expect(pool.query).not.toThrowError();
      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM Visitors");
    }
  });
  it("deleteAVisitor function should not throw an error", () => {
    deleteAVisitor(1);
    expect(pool.query).not.toThrowError();
    expect(pool.query).toHaveBeenCalledWith(
      "DELETE FROM Visitors WHERE id = $1",
      [1]
    );
  });
  it("updateVisitor function should not throw an error", () => {
    updateVisitor("visitorName", 2, "Nandi");
    expect(pool.query).not.toThrowError();
    expect(pool.query).toHaveBeenCalledWith(
      `UPDATE Visitors SET visitorName = $2 WHERE id = $1`,
      [2, "Nandi"]
    );
  });
  it("deleteAllVisitors function should not throw an error", () => {
    deleteAllVisitors();
    expect(pool.query).not.toThrowError();
    expect(pool.query).toHaveBeenCalledWith("DELETE FROM Visitors");
  });
});
