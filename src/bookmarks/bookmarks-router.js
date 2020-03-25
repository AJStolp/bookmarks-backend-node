const express = require('express');
const bookmarkRouter = express.Router();
const bookmarks = require('../store');
const bodyParser = express.json();
const uuid = require('uuid/v4');

bookmarkRouter
    .route('/bookmarks')
    .get((req, res) => {
        return res.json(bookmarks);
    })
    .post((res, req) => {
        const { url, description } = req.body;

        if(!url) {
            logger.error('url is required')
            return res
                    .status(401)
                    .send('Invalid Data')

        }
        if(!description) {
            logger.error('and id is required')
            return res
                    .status(400)
                    .send('Invalid data')
        }

        const id = uuid();

        const newBookmark = {
            url,
            description,
            rating,
            id
        }
        bookmarks.push(newBookmark);

        logger.info(`a book mark with the ${id} was created`)
    });

bookmarkRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const { id, } = req.params;
        const bookmark = bookmarks.find(b => b.id == id);

        //make sure bookmarks were found
        if(!bookmark) {
            logger.error(`No bookmarks found with ${id} found`)
            return res
                    .status(400)
                    .send('No bookmark found')
        }
        return res.json(bookmark);
    })
    .delete((req, res) => {
        const { id } = req.param;

        const bookmarkIndex = bookmarks.find(b => b.id == id);

        
    })