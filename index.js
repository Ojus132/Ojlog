import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import "dotenv/config";

const PORT = 3000;
const app = express();

//PASSWORDS AND STUFF
const ADMINPASS = "lemmebecomeanadminpls";
const DB_id = process.env.DB_id;
const DB_pass = process.env.DB_pass;

//MIDDLEWARES
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

//DATABASE CONFIG
mongoose.connect("mongodb+srv://" + DB_id + ":" + DB_pass + "@cluster0.kbrxmna.mongodb.net/usersDB");
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
  admin: Boolean,
  
})
const User = mongoose.model("User", userSchema);


//ROUTING
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

let adminregLocals = {data:null, message:null};
app.get("/home/adminreg", (req, res)=>{
  res.render("adminreg.ejs", adminregLocals);
});
let adminLocals = {alldata:null, data:null};
app.get("/home/admin",(req, res)=>{
  res.render("admin.ejs", adminLocals);
});

app.post("/signup", (req,res)=>{
  var userData = req.body;
  userData.admin = false;

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
      homeLocals.data = adminregLocals.data = response;
      res.redirect("/home");
    } else {
      res.render("login.ejs", {message: "Incorrect Password."});
    }

  });


});

app.post("/adminreg", (req, res)=>{

  let userData = req.body;

  if(userData.adminpass == ADMINPASS){
    User.updateOne({username: userData.username}, {admin: true})
    .then(()=>{

      User.findOne({username: userData.username}).then((response)=>{
        adminLocals.data = response;
      });
      User.find().then((response)=>{
        adminLocals.alldata = response;
      });
      
      res.redirect("/home/admin");
  });
  } else {
    adminregLocals.message = "Incorrect password";
    res.redirect("/home/adminreg");
  }

});


app.listen(PORT, ()=>{
  console.log("Server hosted on port " + PORT);
});
