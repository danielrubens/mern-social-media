import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"

const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find()
        return res.status(200).json(postMessages)
    }catch(e){
        return res.status(404).json({ message: e.message})
    }
}

const createPost = async(req, res) =>{
    const post = req.body;
    const newPost = new PostMessage(post)
    try{
        await newPost.save()
        return res.status(201).json(newPost)
    }catch(e){
        return res.status(409).json({ message: e.message })
    }
}

const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id')
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })
    res.json(updatePost)

}

export {getPosts, createPost, updatePost}