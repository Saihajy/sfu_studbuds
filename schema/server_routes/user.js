const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    personal: {
    name: { type: String, required: true }, 
    age: { type: Number, min: [10, 'You are not in University!'], max: [90, 'You are too old for University!'] },
    gender: {type: String, enum: ['M', 'F', 'Other']},
    email: { type: String, required: true, unique: true },
    phone: String,
    

  },
  school:{
    schoolName: { type: String},
    program: { type: String},
    studentYear: { type: Number, min: 1, required: true},
    courses: [{
      dept: { type: String, uppercase: true },
      number:{type: String},
      term: String,
      year: { type: String, required: true }
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
