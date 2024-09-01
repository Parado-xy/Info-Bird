// Create logger middleware

module.exports = (req, res, next) =>{
    // Log the request to the console.
    console.log(`Request made to ${req.path}`)
    next()
}