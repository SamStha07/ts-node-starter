import mysql from 'mysql2';

// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '*BzL23%SF6kk',
//   database: 'portfolio',
// });
// const db = mysql.createConnection({
//   host: 'containers-us-west-145.railway.app',
//   user: 'root',
//   password: 'YFAzGUGToqiW3XvgtAia',
//   database: 'railway',
// });
const db = mysql.createConnection(
  'mysql://root:YFAzGUGToqiW3XvgtAia@containers-us-west-145.railway.app:7734/railway'
);

db.connect(err => {
  if (err) {
    console.error('Error connecting to database: ', err);
    throw err;
  }
  console.log('Connected to database!');
});

export default db;
