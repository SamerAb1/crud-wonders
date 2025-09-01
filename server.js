const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

const wonders = [
  { name: "Mount Everest", location: "Nepal", visited: false },
  { name: "Grand Canyon", location: "Arizona", visited: false },
  { name: "Botanical Gardens", location: "Singapore", visited: true },
  { name: "Pantheon", location: "Greece", visited: false },
  { name: "Colosseum", location: "Italy", visited: true },
];

app.get("/wonders", function (req, res) {
  res.send(wonders);
});

app.post("/wonder", function (req, res) {
  console.log("Someone's trying to make a post request");
  wonders.push({ ...req.body, visited: false });
  res.end();
});

app.put("/wonder/:name", function (req, res) {
  console.log("About to update someone");
  wonders.find((w) => w.name === req.params.name).visited = true;
  res.end();
});

app.delete("/wonder/:name", function (req, res) {
  console.log("About to delete someone");
  const wondersIndex = wonders.findIndex((w) => w.name === req.params.name);
  wonders.splice(wondersIndex, 1);
  console.log(wonders);
  res.end();
});

const port = 1337; //because why not
app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
