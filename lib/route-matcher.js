// This is the route-matcher page. 

// Require necessary modules
const path = require('path')
const fs = require('fs')

// Get the image edit function
const edit_image = require('./edit-image')

module.exports = {
    'Home Page': (req, res) => {
        try {   
                // Render the view and send it as the response
                res.status(200).render('index', (err)=>{
                    if (err){
                        console.error('Rendering Error :', err)
                        // Send the 500 status and the error page
                        res.status(500).sendFile('./public/assets/500.html', {
                            root: './'
                        });
                    }else{
                        res.status(200).render('index')
                    }
                }); 
            } catch (error) {
                // Catch additional errors
                console.error(error);
                // Send the 500 status and the error page
                res.status(500).sendFile('./public/assets/500.html', {
                    root: './'
                });
            }
        },

        'Bird Image' : (req, res) => {
            try{
                // Get the image
                let image = req.files.image 
                // set path
                let img_path =  path.resolve(__dirname,'../public/assets/images', image.name)
                // save the image to disk
                image.mv(img_path,
                    // Error Callback
                            (err)=>{
                                if (err){
                                console.error(err)
                                res.status(500).sendFile('./public/assets/500.html', {
                                        root: './'
                                    }); 
                                }else{
                                    res.status(200)
                                }   
                })
                // Edit the image by call the edit-image function with the image name
                edit_image(image.name)
            }catch(error){
                // Catch additional errors
                console.error(error);
                // Send the 500 status and the error page
                res.status(500).sendFile('./public/assets/500.html', {
                    root: './'
                });
            }
        }
    }
