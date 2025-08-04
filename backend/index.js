require('dotenv').config();
console.log('JWT_SECRET loaded:', !!process.env.JWT_SECRET);
const express= require("express");
const connectDb =require("./connection/connect")
const cors = require("cors");
const cookieParser = require('cookie-parser');
const multerconfig=require("./config/multerconfig");
const userRoute=require("./routes/user");
const authRoute=require("./routes/checkcookieRoutes");
const imgroute=require("./routes/image");
const blogroute=require("./routes/blog")
const app=express();
const PORT =8000;
app.use(cookieParser());
app.use('/public', express.static('public')); 

connectDb("mongodb://127.0.0.1:27017/smpleBlog").then(()=>{console.log("MongoDB connected");})
app.use(cors({origin: "http://localhost:5173",credentials: true,}));
app.use(express.json());
app.use ('/user',userRoute);
app.use('/auth',authRoute);
app.use('/profile',imgroute);
app.use('/blog',blogroute);
app.listen(PORT,()=>console.log(`server is started on port${PORT}`));