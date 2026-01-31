const mongoose = require('mongoose');
mongoose.connect ('mongodb://localhost:27017/sfustudbuds')
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

const UserSchema = new mongoose.Schema({
    personal:{
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: [10, 'You are not in University!'], max: [90, 'You are too old for University!'] },
    gender: String,
    
  },
  school:{
    name: { type: String, required: true },
    program: { type: String, required: true },
    year: { type: Number, min: 1, required: true }
  }

})