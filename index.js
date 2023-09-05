import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import { log } from "console";

const PORT = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb://0.0.0.0:27017/usersDB");
const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true, "No username entered!"]
  },
  password:{
    type: String,
    required: [true, "No password entered!"]
  },
  email:{
    type: String,
  },
})
const User = mongoose.model("User", userSchema);


app.get("/", (req, res)=>{
  res.render("index.ejs");
});

app.get("/login", (req, res)=>{
  res.render("login.ejs");
});

app.get("/signup", (req, res)=>{
  res.render("signup.ejs");
});

let homeLocals = {data:null,  message:null};
app.get("/home", (req, res)=>{
  res.render("home.ejs", homeLocals);
});


app.post("/signup", (req,res)=>{
  var userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };  
  User.count({$or:[{username: userData.username}, {email: userData.email}]}).then((count)=>{
    if(count==0){
      User.insertMany([userData]);
      res.redirect("/home");
    } else {
      res.render("signup.ejs", {message: "User already exists. Please try again."});
    }
  });



  mongoose.disconnect;
});



app.listen(PORT, ()=>{
  console.log("Server hosted on port " + PORT);
});
