const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
  },
  cnt: {
    type: String,
    required: true
  },
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
