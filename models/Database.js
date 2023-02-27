const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    blogTitle : {
      type : String,
      uppercase : true,
    },
    blogBody : {
      type : String,
    },
    img : {
        data : Buffer,
        contentType : String
    }
  });
  
  const blogModel = new mongoose.model('blogModel',blogSchema);

module.exports = blogModel;