const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipes");
const unirest = require("unirest");

const apiKey = '0a6685e6362045c38a6ca038dd3431c8'
//search recipe given the ingredients

router.get('/findByIngredients', (req, res) => {
  //service url will be used to call the spoonacular API
  let serviceURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=`;
  
  //body of request will  be a json containing the array of ingredients
  const ingredients = req.body.ingredients;

  console.log(`the array of ingredients read is: ${ingredients}`);

  //create a string with the ingredients
  var string = `${ingredients}`;
  string = string.split(',').join(",+");
  console.log(`the string modified is: ${string}`);
  serviceURL = serviceURL + string;
  console.log(`the service url is now: ${serviceURL}` );

  //use spoonacular API
  //send the response back to the client
  unirest.get(serviceURL).end(result => {
    if(result.status == 200){
      res.send(result.body);
      res.status(200);
    }

    else{
      res.send('Something failed \n');
    }
  })
  
})
//successfully tested on postman

module.exports = router;