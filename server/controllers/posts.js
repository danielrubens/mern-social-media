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
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true })
    res.json(updatedPost)
}

const deletePost = async (req, res) => {
    const {id: _id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id')
    }
    await PostMessage.findByIdAndRemove(_id)
    res.json({message: 'Post deleted succesfully'})
}

const likePost = async (req, res) =>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with that id')
    }
    const post = await PostMessage.findById(id)
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, { new: true })
    
    res.json(updatedPost)
}

export {getPosts, createPost, updatePost, deletePost, likePost}