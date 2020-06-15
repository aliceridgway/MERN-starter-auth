const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const entrySchema = new mongoose.Schema({

  type: {
    type: String,
    default: 'Note',

  },

  complete: {
    type: Boolean,
    default: false,
  },

  name: {
    type: String,
    required: 'Entries must contain text!',
  },

  tags: [String],

  created: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Entry', entrySchema);
