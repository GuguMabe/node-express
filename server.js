const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const path = require("path");
const {
  addNewVisitor,
  createTable,
  listAVisitor,
  listAllVisitors,
  deleteAVisitor,
  updateVisitor,
  deleteAllVisitors,
} = require("./src/index");
const port = 8081;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/new_visit", (req, res) => {
  res.sendFile(path.join(__dirname + "/form.html"));
});

createTable();

app.post("/addNewVisitor", async function (req, res, next) {
  try {
    let userData = req.body;

    const newVisitor = await addNewVisitor(
      userData.visitorname,
      userData.visitorage,
      userData.date,
      userData.time,
      userData.assistantname,
      userData.comments
    );

    res.render("index", {
      title: "Thank you Page",
      message:
        "Thank you for the info! The following was saved to the database:",
      id: newVisitor.rows[0].id,
      name: userData.visitorname,
      age: userData.visitorage,
      date: userData.date,
      time: userData.time,
      assistant: userData.assistantname,
      comments: userData.comments,
    });
  } catch (err) {
    next(
      new Error(
        "cannot list data from form, make sure spelling and arguments are correct"
      )
    );
  }
});

app.get("/viewVisitors", async function (req, res, next) {
  try {
    res.send(await listAllVisitors());
  } catch (err) {
    next(new Error("cannot list visitors, make sure spelling is correct"));
  }
});

app.get("/viewVisitor:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    res.send(await listAVisitor(id));
  } catch (err) {
    next(
      new Error(
        "cannot list visitors make sure spelling and arguments are correct and id exists"
      )
    );
  }
});

app.patch("/updateVisitor:id/:field/:newData", async function (req, res, next) {
  try {
    let id = req.params.id;
    const field = req.params.field;
    const newData = req.params.newData;

    res.send(await updateVisitor(field, id, newData));
  } catch (err) {
    next(
      new Error(
        "cannot update column, make sure spelling and parameters/arguments are correct"
      )
    );
  }
});

app.delete("/deleteVisitor:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    res.send(await deleteAVisitor(id));
  } catch (err) {
    next(
      new Error(
        "cannot delete data, make sure spelling and arguments are correct"
      )
    );
  }
});

app.delete("/deleteAllVisitors", async function (req, res, next) {
  try {
    res.send(await deleteAllVisitors());
  } catch (err) {
    next(
      new Error(
        "cannot delete visitors, make sure spelling and arguments are correct"
      )
    );
  }
});

app.use((req, res, next) => {
  const err = new Error("Not found, please check your spelling");
  err.status = 404;
  next(err);
});
// error handler
app.use((error, req, res, next) => {
  req.status = error.status || 500;
  res.json({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});
