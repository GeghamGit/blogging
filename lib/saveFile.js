const { imgSync } = require('base64-img');
const { v4: uuidv4 } = require('uuid');
const im = require('imagemagick');
const { extname } = require('path');
const conf = require('../config')

const croppImage = async(srcPath, dstPath, width, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    try{
      im.resize({
        srcPath,
        dstPath,
        width,
        quality,
        progressive: true
      }, (err) => {
        if (err) {
          return reject(err)
        }
        return resolve();
      });
    }catch(err){
      return reject(err)
    }
  });
};

exports.saveFile = (image, imgConfPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const imageName = uuidv4();
      const imageType = image.split(';')[0].split('/')[1].toLowerCase();

      if (imageType !== 'jpeg' && imageType !== 'jpg' && imageType !== 'png') {
        throw new Error('Image extension type error');
      };

      if(imgConfPath === 'ads'){
        const savedImageName = imgSync(image, `${__dirname}/../${conf.ads_original_dir}`, imageName);
        const fullImageName = `${imageName}${extname(savedImageName)}`;

        const savePathCropped = `${__dirname}/../${conf.ads_cropped_dir}${fullImageName}`;
        const savePathMin = `${__dirname}/../${conf.ads_min_dir}${fullImageName}`;

        await croppImage(savedImageName, savePathCropped, 710);
        await croppImage(savedImageName, savePathMin, 210);

      } else if (imgConfPath === 'user'){

        const savedImageName = imgSync(image, `${__dirname}/../${conf.user_original_dir}`, imageName);
        const fullImageName = `${imageName}${extname(savedImageName)}`;
  
        const savePathCropped = `${__dirname}/../${conf.user_cropped_dir}${fullImageName}`;
        const savePathMin = `${__dirname}/../${conf.user_min_dir}${fullImageName}`;

        await croppImage(savedImageName, savePathCropped, 710);
        await croppImage(savedImageName, savePathMin, 210);
      };

      return resolve(`${fullImageName}`)
    } catch (error) {
      return reject(error);
    }
  });
};