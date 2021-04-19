'use strict'

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];  
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  token = token.split('Bearer')[1].trim();
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
