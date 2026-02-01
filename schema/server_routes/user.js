const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    personal: {
    name: { type: String, required: true }, 
    age: { type: Number, min: [10, 'You are not in University!'], max: [90, 'You are too old for University!'] },
    gender: {type: String, enum: ['M', 'F', 'Other']},
    email: { type: String, required: true, unique: true },
    phone: String,
    passwordHash: { type: String, required: true },
    

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
      Monday: Boolean,
      Tuesday: Boolean,
      Wednesday: Boolean,
      Thursday: Boolean,
      Friday: Boolean,
      Saturday: Boolean,
      Sunday: Boolean
    }
  }

});

const User = mongoose.model('User', UserSchema);
module.exports = User;
