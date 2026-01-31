const mongoose = require('mongoose');
mongoose.connect ('mongodb://localhost:8080/studbuds')
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

const UserSchema = new mongoose.Schema({
    personal: {
    name: { type: String, required: true }, 
    age: { type: Number, min: [10, 'You are not in University!'], max: [90, 'You are too old for University!'] },
    gender: {type: String, enum: ['M', 'F', 'Other']},
    email: { type: String, required: true, unique: true },
    phone: String,
    

  },
  school:{
    schoolName: { type: String, required: true },
    program: { type: String, required: true },
    year: { type: Number, min: 1, required: true },
    courses: [{
      dept: String,
      number: String,
      term: String
    }],

    studyAvailability: {
      Monday: [String],
      Tuesday: [String],
      Wednesday: [String],
      Thursday: [String],
      Friday: [String],
      Saturday: [String],
      Sunday: [String]
    }
  }

});

const User = mongoose.model('User', UserSchema);
module.exports = User;
