'use strict';

import mongoose from 'mongoose';

var RatingendpointSchema = new mongoose.Schema({
  Moviename: String,
  Username: String,
  Usermail: String,
  Rating:Number
});

export default mongoose.model('Ratingendpoint', RatingendpointSchema);
