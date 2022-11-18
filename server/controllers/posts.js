import PostMessage from "../models/postMessage.js"

const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find()
        console.log(postMessages)
        res.status(200).json(postMessages)
    }catch(e){
        res.status(404).json({ message: e.message})
    }
    res.send('THIS WORKS')
}

const createPost = async(req, res) =>{
    const post = req.body;
    const newPost = new PostMessage(post)
    try{
        await newPost.save()
        return res.status(201).json(newPost)
    }catch(e){
        res.status(409).json({ message: e.message })
    }
    return res.send('Post Creation')
}

export {getPosts, createPost}