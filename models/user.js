var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

// Validate Function to check e-mail length
let emailLengthChecker = (email) => {
    // Check if e-mail exists
    if (!email) {
      return false; // Return error
    } else {
      // Check the length of e-mail string
      if (email.length < 5 || email.length > 30) {
        return false; // Return error if not within proper length
      } else {
        return true; // Return as valid e-mail
      }
    }
  };
  
  // Validate Function to check if valid e-mail format
  let validEmailChecker = (email) => {
    // Check if e-mail exists
    if (!email) {
      return false; // Return error
    } else {
      // Regular expression to test for a valid e-mail
      const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return regExp.test(email); // Return regular expression test results (true or false)
    }
  };

  
// Array of Email Validators
const emailValidators = [
    // First Email Validator
    {
      validator: emailLengthChecker,
      message: 'E-mail must be at least 5 characters but no more than 30'
    },
    // Second Email Validator
    {
      validator: validEmailChecker,
      message: 'Must be a valid e-mail'
    }
  ];

var userSchema = new Schema({
  name:  { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
  jobTitle: { type: String, required: true },
  resume: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);