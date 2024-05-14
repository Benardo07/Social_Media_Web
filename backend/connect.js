import mysql from "mysql2";
import { faker } from '@faker-js/faker';

import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log("Connection established");  // Only call insert after a successful connection
    // insertFakeData(10)
});

