// https://www.geeksforgeeks.org/javascript-function-complete-reference/?ref=shm
// Refer this Website and do the changes
// Error in the database setup

"use strict"

// Error Coming! During File Reading!



const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ =  require('lodash');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const mongoose = require('mongoose');
main().catch(err => console.log(err));
// 
var fileupload = require("express-fileupload");
app.use(fileupload());

// const fs = require('fs');
const path = require('path');
app.use(bodyParser.json())
//////////////////////////////////////////////////////////////////////////////////////
// Setting Up Multer for Storing Image

var multer = require('multer');
var storage = multer.diskStorage({
  destination : (req,file,cb) =>{
    cb(null , '/uploads');        // changed now uploads -> /uploads.
  },
  filename : (req,file,cb) =>{
    cb(null,file.fieldname + '-' + Date.now())
  }
});
var upload = multer({ storage: storage });
// upload.single('image')
const fs = require('fs');

// var fileupload = require("express-fileupload");
// app.use(fileupload());
/////////////////////////////////////////////////////////////////////////////////////

require('dotenv/config')

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/db_blog");
  useUnifiedTopology: true;
  useNewUrlParser: true,
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    console.log("Database Active");
}
mongoose.set('strictQuery',true);

const blogModel = require('./models/Database')


// Creating a default data for testing 
// const myTestBlog = new blogModel({
//   blogTitle : "Hello World I am Ujjwal Kumar",
//   blogBody : "I am Ujjwal Kumar, I am from India and I am doing Engineering",
// });

// myTestBlog.save();


// -----------------------------------------------------------------------------------------------------------------------------------

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];
app.get("/",async function(req,res)
{
  const getBlog =await blogModel.find();
  console.log(getBlog)

  res.render("home",{homeStartingContent,getBlog});
 })

 app.get("/about",function(req,res)
 {
     res.render("about",{aboutContent:aboutContent});
  })
 
  app.get("/contact",function(req,res)
{
    res.render("contact",{contactContent:contactContent});
 })

 app.get("/compose",function(req,res)
 {
  res.render("compose");
 })

 app.get("/posts/:getId", async function(req,res)
 {
    const blogId = req.params.getId;
    console.log(blogId);
    const getBlogById = blogModel.findById(blogId , function(err,result){
    if(!err && result){
    console.log(result);
    res.render('post',{title :  _.startCase(_.camelCase(result.blogTitle)) , body : _.capitalize(result.blogBody) })
    }
    });


    // posts.forEach(function(elements)
    // {
    //   // console.log(_.lowerCase(elements.title));      // check krne ke Liye
    //   // console.log(_.lowerCase(req.params.test));
    //   let ctr=0;
    //   if(_.lowerCase(elements.title) == _.lowerCase(req.params.test))
    //   {
    //     res.render("post",{title : elements.title , body : elements.content,title : elements.title});
    //   }
    // })

 })

 app.post("/compose" , upload.single('blogImg') , function(req,res)
 {
  console.log(req.body);
  console.log(req.file);
    try{
        // posts.push(post);
        myBlog = new blogModel({
          blogTitle : req.body.postTitle,
          blogBody : req.body.postBody,
          img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
        })

        console.log(myBlog);
    }catch(e){
      console.log(e);
    }
//   // Saving the Post
//   await myBlog.save(function(err,data){
//     if(!err && data){
//       console.log("Data Saved");
//     }
//     else{
//       console.log(err);
//     }
//   });

//   res.redirect("/");

//   // console.log(data.title);
 })



// Testing a file
app.get('/testCompose',function(req,res){
  res.render('testCompose');
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
