const passwordValidator = require('password-validator');

// Create a schema
const schema = new passwordValidator();
schema
  .is().min(8) // Minimum length 8
  .has().uppercase() // Must have uppercase letters
  .has().lowercase() // Must have lowercase letters
  .has().digits() // Must have digits
  .has().symbols(); // Must have symbols

module.exports = schema
