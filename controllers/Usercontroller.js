//import all dependencies required
const express = require('express');
const cors = require('cors');
//set variable users as expressRouter
var users = express.Router();

//import user model
var { User } = require('../models/User');
//protect route with cors
users.use(cors());

// Handling user signup 
users.post('/register', (req, res) => {
  const userData = {
    //values should be those in the user model important
    username : req.body.username, 
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  }
  User.findOne({
    //ensure username is unique, i.e the username is not already in the database
    username: req.body.username
  })
    .then(user => {
      //if the username is unique go ahead and create userData
      if (!user) {
          User.create(userData)
            .then(user => {
              //after successfully creating userData display registered message
              res.redirect('/login')
            })
            .catch(err => {
              //if an error occured while trying to create userData, go ahead and display the error
              res.send('error:' + err)
            })
      } else {
        //if the username is not unique, display that username is already registered with an account
        res.json({ error: 'The username ' + req.body.username + ' is registered with an account' })
      }
    })
    .catch(err => {
      //display error if an error occured
      res.send('error:' + err)
    })
})


/*Set route for logging in registered users*/
users.post('/login', (req, res) => {
      User.findOne({
        //check to see if a username like this is in the database
        username: req.body.username,
        password: req.body.password
      })
        .then(user => {
          //if the username exist in database then the user exists
          if (user) {
            const payload = {
              username: user.username,
              password: user.password,
            }
            //after successful login display token and payload data
            res.redirect('/');
          } else {
            //if user cannot be found, display the message below
            res.json({ error: 'user not found' })
          }
        })
        //catch and display any error that occurs while trying to login user
        .catch(err => {
          res.send('error:' + err)
        })
  })

//export routes usercontroller 
module.exports = users;
