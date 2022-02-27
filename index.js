import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import path from "path";
import userRoute from "./routes/users";
import authRoute from "./routes/auth";
import postRoute from "./routes/post";
import conversationRoute from "./routes/conversations";
import messageRoute from "./routes/messages";

const app = express();
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Db");
  }
);

app.use("/images", express.static(path.join("public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

app.listen(8800, () => {
  console.log("BE running", 8800);
});
