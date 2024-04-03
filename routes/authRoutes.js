const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const verifyToken = require('../middleware/verifyToken')
const  cookieParser = require('cookie-parser')



router.use(cookieParser())
router.post('/register', async (req, res) => {
    try {
      const { name,email,password } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email:email });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
    //   // Create new user
      const newUser = new User({name,email,password });
      await newUser.save();
     
      const token = jwt.sign({ email:email }, process.env.DB_TOKEN, { expiresIn: '1h' });
      res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        expires: new Date(Date.now() + 86400000 * 30)
       }).json(newUser);
     
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: 'Internal server error' });
    }
  });

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email,password)
      // Find user by username
      const user = await User.findOne({ email:email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ email: user.email }, process.env.DB_TOKEN, { expiresIn: '1h' });
      res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        expires: new Date(Date.now() + 86400000 * 30)
       }).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/logout',async(req,res)=>{
    res.cookie('token','',{maxAge:1})
    res.json("LogOut Successfully")
})
  
  router.get('/verify-user',verifyToken, async(req,res)=>{
    try {
      
      const user = await User.findOne({email:req.user.email});
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      console.log('pro',user)
      res.json( user );
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
  })
  module.exports = router;