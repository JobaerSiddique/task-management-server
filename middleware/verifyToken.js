const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const cookieParser = require('cookie-parser');
const express = require('express')
const app = express()


app.use(cookieParser())
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
 
  if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token,  process.env.DB_TOKEN, (err, user) => {
      if (err) {
          return res.status(403).json({ error: 'Invalid token' });
      }
      req.user = user;
      console.log("verify",user)
      next();
  });
  };

  module.exports = verifyToken;
  