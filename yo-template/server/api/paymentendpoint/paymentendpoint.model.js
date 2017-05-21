'use strict';

import mongoose from 'mongoose';

var PaymentendpointSchema = new mongoose.Schema({

  name :String,
  date :String,
  time :String,
  // movieDetails.bookedSeats = [];
  selectedSeats :[],
  grandTotal :String

});

export default mongoose.model('Paymentendpoint', PaymentendpointSchema);
