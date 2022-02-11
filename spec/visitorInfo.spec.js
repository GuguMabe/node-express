const { Visitor, changeNameToJsonFormat, load } = require("../src/visitorInfo");

const fs = require("fs");

let charlie = new Visitor(
  "Charley Sheen",
  60,
  "28/02/2021",
  "15:00",
  "cool",
  "Mandy"
);

describe("changeNameToJsonFormat function", () => {
  it("should produce string in proper format", () => {
    expect(changeNameToJsonFormat("Charley Sheen")).toBe(
      "visitor_charley_sheen.json"
    );
  });
});

describe("file io", () => {
  it("the save function functionality", () => {
    spyOn(fs, "writeFile");
    charlie.save();
    expect(fs.writeFile).toHaveBeenCalledOnceWith(
      "visitor_charley_sheen.json",
      JSON.stringify(charlie, null, 2),
      jasmine.any(Function)
    );
  });

  it("the load functionality", () => {
    spyOn(fs, "readFile");
    load("Charley Sheen");
    expect(fs.readFile).toHaveBeenCalledOnceWith(
      "visitor_charley_sheen.json",
      "utf8",
      jasmine.any(Function)
    );
  });
});
