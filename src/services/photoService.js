const axios = require('axios');
const photoRepo = require('../repositories/photo');
const dotenv = require("dotenv");
dotenv.config();

function addPostPhoto(postId, title, photos) {
  if (photos === undefined || photos.length === 0) return;

  const config = {
    url: 'https://api.imgur.com/3/image',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.IMGURACCESSTOKEN}`,
    },
  };

  photos.forEach(photo => {
    const { base64File, caption } = photo;
    config.data = {
      image: base64File,
      title,
      description: caption,
      album: process.env.IMGURALBUMID,
    };

    axios(config)
      .then(res => {
        photoRepo.addPostPhoto(postId, caption, res.data.data.link, res.data.data.deletehash);
      })
      .catch(e => console.log(e));
  });
}

module.exports = {
  addPostPhoto
}