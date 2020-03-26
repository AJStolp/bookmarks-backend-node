const express = require('express');
const store = require('../store');
const uuid = require('uuid/v4');
// const validUrl = require('valid-url');
const isUrl = require('is-url');

const logger = require('../logger');

const bookmarkRouter = express.Router();
const bodyParser = express.json();


bookmarkRouter
    .route('/bookmarks')
    .get((req, res) => {
        return res.json(store);
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

        const id = uuid();

        const newBookmark = {
            url,
            description,
            rating,
            id
        }
        store.push(newBookmark);

        logger.info(`a book mark with the ${id} was created`)
            res
              .status(200)
              .location(`a bookmark was created at http://localhost:8000/bookmars/${id}`)
              .json(newBookmark)
    });

bookmarkRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const { id } = req.params;
        const bookmark = store.find(b => b.id == id);

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
        const { id } = req.params;

        const bookmark = store.findIndex(b => b.id === id);


        if(bookmark === -1) {
            logger.error(`A bookmark with an id of ${id} does not exists`)
            return res
                    . status(400)
                    .send('No book found')
        }
        //book mark id and params id need to equal to match
        store.splice(bookmark, 1);

        logger.info(`Bookmark with ${id} was removed`);
            res
                .status(204)
                .end();
    });

module.exports = bookmarkRouter