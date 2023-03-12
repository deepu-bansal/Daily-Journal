//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Keeping a daily journal isn’t just for fun and recreation—it is actually a tool to make you more productive and hardworking, and help you accomplish your tasks and achieve your goals. In addition, it boosts creativity and inspires you to follow through with your plans. Moreover, Writing is one of the best ways to release all of your tension and pent-up anxiety. It is a therapeutic and peaceful way to let go of your emotions whenever you feel them about to overflow. When your life is organized and your emotions are clear, you feel less worried about how to handle difficult situations when they arise.";
const aboutContent = "I am Deepanshu Bansal , developer of this server-side application . I have used node js , express js and front-end skills to make this application . Talking about myself , I belong to Pink City and love to learn new tech skills . I am always passionate to take new challenges and to complete them";
const contactContent = "Deepanshu Bansal" ;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var post = new Object();
const posts = [];

app.get("/", function (req, res) {
  res.render("home", { homestartingcontent: homeStartingContent, posts: posts });
});

app.get("/posts/:parameter", function (req, res) {
  let flag = 0;
  let i;
  for (i = 0; i < posts.length; i++) {
    if (_.lowerCase(posts[i].title) == _.lowerCase(req.params.parameter)) {
      flag = 1;
      break;
    }
  }

  if (flag == 1)
    res.render("post", { obj: posts[i] });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactcontent: contactContent });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutcontent: aboutContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {

  const post = {
    title: req.body.posttitle,
    body: req.body.postbody
  };
  posts.push(post);

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

