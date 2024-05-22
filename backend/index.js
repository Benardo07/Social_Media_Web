import express from "express";
import authRoutes from "./src/route/auth.js";
import userRoutes from "./src/route/users.js";
import postRoutes from "./src/route/posts.js";
import commentRoutes from "./src/route/comments.js";
import likeRoutes from "./src/route/likes.js";
import storyRoutes from "./src/route/stories.js"
import relationshipRoutes from "./src/route/relationships.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";



const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
app.use(express.json());

app.use(
    cors({
      origin: "https://social-media-web-ten.vercel.app",
      credentials: true
    })
  );
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination to 'uploads' folder at the root of your backend directory
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    // Name the file with a timestamp prefix to avoid naming conflicts
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance that will be used to upload files
const upload = multer({ storage: storage });

// Route to handle file uploads
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).json({
    message: "File uploaded successfully",
    filename: file.filename
  });
}, (error, req, res, next) => {
  console.error('Error during file upload:', error);
  res.status(500).send(`Failed to upload file: ${error.message}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/relationships", relationshipRoutes);

app.listen(8800, () => {
    console.log("API working!");
  });