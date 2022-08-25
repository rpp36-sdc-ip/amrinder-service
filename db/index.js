const { Client } = require('pg');

const db = new Client({
  host: "localhost",
  user: "amrindersingh",
  port: 5432,
  database: "sdc"
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('connected to postgres');
  }
});

module.exports = db;