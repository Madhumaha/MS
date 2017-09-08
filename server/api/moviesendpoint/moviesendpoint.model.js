'use strict';

import mongoose from 'mongoose';

var MoviesendpointSchema = new mongoose.Schema({
  Title: String,
  Year: Number,
  Genre: String,
  Plot: String,
  Actors: String,
  Director: String,
  Runtime: String,
  Poster:String,
  avgRating:Number
  });

export default mongoose.model('Moviesendpoint', MoviesendpointSchema);
