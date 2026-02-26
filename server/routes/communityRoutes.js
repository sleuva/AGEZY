const express = require('express');
const router = express.Router();
const { getPosts, addPost, likePost } = require('../controllers/communityController');

router.get('/', getPosts);
router.post('/', addPost);
router.put('/:id/like', likePost);

module.exports = router;
