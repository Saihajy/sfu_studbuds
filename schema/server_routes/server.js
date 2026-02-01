const express = require('express');
const mongoose = require('mongoose')
const User = require('../user');
const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/studentUser')
.then(() => {
  console.log('MongoDB connected to studentUser database');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

//register test route
app.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    console.log("User created: ", user.personal.name)
    await user.save();
    res.status(201).send("Success!" + user);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.listen(8080, () => {
  console.log('Server is running on port 3000');
});