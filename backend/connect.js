import mysql from "mysql2"

export const db =  mysql.createConnection({
    host: "mysql-24ee0c8a-social-app.h.aivencloud.com",
    user: "avnadmin",
    password : "",
    database: "social-app",
    port : 25034
})

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});