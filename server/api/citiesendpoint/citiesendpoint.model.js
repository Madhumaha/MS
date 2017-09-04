'use strict';

import mongoose from 'mongoose';

var CitiesendpointSchema = new mongoose.Schema({
name: String
});

export default mongoose.model('Citiesendpoint', CitiesendpointSchema);
