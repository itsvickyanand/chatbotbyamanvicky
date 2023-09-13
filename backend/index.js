// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const app = express();
const port = 5000;

const user =[];

app.use(cors());
app.use(bodyParser.json());

// Mock data for tasks
const tasks = ["vicky","aman"];

// Routes
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post("/signup",async (req,res)=>{
user.push({
    name:req.body.name,
    username: req.body.username,
    email:req.body.email,
    id:req.body.id,
    password: await bcrypt.hash(req.body.password,12)
})
console.log(user)
res.status(201).json({
    message:"User is registered successfully!"
})
})


app.post("/login", (req,res)=>{
    
})

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});