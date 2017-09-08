'use strict';

function bookingService() {
	// AngularJS will instantiate a singleton by calling "new" on this function

this.movieDetails = {};
  this.movieDetails.name = "";
  this.movieDetails.date = "";
  this.movieDetails.time = "";
  this.movieDetails.theatre = "";
  this.movieDetails.selectedSeats = [];
  this.movieDetails.grandTotal = ""
this.paymentDetails ={};


  this.setName = function(name){
    this.movieDetails.name = name;
  }

  this.setTimings = function(theatre, date, time){
    this.movieDetails.theatre = theatre;
    this.movieDetails.date = date;
    this.movieDetails.time = time;
  }



  this.addSelected = function(selected, grandTotal){
    // movieDetails.bookedSeats = movieDetails.bookedSeats.concat(selected);
    this.movieDetails.selectedSeats = selected;
    this.movieDetails.grandTotal = grandTotal;
  }

  this.getDetails = function(){
    return this.movieDetails;
  }
}

angular.module('yoTemplateApp')
  .service('booking', bookingService);
