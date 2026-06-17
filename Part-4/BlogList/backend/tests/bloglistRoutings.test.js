import { test, beforeEach, after } from "node:test";
import assert from "node:assert";
import app from "../app.js";
import supertest from "supertest";
import Blog from "../models/blog.js";
import { info, error } from "../utils/logger.js";
import { promiseHooks } from "node:v8";
import mongoose from "mongoose";

const api = supertest(app);

const fourBlogs = [
  {
    title: "1st Blog",
    author: "Me",
    url: "bloglist.com/1",
    likes: 1,
  },
  {
    title: "2nd Blog",
    author: "Me",
    url: "bloglist.com/1",
    likes: 2,
  },
  {
    title: "3rd Blog",
    author: "Me",
    url: "bloglist.com/1",
    likes: 3,
  },
  {
    title: "4th Blog",
    author: "Me",
    url: "bloglist.com/1",
    likes: 4,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("deleted");
  await Promise.all(
    fourBlogs.map((blog) => {
      return saveBlog(blog);
    }),
    console.log("saved"),
  );
});

test("get returns all the blogs", async () => {
  const response = await api.get("/api/blogs");
  const allBlogs = await response.body;

  assert.strictEqual(allBlogs.length, fourBlogs.length);
});

test("unique id is blog.id not blog._id", async () => {
  const response = await api.get("/api/blogs");
  const allBlogs = await response.body;

  allBlogs.map((blog) => {
    assert.strictEqual(blog._id, undefined);
  });
});

test("post increases total blogs count by 1", async () => {
  const postResponse = await api.post("/api/blogs").expect(200).send({
    title: "5th Blog",
    author: "Me",
    url: "bloglist.com/1",
    likes: 5,
  });

  const getResponse = await api.get("/api/blogs");
  const allBlogs = await getResponse.body;

  assert.strictEqual(allBlogs.length, fourBlogs.length + 1);
});

const saveBlog = async (blog) => {
  const blogDocument = new Blog(blog);
  return await blogDocument.save();
};

after(() => mongoose.connection.close());
