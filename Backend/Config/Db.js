import mysql from "mysql2/promise"
import "dotenv/config"

export const pool = mysql.createPool({

    host: "127.0.0.1",
    port: 3306,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Name,

    waitForConnections: true,
    connectionLimit: 10

})