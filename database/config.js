import mysql from 'mysql2';
import  dotenv  from "dotenv";
dotenv.config();


export const pool = mysql.createPool({
    connectionLimit: 10, // Adjust the number of connections as needed
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


pool.getConnection(function(err){
    if(err) throw err;
    console.log("DB Connected!")
});
