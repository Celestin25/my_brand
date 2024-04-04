const express = require('express');
const { getAllPosts, createPost, getPost, updatePost, deletePost } = require('../controllers/blogController');
const router = express.Router();

router.get('/posts', getAllPosts);
router.post('/posts', createPost);
router.get('/posts/:id', getPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

module.exports = router;
