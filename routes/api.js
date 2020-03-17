const express = require('express');
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
            res.status(200).send(registeredUser);
        }
    });
});

module.exports = router;