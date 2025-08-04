const user = require("../models/user");
const bcrypt = require("bcrypt");
const { CreateTokenForUser, validateToken } = require("../services/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const handelSignup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const User = await user.create({
      fullname,
      email,
      password,
    });
    //token creation
    const token = CreateTokenForUser(User);
    // Set cookie

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "usercreated successfully", success: true, User });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(400).json({
        message: "Email already exist .Plese use a different email.",
        sucess: false,
        error: "DUPLICATE_EMAIL",
      });
    } else {
      console.log(err);
    }
  }
};
const handelLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const fuser = await user.findOne({ email });

    if (!fuser) {
      return res
        .status(401)
        .json({ message: "Wrong_Email_Password", sucess: false });
    }

    const isMatch = await bcrypt.compare(password, fuser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Wrong_Email_Password", sucess: false });
    }
    let token;
    try {
      //token creation
      token = CreateTokenForUser(fuser);

      // Set cookie with proper options
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",

          path: "/",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          message: "login successful",
          success: true,
          token: token, // Also send token in response for frontend storage
        });
    } catch (tokenError) {
      console.error("Token creation failed:", tokenError);
      return res.status(500).json({
        message: "Authentication failed",
        success: false,
        error: "Token creation failed",
      });
    }
  } catch (error) {
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation_failed",
        error: error.message,
      });
    }
  }
};
//handelCheck
const handelCheck = (req, res) => {
  const token = req.cookies?.token;
  if (!token) {
    console.log("no token");

    res.json({ loggedIn: false });
  } else {
    try {
      loaded = validateToken(token);
      res.json({ loggedIn: true, user: loaded });
    } catch (error) {
      res.json({ loggedIn: false });
    }
  }
};

//handelLogout
const handelLogout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",

      path: "/",
    });
    res.json({ success: true });
  } catch (error) {
    console.log("this is the error", error);
  }
};
const handelupdate = async (req, res) => {
  try {
    console.log("hi 2");
    const { fullname, email, password } = req.body;
    const updatedUser = await user.findOneAndUpdate(
      { email },
      { $set: { fullname } },
      { new: true }
    );

    if (!updatedUser)
      return res.status(400).json({ message: "no user found", sucess: false });

    res.status(200).json({ sucess: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};
const handelgetuser = async (req, res) => {
  try {
    const { email } = req.query;
   
    const result = await user.findOne({ email });

    if (!result) {
      return res
        .status(400)
        .json({ sucess: false, error: "faild to get user" });
    }
    res.status(200).json({ user: result, sucess: true });
  } 
  catch(err) {
    console.log(err);
  }
};
const handelupload = async (req, res) => {
  console.log("function is called")
  const id = req.params.userid;
  console.log("id is",id)
  const newimg = req.file.path;

  try {

    const nuser = await user.findById(id);
    console.log("first this");

    if (!nuser) return res.status(404).json({ error: "User not found" });
   
    if (nuser.profileImgUrl && nuser.profileImgUrl !== "image.png") {
     
      const oldpath = path.join(
        
        nuser.profileImgUrl
      ); 
      console.log(oldpath,"hi")
      fs.unlink(oldpath, (err) => {
        if (err) console.error("error deleting old photo", err);
      });

    }

    nuser.profileImgUrl = newimg;
    await nuser.save();
    res.status(200).json({ success: true, nuser });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
module.exports = {
  handelSignup,
  handelLogin,
  handelCheck,
  handelLogout,
  handelupdate,
  handelgetuser,
  handelupload,
};
