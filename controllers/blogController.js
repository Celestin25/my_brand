const BlogPost = require("../models/BlogPost");

exports.getAllPosts = async (req, res) => {
  const posts = await BlogPost.find();
  res.json(posts);
};

exports.createPost = async (req, res) => {
  console.log("Body: ", req.body);
  const newPost = new BlogPost(req.body);
  await newPost.save();
  res.status(201).json(newPost);
};

exports.getPost = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const updatedPost = await BlogPost.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedPost);
};

exports.deletePost = async (req, res) => {
  await BlogPost.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
