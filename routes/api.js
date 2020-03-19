const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/user');

const mongooes = require('mongoose');
const db = 'mongodb://admin:admin1@ds229438.mlab.com:29438/eventsdb';

mongooes.connect(db, err => {
    if ( err ) {
        console.log(`Error! ${err}`)
    } else {
        console.log(`Connected to mongodb`);
    }
});

function verifyToken(req, res, next) {
  if ( !req.headers.authorization ) {
    return res.status(401).send('Unauthorized request');
  }
  const token = req.headers.authorization.split(' ')[1];
  if ( token === 'null' ) {
    return res.status(401).send('Unauthorized request');
  }
  const payload = jwt.verify(token, 'secretKey');
  // verify decode jwt token if is valid
  if ( !payload ) {
    return res.status(401).send('Unauthorized request');
  }
  req.userId = payload.subject;
  next();
}

router.get('/', (req, res) => {
    res.send('From API route');
});

router.post('/register', (req, res) => {

    User.findOne({
      email: req.body.email
    }, (error, user) => {
      if ( user ) return res.status(400).send('Email already exist');

      const userData = req.body;
      user = new User(userData);
  
      bcrypt.hash(userData.password, 10, function(err, hash) {
        user.password = hash;
  
        user.save((error, registeredUser) => {
            if ( error ) {
                console.log(error);
            } else {
              const payload = {
                subject: registeredUser._id
              }
              const token = jwt.sign(payload, 'secretKey')
              res.status(200).send({token});
            }
        });
      });
    });
});

router.post('/login', (req, res) => {
    const userData = req.body;

    User.findOne({
        email: userData.email
    }, async (error, user) => {
        if ( error ) {
            console.log(error);
        } else {
            if ( !user ) {
                return res.status(401).send('Invalid email');
            } else if ( !await bcrypt.compare(userData.password, user.password) ) { 
                res.status(401).send('Invalid password');
            } else {
              const payload = {
                subject: user.id
              }
              const token = jwt.sign(payload, 'secretKey');
              res.status(200).send({token});
            }
        }
    });
});

router.get('/events', (req, res) => {
    const events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          }
    ];
    res.json(events);
});

router.get('/special', verifyToken, (req, res) => {
    const events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          }
    ];
    res.json(events);
});

module.exports = router;