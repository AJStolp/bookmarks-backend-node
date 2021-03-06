require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const bookmarksRouter = require('./bookmarks/bookmarks-router');
const uuid = require('uuid/v4');

const app = express();
const logger = require('./logger');

const morganOption = (NODE_ENV) === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

//Middleware
app.use(function validateBearerToken(req, res, next){
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization');
    
    if(!authToken || authToken.split(' ')[1] !== apiToken){
        logger.error(`Unauthorized request to path: ${req.path} `)
        return res.status(401).json({error: 'UnAuthorized Request'})
    }
    next()
});

app.use(bookmarksRouter);

app.use(function errorHandling(error, req, res, next){
    let response
    if(NODE_ENV === 'production') {
        response = { error: {message: 'server error' }}
    } else {
        console.log(error)
        response = { message: error.message, error}
    }
    res.status(500).json(response)
});

//Request
app.get('/', (req, res) => {
    res.send('Hello, world!')
});

module.exports = app