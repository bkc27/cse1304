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

const getAllPost = async () => { };

const getSinglePost = () => { };

const updatePost = () => { };

const deletePost = () => { };


module.exports = { createPost };