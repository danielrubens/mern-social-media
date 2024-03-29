import axios from 'axios'

const API = axios.create({baseURL: 'https://server-social-media-eww6.onrender.com/' })

// it helps the auth middleware -> send token back to the backend, so the backend middleware verify user is logged in
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts = () => API.get('/posts')
export const createPost = (newPost) => API.post('/posts', newPost)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}/`)

export const signIn = (formData) =>  API.post('/users/signin', formData)
export const signUp = (formData) =>  API.post('/users/signup', formData)