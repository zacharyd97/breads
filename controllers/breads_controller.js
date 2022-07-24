const express = require("express");
const breads = express.Router();
const bread = require("../models/bread.js");
// INDEX

breads.get("/", (req, res) => {
  res.render("index", {
    breads: bread,
    title: "Index Page",
  });
  //res.send(bread);
});

// NEW
breads.get("/new", (req, res) => {
  res.render("new");
});

// SHOW

breads.get("/:arrayIndex", (req, res) => {
  if (bread[req.params.arrayIndex]) {
    res.render("show", {
      bread: bread[req.params.arrayIndex],
      index: req.params.arrayIndex
    });
  } else {
    res.render('404')
  }
});

// CREATE
breads.post("/", (req, res) => {
  console.log(req.body);
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = "true";
  } else {
    req.body.hasGluten = "false";
  }
  Bread.push(req.body);
  res.redirect("/breads");
});

// DELETE
breads.delete('/:indexArray', (req, res) => {
  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})


module.exports = breads;
