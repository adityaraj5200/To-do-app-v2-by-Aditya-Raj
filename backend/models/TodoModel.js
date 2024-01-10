const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isImportant: {
    type: Boolean,
    required: true,
    default: false
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false
  },
  dueDate: {
    type: Date
  }
}
  ,{timestamps: true}
);

const todoModel = mongoose.model('todo', todoSchema);
module.exports = todoModel;