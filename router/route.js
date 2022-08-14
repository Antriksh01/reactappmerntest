const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const authData = require('../middleware/authData');



require("../db/connect");
const User = require("../models/userSchema");

router.use(cookieParser());

router.get("/", (req, res) => {
  res.send("data fron router");
});
//using promises

// router.post('/register', (req, res)=>{
//     const {name, email, work, phone, password, cpassword}= req.body;
//     if(!name || !email || !work || !phone || !password || !cpassword){
//         return res.status(422).json({erro:"erroc caught"});
//     }
//         User.findOne({email:email}).then((userExist)=>{
//             if(userExist){
//                 return res.status(422).json({error:'Email already Exist'})
//             }
//             const user = new User({name, email, work, phone, password, cpassword});
//             user.save().then(()=>{
//                 res.status(201).json({message:"registration successfully"})
//             }).catch((err)=>res.status(500).json({error:"registration failed"}))
//         }).catch(err=> {console.log(err);});
//     // console.log(req.body);
//     // res.json({message: req.body});
// })
// async await using
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !work || !phone || !password || !cpassword) {
    return res.status(422).json({ erro: "erroc caught" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Email already Exist" });
    } else {
      const user = new User({ name, email, work, phone, password, cpassword });
      //bcrypt part

      await user.save();
      // console.log(`${User} user registered succussfully`);
      // console.log(userRegister);
      res.status(201).json({ message: "registration successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// router login

router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({message:"awesome"});
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "fill  the form" });
    }
    const userLogin = await User.findOne({ email: email });
    if(userLogin){
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      console.log(token);  
      res.cookie("jwtToken", token, {
        expires: new Date(Date.now()+25890000),
        httpOnly:true
      })

    if (!isMatch) {
      res.status(400).json({ error: "login failed" });
    } else {
      res.json({ message: "login successful" });
    }
    }else { 
      res.status(400).json({ error: "login failed" });
    }
    // console.log(userLogin);
    
  } catch (err) {
    console.log(err);
  }
});

// about us page
router.get('/about', (req, res)=>{
  // res.cookie('mycookie', 'kuldeep')
  console.log('hello my aboutpage');
  res.send(req.relyUser);
  // navigate('/about');
  
  
})
module.exports = router;
