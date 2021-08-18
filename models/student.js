const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Student', subscriberSchema);
