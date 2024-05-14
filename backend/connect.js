import mysql from "mysql2";
import { faker } from '@faker-js/faker';

export const db = mysql.createConnection({
    host: "mysql-24ee0c8a-social-app.h.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_R9C8MGWouZtodpAK8nD",
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
//         const desc = faker.lorem.lines(1);
//         const img = faker.image.url();
//         const userId = faker.number.int({ min: 1, max: 3 });
//         const datetime = faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2022-01-01T00:00:00.000Z' });
//         // const userid = faker.number.int({ min: 1, max: 3 });
//         // const postid = faker.number.int({min: 1, max:20});

//         const query = "INSERT INTO posts (`desc`,`img`, `userId`, `createdAt`) VALUES (?, ?, ?, ?)";
//         db.query(query, [desc, img, userId, datetime], (err, results) => {
//             if (err) {
//                 console.error('Error executing query:', err);
//                 return;
//             }
//             console.log("Data inserted: ", results.insertId);
//         });
//     }
// };

// process.on('exit', () => {
//     db.end();  // Ensure the connection is closed when the script exits
// });


// async function updateCreatedAt() {
//     const connection = await mysql.createConnection({
//         host: "mysql-24ee0c8a-social-app.h.aivencloud.com",
//         user: "avnadmin",
//         password: "AVNS_R9C8MGWouZtodpAK8nD",
//         database: "social-app",
//         port: 25034
//     });
  
//     try {
//         console.log("halo");
//       // Select all posts to update
//       const [posts] = await connection.execute('SELECT id FROM posts');
//         console.log(posts);
//       // Update each post's createdAt to a new faker date
//       for (let post of posts) {
//         const newDate = faker.date.between({ from: '2022-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' }); // Generate a date within the past 10 years
//         await connection.execute(`UPDATE posts SET createdAt = ? WHERE id = ?`, [newDate, post.id]);
//       }
  
//       console.log('All dates updated successfully!');
//     } catch (error) {
//       console.error('Failed to update dates:', error);
//     } finally {
//       await connection.end();
//     }
//   }
  
//   updateCreatedAt();