// This is the router page.

// Require the route-matcher

const matcher = require('./route-matcher')

module.exports = app => {
    // Serve the home page.
    app.get('/', matcher['Home Page'] )

    // Get the bird image
    app.post('/upload/bird', matcher['Bird Image'])
}