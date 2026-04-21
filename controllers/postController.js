const Post = require("../models/Post")

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(401).json({
                success: false,
                message: "Title & Content Required"
            });
        }

        const post = await Post.create({
            title, content, user: req.user._id
        });

        res.status(200).json({
            success: true,
            message: "Post Created Successfully",
            post
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error Creating Post",
            error: e.message
        });
    }
};

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "name email");

        res.status(200).json({
            success: true,
            message: "All Posts",
            count: posts.length,
            posts
        });
    }
    catch (e) {
        res.status(500).json({
            success: true,
            message: "Unable to retrieve post",
            error: e.message
        });
    }
};

const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Post Found",
            post
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Unable to find post",
            eror: e.message
        })
    }
};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            });
        }
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can update only your post"
            });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();

        res.status(200).json({
            success: true,
            message: "Post Updated",
            post
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Unable to Update",
            error: e.message
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            });
        }
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can delete only your post"
            });
        }

        await post.deleteOne();
        res.status(200).json({
            success: true,
            message: "Post Deleted"
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Unable to Delete",
            error: e.message
        });
    }
};


module.exports = { createPost, getAllPost, getSinglePost, updatePost, deletePost };