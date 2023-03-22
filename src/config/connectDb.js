import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "nodejsbasic",
});

//test connect to db

let connectDb = async () => {
  try {
    await connection.authenticate();
    console.log("Connection database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connection;

// import mysql from 'mysql2';

// // create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'nodejsbasic'
// });

// // simple query

// module.exports = connection;
