import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";
  // return res.json({message: "halo"})
  db.connect()
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const updateQuery =
      "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=?";
    db.connect()
    db.query(
      updateQuery,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        console.log(data);

        // Check if the update was successful
        if (data.affectedRows > 0) {
          // Fetch the updated user data
          const fetchQuery = "SELECT * FROM users WHERE id = ?";
          db.query(fetchQuery, [userInfo.id], (err, results) => {
            if (err) return res.status(500).json(err);

            if (results.length > 0) {
              console.log(results[0])
              console.log('nice')
              return res.json(results[0]);  // Return the updated user data
            } else {
              return res.status(404).json("User not found");
            }
          });
        } else {
          return res.status(403).json("No changes were made to the user.");
        }
      }
    );
  });
};


// controllers/userController.js
export const getSuggestions = (req, res) => {

  const userId = req.params.userId;
  console.log(userId)
  const q = "SELECT u.* FROM users u LEFT JOIN relationships r ON u.id = r.followedUserId AND r.followerUserId = ? WHERE r.id IS NULL AND u.id != ?;"
  try {
    // Replace with your database query to get users the current user hasn't followed
    db.connect()
    db.query(
      q, [userId,userId],(err, data) => {
        if (err) return res.status(500).json(err);
        console.log(data)
        return res.json(data);
      }
    )
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFriends = (req, res) => {
  const userId = req.params.userId;
  console.log("Fetching friends for user:", userId);

  const query = `
    SELECT u.*
    FROM users u
    JOIN relationships r1 ON u.id = r1.followedUserId AND r1.followerUserId = ?
    JOIN relationships r2 ON u.id = r2.followerUserId AND r2.followedUserId = ?
    WHERE u.id != ?;
  `;

  try {
    db.connect()
    db.query(query, [userId, userId, userId], (err, result) => {
      if (err) {
        console.error('Error fetching friends:', err);
        return res.status(500).json(err);
      }
      console.log("Friends data:", result.rows);
      res.json(result);
    });
  } catch (error) {
    console.error('Caught an exception:', error);
    res.status(500).json({ error: error.message });
  }
};