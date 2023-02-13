//jshint esversion:6

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
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/db_blog');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

mongoose.set('strictQuery',true);

const blogSchema = new mongoose.Schema({
  blogTitle : {
    type : String,
    uppercase : true,
  },
  blogBody : {
    type : String,
  }
});

const blogModel = new mongoose.model('blogModel',blogSchema);

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
app.get("/",function(req,res)
{
  res.render("home",{homeStartingContent:homeStartingContent,posts :posts});
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

 app.get("/posts/:test", function(req,res)
 {
    // console.log(req.params.test);
    // console.log(posts);

    posts.forEach(function(elements)
    {
      // console.log(_.lowerCase(elements.title));      // check krne ke Liye
      // console.log(_.lowerCase(req.params.test));
      let ctr=0;
      if(_.lowerCase(elements.title) == _.lowerCase(req.params.test))
      {
        res.render("post",{title : elements.title , body : elements.content,title : elements.title});
      }
    })

 })

 app.post("/compose",async function(req,res)
 {
  // console.log(req.body.postTitle);     Creating a JS Object instead of it
  // console.log(req.body.postBody);

  // const post = 
  // {
  //   title: req.body.postTitle,
  //   content : req.body.postBody
    
  // };

  // posts.push(post);
  myBlog = new blogModel({
    blogTitle : req.body.postTitle,
    blogBody : req.body.postBody,
  })
  // Saving the Post
  await myBlog.save(function(err,data){
    if(!err && data){
      console.log("Data Saved");
    }
  });

  res.redirect("/");

  // console.log(data.title);
 })





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
