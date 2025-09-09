import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "adeco"
});

connection.connect((err) => {
    if(err){
        console.error("Error de conexion a la DB: ", err);
        return;
    }
    console.log("Conectado a la DB 🚀");
});

export default connection;