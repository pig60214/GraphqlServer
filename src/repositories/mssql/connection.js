const sql=require('mssql');

const config = {
  password: '1234qwer',
  user: 'wuu',
  database: 'GraphqlDB',
  options: {
    encrypt: false,
  },
  port: 1434,
  server: 'localhost',
}

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = {
  pool,
  poolConnect
};