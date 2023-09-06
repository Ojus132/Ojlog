import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"

const PORT = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb+srv://gamers316ftw:rosagima@cluster0.kbrxmna.mongodb.net/usersDB");
const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true, "No username entered!"]
  },
  password:{
    type: String,
    required: [true, "No password entered!"],
    minLength: 8
  },
  email:{
    type: String,
    required: [true, "No email entered!"],
    //    validate: {
    //   validator: (value) => {
    //     const re =
    //       /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //     return value.match(re);
    //   },
    //   message: "Please enter a valid email address",
    // }
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
  var userData = req.body;

  if(userData.password.length>=8){
    User.countDocuments({$or:[{username: userData.username}, {email: userData.email}]}).then((count)=>{
      if(count==0){
        User.insertMany([userData]);
        homeLocals.data = userData;
        homeLocals.message = "User registered successfully."
        res.redirect("/home");
      } else {
        res.render("signup.ejs", {message: "User already exists. Please try again."});
      }
    });
  } else {
    res.render("signup.ejs", {message: "Password must be atleast 8 characters long."});
  }

});

app.post("/login", (req, res)=>{
  var userData = req.body;

  User.findOne({username: userData.username}).then((response)=>{

    if(response.password==userData.password){
      homeLocals.message = "Successfully logged in";
      homeLocals.data = userData;
      res.redirect("/home");
    } else {
      res.render("login.ejs", {message: "Incorrect Password."});
    }

  });


});


app.listen(PORT, ()=>{
  console.log("Server hosted on port " + PORT);
});
