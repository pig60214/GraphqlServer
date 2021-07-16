let posts = [
    { id: "P1", from: '2021/06/05', to: '2021/06/07', title: 'Implement Set Up Project', processStatus: "ToDo", photos: [{ path: 'https://i.imgur.com/O6usdNx_d.webp?maxwidth=760&fidelity=grand', caption: 'Tree House 2' }] },
    { id: "P2", from: '2021/06/13', to: '2021/06/15', title: 'Implement Post Query', processStatus: "ToDo", photos: [{ path: 'https://i.imgur.com/O6usdNx_d.webp?maxwidth=760&fidelity=grand', caption: 'Tree House 2' }] },
];

function getPosts(postsQueryInput) {
    const { from, to } = postsQueryInput;
    const fromOfQuery = new Date(from);
    const toOfQuery = new Date(to);
    return posts.filter(post => {
        const fromOfPost = new Date(post.from);
        const toOfPost = new Date(post.to);
        const outOfRange = toOfPost < fromOfQuery || fromOfPost > toOfQuery;
        return !outOfRange;
      })
}

function addPost(addPostInput){
    var { title } = addPostInput;
    var id = `P${posts.length}`;
    var post = { id: id, title: title, from: '2021/06/05', to: '2021/06/07' }
    posts.push(post);
    return post;
}

module.exports = {
    getPosts,
    addPost
}