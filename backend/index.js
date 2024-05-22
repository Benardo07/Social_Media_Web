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


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
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