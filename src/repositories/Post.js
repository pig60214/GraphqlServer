const axios = require('axios');
const { pool, poolConnect } = require('./connection');
const sql=require('mssql');

let posts = [
    { id: "P1", from: '2021/06/05', to: '2021/06/07', title: 'Implement Set Up Project', processStatus: "ToDo", photos: [{ path: 'https://i.imgur.com/O6usdNx_d.webp?maxwidth=760&fidelity=grand', caption: 'Tree House 2' }] },
    { id: "P2", from: '2021/06/13', to: '2021/06/15', title: 'Implement Post Query', processStatus: "ToDo", photos: [{ path: 'https://i.imgur.com/O6usdNx_d.webp?maxwidth=760&fidelity=grand', caption: 'Tree House 2' }] },
];

async function getPosts(postsQueryInput) {
    const { from, to } = postsQueryInput;
    await poolConnect; // ensures that the pool has been created
    try {
        const result = await pool.request()
            .input('fromDate', sql.DateTime, from)
            .input('toDate', sql.DateTime, to)
            .execute('GetPosts');
        const posts = result.recordset.map(post => {
            return {
                id: post.PostId,
                title: post.Title,
                from: new Date(post.FromDate).toISOString(),
                to: new Date(post.ToDate).toISOString(),
            }
        });
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
        const posts = result.recordset.map(post => {
            return {
                id: post.PostId,
                title: post.Title,
                from: new Date(post.FromDate).toISOString(),
                to: new Date(post.ToDate).toISOString(),
            }
        });
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