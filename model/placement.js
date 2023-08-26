const mongoose = require('mongoose');

const PlacementSchema = new mongoose.Schema({
  selectedStudent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  selectedInterview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Placement', 
    required: true
  },
  placementStatus: {
    type: String,
    enum: ['placed', 'not placed'],
    required: true
  }
});

const Placement = mongoose.model('Placement', PlacementSchema);
module.exports = Placement;