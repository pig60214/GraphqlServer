const axios = require('axios');
const imageRepo = require('../repositories/image');

function addPostImage(postId, addPostInput) {
  const { title, images } = addPostInput;
  const config = {
    url: 'https://api.imgur.com/3/image',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer beaf5d7bf18bed387f377c2d0668a9a88b4cd10e',
    },
  };

  images.forEach(image => {
    config.data = {
      image,
      title,
      album: 'uDUHmuu',
    };

    axios(config)
      .then(res => {
        imageRepo.addPostImage(postId, res.data.data.link, res.data.data.deletehash);
      })
      .catch(e => console.log(e));
  });
}

module.exports = {
  addPostImage
}