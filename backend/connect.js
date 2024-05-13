import mysql from "mysql2";
import { faker } from '@faker-js/faker';

export const db = mysql.createConnection({
    host: "mysql-24ee0c8a-social-app.h.aivencloud.com",
    user: "avnadmin",
    password: "",
    database: "social-app",
    port: 25034
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log("Connection established");  // Only call insert after a successful connection
    // insertFakeData(10)
});

// const insertFakeData = (numRecords) => {
//     for (let i = 0; i < numRecords; i++) {
//         const desc = faker.lorem.sentence(1);
//         const datetime = faker.date.between({ from: '2022-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' });
//         const userid = faker.number.int({ min: 1, max: 3 });
//         const postid = faker.number.int({min: 1, max:20});

//         const query = "INSERT INTO comments(`desc`,`createdAt`,`userid`, `postId`) VALUES (?,?,?,?)";
//         db.query(query, [desc,datetime, userid,postid], (err, results) => {
//             if (err) {
//                 console.error('Error executing query:', err);
//                 return;  // Return from the callback, skipping the console log for this iteration
//             }
//             console.log("Data inserted: ", results.insertId);
//         });
//     }
// };

// process.on('exit', () => {
//     db.end();  // Ensure the connection is closed when the script exits
// });
