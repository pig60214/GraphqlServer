const data = [
  { title: 'FP in JavaScript', category: 'FP' },
  { title: 'RxJS in Action', category: 'FRP' },
  { title: 'Speaking JavaScript', category: 'JS' },
];

module.exports = {
  Query: {
    books: (_, { category }) => data.filter((x) => x.category === category),
  },
};
