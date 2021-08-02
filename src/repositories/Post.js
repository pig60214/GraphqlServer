const axios = require('axios');
const { pool, poolConnect } = require('./connection');
const sql=require('mssql');

function toGraphqlType(post) {
    const fromDate = post.FromDate;
    const toDate = post.ToDate;

    return {
        id: post.PostId,
        title: post.Title,
        from: fromDate.toISOString().replace('Z', ''),
        to: toDate.toISOString().replace('Z', ''),
    }
}

async function getPosts(postsQueryInput) {
    const { from, to } = postsQueryInput;
    await poolConnect; // ensures that the pool has been created
    try {
        const result = await pool.request()
            .input('fromDate', sql.DateTime, from)
            .input('toDate', sql.DateTime, to)
            .execute('GetPosts');
        const posts = result.recordset.map(post => toGraphqlType(post));
        return posts;
    } catch (err) {
        console.error('SQL error', err);
        return [];
    }
}

async function addPost(addPostInput){
    var { title, images, from, to } = addPostInput;
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
        title: title,
        album: 'uDUHmuu',
      };

      axios(config)
        .then(res => console.log(res))
        .catch(e => console.log(e));
    });

    await poolConnect; // ensures that the pool has been created
    try {
        const result = await pool.request()
            .input('title', sql.NVarChar(500), title)
            .input('fromDate', sql.DateTime, from)
            .input('toDate', sql.DateTime, to)
            .execute('AddPost');
        const posts = result.recordset.map(post => toGraphqlType(post));
        return posts[0];
    } catch (err) {
        console.error('SQL error', err);
        return null;
    }
}

module.exports = {
    getPosts,
    addPost
}