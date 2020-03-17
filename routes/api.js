const express = require('express');
const router = express.Router();

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

module.exports = router;