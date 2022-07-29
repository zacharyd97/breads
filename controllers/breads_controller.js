const express = require("express");
const breads = express.Router();
const bread = require("../models/bread.js");



// INDEX
breads.get('/', (req, res) => {
  console.log(bread.find())
  bread.find()
      .then(foundBreads => {
          res.render('Index', {
              breads: foundBreads,
              title: 'Index Page'
          })
      })
})


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
breads.get('/:id', (req, res) => {
  bread.findById(req.params.id)
      .then(foundBread => {
          res.render('show', {
              bread: foundBread
          })
      })
})


// CREATE
breads.post('/', (req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  bread.create(req.body)
  res.redirect('/breads')
})



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
