// Here in all images will be edited so they can be sent to the model.

// The images will be edited using jimp
const jimp = require('jimp')
const path = require('path')

// Let this file be like a sort of function that receives the path to the image.

const fs = require('fs');
/*
fs.access('../public/assets/images/Page 1.jpeg', fs.constants.F_OK, (err) => {
  console.log(err ? 'File does not exist' : 'File exists');
}); */


    jimp.read('../public/assets/images/YT_head_facing_right_stoic.jpg')
    .then(image => {
        // Resize the image to the model's specification
        image.resize(180, 180) // The model requires an image of height 180 pixels and width 180 pixels
       // Write the image to the same path. 
       .write('../public/assets/images/edit-YT_head_facing_right_stoic.jpg')
    }).catch(err =>{
        console.error(err)
    })
