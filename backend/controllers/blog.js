const blog=require("../models/bolg")
//post a blog
const handelblog=async(req,res)=>{
const {userid,description,title,createdby,summary}=req.body;

const newimg =req.file.path;
    try{
        await blog.create({
            userid: userid,
            description: description,
            title: title,
            titalimg: newimg,
            createdby:createdby,
            summary:summary,
        });
       res.status(200).json({message:"blog created",success:true}) 

    }catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Failed to create blog",success:false,error:err.message})
    }
}
//get all blogs
const getblog= async(req,res)=>{
try{
const Blog=await blog.find();
if(!Blog){
    return res.status(400).json({message:"no blog found",success:false})
}
return res.json({success:true,blogs:Blog});
}catch(err){
    console.log(err);
}

}
//get blog by id
const getblogbyid=async(req,res)=>{
    const {id}=req.params;
    try{
        const Blog=await blog.findById(id);
        if(!Blog){
            return res.status(400).json({message:"no blog found",success:false})
        }
        return res.json({success:true,blog:Blog});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to get blog",success:false,error:err.message})
    }   
}

//get blogs by user id
const getBlogsByUserId = async(req,res)=>{
    const {userid}=req.params;
    try{
        const userBlogs=await blog.find({userid:userid});
        if(!userBlogs){
            return res.status(400).json({message:"no blogs found for this user",success:false})
        }
        return res.json({success:true,blogs:userBlogs});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to get user blogs",success:false,error:err.message})
    }   
}

//delete blog by id
const deleteBlog = async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedBlog=await blog.findByIdAndDelete(id);
        if(!deletedBlog){
            return res.status(400).json({message:"blog not found",success:false})
        }
        return res.json({success:true,message:"Blog deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to delete blog",success:false,error:err.message})
    }   
}

module.exports={handelblog,getblog,getblogbyid,getBlogsByUserId,deleteBlog}