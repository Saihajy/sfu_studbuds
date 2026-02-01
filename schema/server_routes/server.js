const express = require('express');
const mongoose = require('mongoose')
const User = require('./user');
const axios = require('axios');
const app = express()
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/studentUser')
.then(() => {
  console.log('MongoDB connected to studentUser database');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
async function validateCourseWithSFU(dept, number, year, term) {
  const url = `http://www.sfu.ca/bin/wcm/course-outlines?${year}/${term.toLowerCase()}/${dept.toLowerCase()}/${number}`;
  
  try {
    const response = await axios.get(url);
    return response.status === 200;
  } catch (error) {
  console.error(`Validation failed for ${dept} ${number}:`, error.message);
  return false; // Return a boolean
}
}

app.post('/register', async (req, res) => {
  try {
    const { school } = req.body;

    // Validate courses
    if (school && school.courses) {
      for (const course of school.courses) {
        const isValid = await validateCourseWithSFU(
          course.dept, 
          course.number, 
          course.year, 
          course.term
        );
        
        if (!isValid) {
          return res.status(400).json({ 
            error: `Invalid Course: ${course.dept} ${course.number} does not exist in ${course.term} ${course.year}` 
          });
        }
      }
    }

    // Save User
    const user = new User(req.body);
    await user.save();
    console.log("User created:", user.personal.name);
    res.status(201).send(user);

  } catch (err) {
    if (err.code === 11000) return res.status(400).send("Email already exists");
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});