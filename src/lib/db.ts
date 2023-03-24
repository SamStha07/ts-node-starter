import mysql from 'mysql2';

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || '127.0.0.1',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '*BzL23%SF6kk',
  database: process.env.MYSQL_DATABASE || 'portfolio',
  port: (process.env.MYSQL_PORT as unknown as number) || 3306,
});

// const db = mysql.createConnection(
//   'mysql://root:YFAzGUGToqiW3XvgtAia@containers-us-west-145.railway.app:7734/railway'
// );

db.connect(err => {
  if (err) {
    console.error('Error connecting to database: ', err);
    throw err;
  }
  console.log('Connected to database!');
});

export default db;
