import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const connection =  mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if(err){
        console.error("Error de conexion a la DB: ", err);
        return;
    }
    console.log("Conectado a la DB 🚀");
});

export default connection;