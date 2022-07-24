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

// EDIT
breads.get('/:arrayIndex/edit', (req, res) => {
  res.render('edit', {
    bread: bread[req.params.arrayIndex],
    index: req.params.arrayIndex
  })
})


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
  bread.push(req.body);
  res.redirect("/breads");
});

// DELETE
breads.delete('/:arrayIndex', (req, res) => {
  bread.splice(req.params.arrayIndex, 1)
  res.status(303).redirect('/breads')
})

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})


module.exports = breads;
