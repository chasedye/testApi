const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Recipes = require("../models/recipes");

//display array of saved recipes
router.get("/:id/savedRecipes", (req, res, next) => {
  const reqId = mongoose.Types.ObjectId(req.params.id);

  //find user
  User.findOne({ _id: reqId }, { _id: 0, savedRecipes: 1 })
    .exec()
    .then((result) => {
      if (result) {
        //result is the array of json ID's of the recipes
        const recipe = result.savedRecipes;
        //find in the recipes collection the recipes in the array
        Recipes.find({ _id: recipe })
          .exec()
          .then((result) => {
            res.send(result);
            res.status(200);
          });
      } else {
        //the user is not in the database
        console.log(
          "Warning, the recipes saved by the user are not saved in the database"
        );
        return res.status(404); // Chase please change error code to appropiate one
      }
    });
});

//display array of made recipes
router.get("/:id/madeRecipes", (req, res, next) => {
  const reqId = mongoose.Types.ObjectId(req.params.id);

  //find user
  User.findOne({ _id: reqId }, { _id: 0, madeRecipes: 1 })
    .exec()
    .then((result) => {
      if (result) {
        //result is the array of json ID's of the recipes
        const recipe = result.madeRecipes;
        //find in the recipes collection the recipes in the array
        Recipes.find({ _id: recipe })
          .exec()
          .then((result) => {
            res.send(result);
            res.status(200);
          });
      } else {
        //the user is not in the database
        console.log(
          "Warning, the recipes saved by the user are not saved in the database"
        );
        return res.status(404); // Chase please change error code to appropiate one
      }
    });
});

module.exports = router;
