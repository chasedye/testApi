const express = require("express");
const router = express.Router();
const unirest = require("unirest");
const Recipe = require("../models/recipes");

const apiKey = "c6c009bfc5d94c749058ddf0b971b6f7";
//search recipe given the ingredients

router.get("/findByIngredients", (req, res) => {
  //service url will be used to call the spoonacular API
  let serviceURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=`;

  //body of request will  be a json containing the array of ingredients
  const ingredients = req.body.ingredients;

  //create a string with the ingredients
  var string = `${ingredients}`;
  //edit string to comply with format required by Spoonacular API
  string = string.split(",").join(",+");
  //concatenate strings
  serviceURL = serviceURL + string;

  //use spoonacular API
  //send the response back to the client
  unirest.get(serviceURL).end((result) => {
    if (result.status == 200) {
      //const recipesJson = JSON.stringify(result.body);
      //console.log(`the recipes are ${recipesJson}`);
      for(
        var k = 0;
        k < Object.keys(result.body).length - 1;
        k++
      ){

      //check if the recipe is already in our database
      var flag = 0;
      found = Recipe.findOne(
        { spoonacularID: result.body[k].id }
      ).then((found) => {
        if(found){
          flag = 1;
        }
      })

      if(flag == 1){
        continue;
      }



      console.log(`the recipe indexed k is now ${JSON.stringify(result.body[k])}`);
      //Create a recipe object for our database --NEW
      //create a valid string array for ingredients
      let ingredients = '{ "array" : [';

      for (
        var i = 0;
        i < Object.keys(result.body[k].usedIngredients).length - 1;
        i++
      ) {
        ingredients =
          ingredients +
          '"' +
          result.body[k].usedIngredients[i].name +
          '", ';
      }

      ingredients =
        ingredients + '"' + result.body[k].usedIngredients[i].name + '", ';

      for (
        var i = 0;
        i < Object.keys(result.body[k].missedIngredients).length - 1;
        i++
      ) {
        ingredients =
          ingredients +
          '"' +
          result.body[k].missedIngredients[i].name +
          '", ';
      }
      ingredients =
        ingredients + '"' + result.body[k].missedIngredients[i].name + '"]}';

      const ingredientsJson = JSON.parse(ingredients);

      console.log(`ingredients json is ${JSON.stringify(ingredientsJson)}`);

      const array = ingredientsJson.array;

      //create a new recipe object with the data modeled in models/recipes
      var newRecipe = new Recipe({
        title: result.body[k].title,
        spoonacularID: result.body[k].id,
        instructions: result.body[k].instructions,
        recipePhoto: result.body[k].image,
        ingredients: array,
        numMade: 0,
        numRatings: 0,
        numSaved: 1,
        rating: result.body[k].spoonacularScore,
      });

      //add new recipe to our database
      newRecipe.save(function (err, result) {
        if (err) return console.error(err);
        
      });



      //end of new code

      } 

      res.json(result.body);
      res.status(200);
    } else {
      res.send("Something failed \n");
    }
  });
});
//successfully tested on postman

module.exports = router;
