import { MONGODB_URI } from "../utils/config.js";
import mongoose from "mongoose";
import { info, error } from "../utils/logger.js";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info("Connected to MongoDB...");
  })
  .catch((error) =>
    error("An error occured while connecting to MongoDB: ", error),
  );

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

blogSchema.set("toJSON", {
  transform: (document, documentObject) => {
    documentObject.id = documentObject._id.toString();
    delete documentObject._id;
    delete documentObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
