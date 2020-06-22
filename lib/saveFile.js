const { imgSync } = require('base64-img');
const { v4: uuidv4 } = require('uuid');
const im = require('imagemagick');
const { extname } = require('path');
const conf = require('../config/index.json')

const croppImage = async(srcPath, dstPath,width, quality = 0.8) => {
  try{

    //resize original name with pointed parameters
    im.resize({
      srcPath,
      dstPath,
      width,
      quality,
      progressive: true
    }, (err) => {
      if (err) {
        return (err)
      }
      return ('Cropped is success');
    });
  } catch(err) {
    return next(err)
  }

};

exports.saveFile = async (image, imgConfPath, res, next) => {
  try {
    //get image random unique name
    const imageName = uuidv4();

    //get image extension
    const imageType = image.split(';')[0].split('/')[1].toLowerCase();
    let fullImageName = '';

    //if image extension is not correct - return error
    if (imageType !== 'jpeg' && imageType !== 'jpg' && imageType !== 'png') {
      throw new Error('Image extension type error');
    };

    //if the image for blog - create full image name
    if(imgConfPath === 'ads'){

      //image base64 to original path with unique name
      const savedImageName = imgSync(image, `${__dirname}/${conf.media.ads_original_dir}`, imageName);
      fullImageName = `${imageName}${extname(savedImageName)}`;

      //get full path for cropped and minimum images 
      const savePathCropped = `${__dirname}/${conf.media.ads_cropped_dir}/${fullImageName}`;
      const savePathMin = `${__dirname}/${conf.media.ads_min_dir}/${fullImageName}`;

      //resize original image to cropped and minimum sizes
      await croppImage(savedImageName, savePathCropped, 710);
      await croppImage(savedImageName, savePathMin, 210);

    } 
    
    //if the image for user - create full image name
    if (imgConfPath === 'user'){

      //image base64 to original path with unique name
      const savedImageName = imgSync(image, `${__dirname}/${conf.media.user_original_dir}`, imageName);
      fullImageName = `${imageName}${extname(savedImageName)}`;

      //get full path for cropped and minimum images 
      const savePathCropped = `${__dirname}/${conf.media.user_cropped_dir}/${fullImageName}`;
      const savePathMin = `${__dirname}/${conf.media.user_min_dir}/${fullImageName}`;

      //resize original image to cropped and minimum sizes
      await croppImage(savedImageName, savePathCropped, 710);
      await croppImage(savedImageName, savePathMin, 210);
    };

    return (`${fullImageName}`);
  } catch (err) {
    return next(err);
  }
};