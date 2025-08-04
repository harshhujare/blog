const express=require('express');
const router=express.Router();
const{AuthMiddleWare}=require('../middlewares/auth')
const{handelblog,getblog,getblogbyid,getBlogsByUserId,deleteBlog}=require("../controllers/blog")
const {upload}=require("../config/multerconfig")
router.post('/upload',AuthMiddleWare,upload.single("blogimg"),handelblog);
router.get('/getblog',getblog);
router.get('/getblog/:id',getblogbyid);
router.get('/user/:userid',getBlogsByUserId);
router.delete('/delete/:id',AuthMiddleWare,deleteBlog);
module.exports=router;