const Blog = require('../model/Blog')
const User = require('../model/User')
const getAll = (async (req, res) => {
    try {
        const userid = req.userid.id
        const blog = await Blog.find({userid : userid});
        res.send(blog);
    }
    catch (error) {
        res.status(400).send('Cannot get blogs!');
    }
})
const addBlog = async(req,res) =>{
    try {
        const userid = req.userid
        const {title,content} = req.body;
        const blog = new Blog(
            {
                title,
                content,
                userid : userid
            }
        )
        await blog.save()
        res.json(blog)
        res.send(blog)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const deleteBlog = async(req,res) =>{
    try {
        const blogid = req.params.blogid
        const blog = await Blog.findById(blogid)
        if(!blog){
            return res.status(404).json({error : "Blog not found"});
        }
        if(blog.userid._id.toString() !== req.userid._id.toString()){
            return res.status(403).json({error : "Permission not granted"})

        }
        await Blog.findByIdAndDelete(blogid)
        res.json({message:"Blog deleted successfully", deletedBlog : blog})

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({ error: "Blog is not found" });
          }
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: 'Internal Server Error!' });
    }
    }
const editBlog = async(req,res) =>{
    try {
        const blogid = req.params.blogid
    const blog = await Blog.findById(blogid)
    if(!blog){
        return res.status(404).json({error : "Blog not found"})
    }
    if(blog.userid._id.toString() !== req.userid._id.toString()){
        return res.status(403).json({error : "Permission not granted"})

    }
    const title = req.body.title
    const content = req.body.content
    blog.title = title
    blog.content = content
    const updatedBlog = await blog.save()
    res.status(200).json(updatedBlog)
    } catch (error) {
        if (error.name === 'Cast Error'){
            return res.status(404).json({error : "Not found"});
        }
        res.status(500).json({error : error.message})
    }
    
    
}

module.exports = {getAll,addBlog,deleteBlog,editBlog}