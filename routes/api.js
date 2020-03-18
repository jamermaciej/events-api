const express = require('express');
const jwt = require('jsonwebtoken');
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

router.get('/', (req, res) => {
    res.send('From API route');
});

router.post('/register', (req, res) => {
    const userData = req.body;
    const user = new User(userData);
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

router.post('/login', (req, res) => {
    const userData = req.body;

    User.findOne({
        email: userData.email
    }, (error, user) => {
        if ( error ) {
            console.log(error);
        } else {
            if ( !user ) {
                res.status(401).send('Invalid email');
            } else if ( user.password !== userData.password ) { 
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

router.get('/special', (req, res) => {
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