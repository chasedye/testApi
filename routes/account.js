const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/users");

//display array of saved recipes
router.get("/:id/savedRecipes", (req, res, next) => {
  const reqId = mongoose.Types.ObjectId(req.params.id);
  //{_id : reqId}
  //find user
  User.find({ _id: reqId }, { _id: 0, savedRecipes: 1 })
    .exec()
    .then((result) => {
      
      if(result){
        //console.log(`user found is : ${result}`);
        res.send(result);
        res.status(200);
      }

      else{
        //the user is not in the database
        console.log('The user id is not in the database');
        return res.status(404);// Chase please change error code to appropiate one
      }
      
    });
});

//display array of made recipes
router.get("/:id/madeRecipes", (req, res, next) => {
  const reqId = mongoose.Types.ObjectId(req.params.id);
  //{_id : reqId}
  //find user
  User.find({ _id: reqId }, { _id: 0, madeRecipes: 1 })
    .exec()
    .then((result) => {
      
      if(result){
        //console.log(`user found is : ${result}`);
        res.send(result);
        res.status(200);
      }

      else{
        //the user is not in the database
        console.log('The user id is not in the database');
        return res.status(404);// Chase please change error code to appropiate one
      }
      
    });
});

module.exports = router;
