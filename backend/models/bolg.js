const { model, Schema } = require("mongoose");

const blogSchema = new Schema({
  userid:{
type:String
  },
    titalimg: {
    type: String,
  },

  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: true,
  },
  createdby:{
type:String,

  },
  summary:{
    type:String,
   
  }
});

const blog=model("blog",blogSchema)
module.exports=blog;