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
            // Set IMG variable to be used for editing purposes later
           let IMG = '';
            try{
                // Get the image
                let image = req.files.image 
                // Assign the IMG variable to the image's name
                IMG = image.name
                // set path
                let img_path =  path.resolve(__dirname,'../public/assets/images', IMG)
                // save the image to disk
                image.mv(img_path,
                    // Error Callback
                            (err)=>{
                                if (err){
                                    // On error, Log such errors
                                console.error('Image Transfer Error: ',err)
                                res.status(500).sendFile('./public/assets/500.html', {
                                        root: './'
                                    }); 
                                }else{
                                    // if no error
                                    try {
                                        // Process the image.
                                            edit_image(IMG)
                                            // Return a status of 200 for succesful image processing.
                                            res.status(200).send({ 'success': true, 'message': 'Image processed successfully!' })                                        
                                    } catch (error) {
                                        // Image processing failure, notify the application.
                                        console.error(error);
                                        // Send the 500 status and the error message
                                        res.status(500).send({ 'success': false, 'message': 'Image processing failed.' })
                                    }

                                }   
                })

                
            }catch(error){
                // Catch additional errors
                console.error(error);
                // Send the 500 status and the error page
                res.status(500).sendFile('./public/assets/500.html', {
                    root: './'
                })
            }
        },

    }
