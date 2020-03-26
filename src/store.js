const uuid = require('uuid/v4');

const bookmarks = [
    {
        url: 'http://thinkful.com',
        description: 'Web site for learning data, design, and code',
        rating: 5,
        id: uuid()
    },
    {
        url: 'http://apple.com',
        description: 'All things apple',
        rating: 5,
        id: uuid()
    },
    {
        url: 'http://news.google.com',
        description: 'New events. Local and National',
        rating: 4,
        id: uuid()
    },
    {
        url: 'http://google.com',
        description: 'Google home page',
        rating: 4,
        id: uuid()
    }
]

module.exports = bookmarks