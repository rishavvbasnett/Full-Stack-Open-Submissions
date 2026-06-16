import express from "express";
import Blog from "../models/blog.js";
import { info, error } from "../utils/logger.js";
import createError from "../utils/createError.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response, next) => {
  try {
    const allBlogs = await Blog.find({});
    if (allBlogs.length >= 1) {
      response.json(allBlogs);
    } else if (allBlogs.length < 1) {
      throw createError("EmptyCollectionError", "No data is stored yet!");
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const sentBlog = request.body;
    info(sentBlog);
    if (sentBlog) {
      const sentBlogDocument = new Blog({
        title: sentBlog.title,
        author: sentBlog.author,
        url: sentBlog.url,
        likes: sentBlog.likes,
      });
      const savedBlog = await sentBlogDocument.save();
      response.json(savedBlog);
    } else {
      throw createError("EmptyRequestBodyError", "No request body sent!");
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.patch("/:id", async (request, response, next) => {
  try {
    const sentBlogId = request.params.id;
    const sentBlog = request.body;
    if (sentBlog) {
      const title = sentBlog.title;
      const author = sentBlog.author;
      const url = sentBlog.url;
      const likes = sentBlog.likes;

      const updatedBlog = await Blog.findByIdAndUpdate(
        sentBlogId,
        {
          title,
          author,
          url,
          likes,
        },
        {
          new: true,
          runValidators: true,
        },
      );
      response.json(updatedBlog);
    } else {
      throw createError("EmptyRequestBodyError", "No request body sent!");
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const sentBlogId = request.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(sentBlogId);
    if (deletedBlog) {
      response.send(deletedBlog);
    } else {
      throw createError(
        "ItemNotFoundError",
        "Item not found in the collection!",
      );
    }
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
