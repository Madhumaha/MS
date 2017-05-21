'use strict';

function bookingService() {
	// AngularJS will instantiate a singleton by calling "new" on this function

  var movieDetails = {};
  movieDetails.name = "";
  movieDetails.date = "";
  movieDetails.time = "";
  // movieDetails.bookedSeats = [];
  movieDetails.selectedSeats = [];
  movieDetails.grandTotal = ""

  this.setName = function(name){
    movieDetails.name = name;
  }

  this.setTimings = function(date, time){
    movieDetails.date = date;
    movieDetails.time = time;
  }

  // this.setTime = function(time){
  //   movieDetails.time = time;
  // }

  this.addSelected = function(selected, grandTotal){
    // movieDetails.bookedSeats = movieDetails.bookedSeats.concat(selected);
    movieDetails.selectedSeats = selected;
    movieDetails.grandTotal = grandTotal;
  }

  this.getDetails = function(){
    return movieDetails;
  }
}

angular.module('yoTemplateApp')
  .service('booking', bookingService);
