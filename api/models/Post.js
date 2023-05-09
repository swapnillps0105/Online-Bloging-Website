const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },

    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    postId: {
        type: String,
        required: true,
        ref: 'User',
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    userPic: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String, 
            required: true,
        },
        photo: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: true,
        },
        categories: {
            type: Array,
            required: false,
        },
        likes: {
            type: Array,
            default: [],
        },
        comments:[CommentSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);