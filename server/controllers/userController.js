// Controller for user login
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
  // Check request for both a username and password. Return if any are missing.
  if (req.body.username === undefined || req.body.password === undefined){
    return res.status(404).json({ msg: `Invalid user credentials. Please make sure you've entered a valid username and password.` })
  }

  // Store { credentials } from request for reference.
  const { username, password } = req.body;

  // Search for existing user in collection. Return if one already exists.
  const user = await User.findOne({ username });
  if(user !== null){
    return res.status(404).json({ msg: `Failed to register user. User already exists.` })
  }
  
  // Hash { password } for security.
  const hashedPass = await bcrypt.hash(password, 10);

  // Add new user to database using username and hashed password.
  await User.create({ username, password: hashedPass });

  // Return success response for registered user.
  return res.status(200).json({ msg: `User registered succesfully.` })
};

exports.loginUser = async (req, res) => {
  // Check request for both a valid username and password. Exit if any are missing.
  if (req.body.username === undefined || req.body.password === undefined){
    return res.status(404).json({ msg: `Invalid user credentials. Please make sure you've entered a valid username and password.` })
  }

  // Store { credentials } from request for reference.
  const { username, password } = req.body;

  // Search for existing user in collection. Return if one already exists.
  const user = await User.findOne({ username });
  if(user === null){
    return res.status(404).json({ msg: `Failed to find user. User does not exist.` })
  }

  // Check if request password and database password are identical. Exit if false.
  const isPassValid = await bcrypt.compare(password, user.password);
  if(!isPassValid){
    return res.status(404).json({ msg: 'Username or password is incorrect.'})
  }

  // Create json web token and sign it using the users unique ID as well as a secret.
  const token = jwt.sign({ id: user._id }, process.env.SECRET);
  return res.json({ token, userID: user._id });
};

exports.deleteUser = async (req, res) => {
  // Check request for a valid user ID. Exit if missing.
  if (req.body.userID === undefined){
    return res.status(404).json({ msg: `Invalid user ID.` })
  }

  // Search for user in collection. Return if user does not exist.
  const user = await User.findOne({ _id: req.body.userID });
  if(user === null){
    return res.status(404).json({ msg: `Failed to find user. User does not exist.` })
  }

  // Delete user from database.
  await User.deleteOne({ _id: req.body.userID });

  // Return success response for deleted user.
  return res.status(200).json({ msg: `User ${user.username} deleted succesfully.` })
}