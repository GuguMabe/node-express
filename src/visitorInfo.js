const fs = require("fs");

class Visitor {
  constructor(fullName, age, dateOfVisit, timeOfVisit, comments, assistant) {
    this.fullName = fullName;
    this.age = age;
    this.dateOfVisit = dateOfVisit;
    this.timeOfVisit = timeOfVisit;
    this.comments = comments;
    this.assistant = assistant;
  }

  save() {
    fs.writeFile(
      changeNameToJsonFormat(this.fullName),
      JSON.stringify(this, null, 2),
      (err) => {
        if (err) throw err;
        else {
          console.log("file saved");
        }
      }
    );
  }
}

function changeNameToJsonFormat(visitorsName) {
  return `visitor_${visitorsName.replace(" ", "_").toLowerCase()}.json`;
}

function load(visitorsName) {
  fs.readFile(changeNameToJsonFormat(visitorsName), "utf8", (err, data) => {
    if (err) throw err;
    else {
      console.log(data);
    }
  });
}

module.exports = {
  Visitor,
  changeNameToJsonFormat,
  load,
};
