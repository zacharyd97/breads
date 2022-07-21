const express = require('express')
const breads = express.Router()
const bread = require('../models/bread.js')
// INDEX

breads.get("/",(req,res)=>{
  res.render('index',
    {
      breads:bread,
      title:'Index Page'
    }
  )
  //res.send(bread)
})
// SHOW
breads.get('/:arrayIndex', (req, res) => {
  res.send(bread[req.params.arrayIndex])
})


module.exports = breads
