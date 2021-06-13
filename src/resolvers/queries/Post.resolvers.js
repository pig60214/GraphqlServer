const posts = [
  { id: "P1", from: '2021/06/05', to: '2021/06/07', title: 'Implement Set Up Project', processStatus: "ToDo" },
  { id: "P2", from: '2021/06/13', to: '2021/06/15', title: 'Implement Post Query', processStatus: "ToDo" },
];

module.exports = {
  Query: {
    posts: (_, { postsQueryInput }) => {
      const { from, to } = postsQueryInput;
      const fromOfQuery = new Date(from);
      const toOfQuery = new Date(to);
      return posts.filter(post => {
        const fromOfPost = new Date(post.from);
        const toOfPost = new Date(post.to);
        const outOfRange = toOfPost < fromOfQuery || fromOfPost > toOfQuery;
        return !outOfRange;
      });
    },
  },
};
