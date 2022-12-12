const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var generateId = require('./plugins/generateId.js');

const MovieSchema = new Schema({
 id: {
      type: Number, 
      required: true, 
      index: {
      unique: true
      }
 }, 
 name: {
    type: String,
     trim: true,  
    required: true,
 },
 released_on: {
    type: Date,
    trim: true,
    required: true
 }, 
actors: [{
  type: mongoose.Schema.ObjectId, 
  ref: 'Actor'
}]
});

MovieSchema.plugin(generateId());
module.exports = mongoose.model('Movie', MovieSchema)