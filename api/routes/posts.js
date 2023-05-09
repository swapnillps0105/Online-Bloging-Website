const routes = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");


//Create
routes.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update
routes.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(req.body)
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    {new: true}
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete
routes.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log(req.body);
        if (post.username === req.body.username) {
            try {
                await Post.findByIdAndDelete(req.params.id);
                res.status(200).json("Post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET Post
routes.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});
routes.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({username});
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

routes.post("/comments", async (req, res) => {
    try {
        const post = await Post.findById(req.body.postId);
        const user = await User.findById(req.body.userId);
        if (user==null){
            console.log("User is null "+user+"With id "+req.body.userId);
            return;
        }
        if (post==null){
            console.log("Post is null "+post);
            return
        }
        console.log(post);
        console.log("User "+user)
        console.log("Check 1");
        if (post.username===user.username) {
            console.log("New Check")
            const CommentSchema = {
                text: req.body.text,
                username: user.username,
                postId: post._id,
                userId: user._id,
                userPic: user.profilePic,
                createdAt: Date.now()
            }
            console.log("Check 2");

            post.comments.push(CommentSchema);
            await post.save();
            console.log("Check 3");
            res.status(200).json(post);
        } else {
            res.status(401).json("You can comment only on your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

routes.put("/:id/like",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("The post has been liked");
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("The post has been disliked");
        }
    }catch (e){
res.status(500).json(e);
    }
})
module.exports = routes;
