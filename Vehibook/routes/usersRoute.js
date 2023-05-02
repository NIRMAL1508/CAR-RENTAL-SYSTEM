const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const{body,validationResult}=require('express-validator')
// const error="bad request"
router.post("/login",async(req, res) => {

      const {username , password} = req.body
      try {
          const user = await User.findOne({username , password})
          if(user) {
              res.send(user)
          }
          else{
              return res.status(400).json("user do not exist");
          }
      } catch (error) {
        return res.status(400).json(error);
      }
  
});
router.post("/register",body('password').isLength({min:3}), async(req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json("number of characters used for password should be greater");
    }
    const {username , password} = req.body

    try {
        const user = await User.findOne({username , password})
        if(user) {
            return res.status(400).json("user already exists");
        }
        const newuser = new User(req.body)
        await newuser.save()
        res.send('User registered successfully')
    } catch (error) {
      return res.status(400).json(error);
    }

});


module.exports = router

