// Here in all images will be edited so they can be sent to the model.

// The images will be edited using jimp
const jimp = require('jimp')
const path = require('path')

// Let this file be like a sort of function that receives the name of the image to be edited.



module.exports = async (name) => {
  const imgPath = path.resolve(__dirname, '../public/assets/images', name);
  // Edited images are stored in the edited subdirectory.
  const outputPath = path.resolve(__dirname, '../public/assets/images/edited/', `${name}`);

  return jimp.read(imgPath)
      .then(image => {
          // Resize the image to the model's specification
          return image.resize(180, 180).writeAsync(outputPath); // Use writeAsync to return a promise
      })
      .catch(err => {
          console.error('Jimp Error:', err);
          throw err; // Re-throw the error to be caught in the route handler
      });
};
