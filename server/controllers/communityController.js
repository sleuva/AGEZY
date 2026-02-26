const CommunityPost = require('../models/CommunityPost');

// @desc    Get all community posts
// @route   GET /api/community
exports.getPosts = async (req, res) => {
    try {
        const posts = await CommunityPost.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add new post
// @route   POST /api/community
exports.addPost = async (req, res) => {
    const { author, content, type } = req.body;

    try {
        const newPost = new CommunityPost({
            author,
            content,
            type
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Like a post
// @route   PUT /api/community/:id/like
exports.likePost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        post.likes += 1;
        await post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
