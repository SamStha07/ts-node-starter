import mysql from 'mysql2';

// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '*BzL23%SF6kk',
//   database: 'portfolio',
// });

const db = mysql.createConnection({
  host: 'ap-south.connect.psdb.cloud',
  user: 'u4emxbou5tejx5wcf2bk',
  password: 'pscale_pw_kc7LXwKLc0GQjtPph6RBHwIODllx0YjhMJtPfgfcSbC',
  database: 'portfolio',
  ssl: {
    rejectUnauthorized: true,
  },
});

// const db = mysql.createConnection(process.env.DATABASE_URL as string);

db.connect(err => {
  if (err) {
    console.error('Error connecting to database: ', err);
    throw err;
  }
  console.log('Connected to database!');
});

export default db;
