import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gocosmic"
})

con.connect(function(err){
    if(err){
        console.log("Database connection failed")
    }else{
        console.log("Database connected")
    }
})

export default con;