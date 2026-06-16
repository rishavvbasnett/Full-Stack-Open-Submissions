import express from "express";
import mongoose from "mongoose";

const app = express();

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = "mongodb://localhost/bloglist";
mongoose.connect(mongoUrl, { family: 4 });

app.use(express.json());

app.get("/api/blogs", (request, response, next) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", async (request, response, next) => {
  const blogDocument = new Blog(request.body);

  const savedBlog = await blogDocument.save();
  response.json(savedBlog);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log("Server running on ", PORT);
});
