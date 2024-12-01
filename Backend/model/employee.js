const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pass: { type: String, required: true},
  mail: { type: String, required: true},
  id: {type: String,require: true, unique: true},
  role: { type: String, default: 'employee' },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

// add generateAuthToken methos to eployee schema 
employeeSchema.methods.generateAuthToken = async function() {
  try {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    throw new Error('Error generating token');
  }
};

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
