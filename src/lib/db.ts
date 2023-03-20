import mysql from 'mysql2';

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '*BzL23%SF6kk',
  database: 'portfolio',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database: ', err);
    throw err;
  }
  console.log('Connected to database!');
});

export default db;
