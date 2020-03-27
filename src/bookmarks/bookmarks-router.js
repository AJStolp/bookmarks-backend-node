const express = require('express');
const uuid = require('uuid/v4');
// const store = require('../store');
const bookmarks = require('../store');
// const isWebUri = require('valid-url');
// const isUrl = require('is-url');

const logger = require('../logger');

const bookmarkRouter = express.Router();
const bodyParser = express.json();


bookmarkRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarks)
    })
    .post(bodyParser, (req, res) => {
        const { url, description, rating } = req.body;

        if(!url) {
            logger.error('url is required')
            return res
                .status(401)
                .send('Invalid Data')
        }
        if(!description) {
            logger.error('a description is required')
            return res
                .status(400)
                .send('Invalid data')
        }
        if(!rating){
            logger.error('a rating is required')
            return res  
                .status(400)
                .send('Invalid data')
        }
        if(rating > 5){
            return res
                .status(400)
                .send('rating must be 5 or below')
        }

        const newBookmark = {
            id: uuid(),
            url,
            description,
            rating
        }
        bookmarks.push(newBookmark);

        logger.info(`a book mark with the ${newBookmark.id} was created`)
            res
              .status(201)
              .location(`a bookmark was created at http://localhost:8000/bookmars/${newBookmark.id}`)
              .json(newBookmark)
    });

bookmarkRouter
    .route('/bookmarks/:bookmark_id')
    .get((req, res) => {
        const { bookmark_id } = req.params;

        const bookmark = bookmarks.find(c => c.id == bookmark_id);

        //make sure bookmarks were found
        if(!bookmark) {
            logger.error(`No bookmarks found with ${bookmark_id} found`)
            return res
                .status(404)
                .send('No bookmark found')
        }
        return res.json(bookmark);
    })
    .delete((req, res) => {
        const { bookmark_id } = req.params;

        const bookmarkIndex = bookmarks.findIndex(b => b.id === bookmark_id);

        if(bookmarkIndex === -1) {
            logger.error(`A bookmark with an id of ${bookmark_id} does not exists`)
            return res
                .status(404)
                .send('No bookmark found')
        }
        //book mark id and params id need to equal to match
        //store.bookmarks.splice(bookmarkIndex, 1);
        bookmarks.splice(bookmarkIndex, 1);

        logger.info(`Bookmark with ${bookmark_id} was removed`);
        res
            .status(204)
            .end();
    })

module.exports = bookmarkRouter