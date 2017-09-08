'use strict';

(function(){

class BookingseatsComponent {
  constructor($scope, $http, socket, booking, $location) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$http = $http;
    this.bookingService = booking;
    this.mybookings = [];

    this.rows = ['A','B','C','D','E','F','G','H','I','J','K','L'];
    this.rows1=['M','N','O','P','Q','R','S','T','U','V','W','X','Y'];
    this.columns = [1,2,3,4,5];
    this.columns1=[6,7,8,9,10];
    this.selectedSeats = [];
    this.bookedSeats = [];
    this.bookingForm = {};
    this.$location = $location;
    this.movieDetails = {};
    this.payments=[];
  }

  $onInit(){
    this.movieDetails = this.bookingService.getDetails();
    // this.$http.get('/api/paymentendpoints').then(response => {
    //   this.bookedSeats = _.flatten( _.map( _.filter(response.data, (detail)=>{ return detail.name === this.movieDetails.name && detail.theatre === this.movieDetails.theatre } ), (seat)=>{ return seat.bookedSeats }) );
    //   console.log(this.bookedSeats);
    // } );
  this.$http.get('/api/paymentendpoints').then( response=>{
      this.payments = response.data;
      this.bookedSeats = _.flatten( _.map( _.filter(response.data, (detail)=>{ return detail.name === this.movieDetails.name && detail.theatre === this.movieDetails.theatre } ), (seat)=>{ return seat.bookedSeats }) );
      this.paidmovies=_.where(this.payments, {name: this.movieDetails.name, date:this.movieDetails.date,time:this.movieDetails.time});
      console.log('Paid movies '+this.paidmovies);
      for(let pay of this.paidmovies)
      {
        console.log(pay.bookedSeats);
        for(let seat of pay.bookedSeats)
        {
          //seats after payment
          console.log('paid seats are '+seat.row+' '+seat.col);
          var images = $(".seats");
          var seatno=(seat.row).toString()+(seat.col).toString();
          console.log('seatno are '+seatno);
           for(var i=0;i<images.length;i++)
           {
             //comparing image id with paid seatno
          var imgid=images[i].id.toString();
          if(imgid===seatno)
          {
            console.log('image matching with seat');
            //changing image to grey if seat is already booked
          images[i].src="assets/Images/R_chair.gif"
          images[i].disabled=true;
        }
           }
        }
      }
  })
    console.log(this.movieDetails);
    console.log(this.rows);
    console.log(this.columns);
    console.log(this.bookedSeats);

    // this.$http.get('/api/paymentendpoints').then(response =>{
    //   this.theatres = response.data;
    //   this.cityMappings = _.groupBy(this.theatres, (theatre)=>{ return theatre.city; });
    //   console.log(this.theatres);
    //   // this.socket.syncUpdates('theatre', this.theatres);
    // });
  }

  isSelected(row, col){
    if(_.find(this.selectedSeats, function(seat){ return seat.row === row && seat.col === col })){
      return true;
    } else {
      return false;
    }
  }

  isBooked(row, col){
    if(_.find(this.bookedSeats, function(seat){ return seat.row === row && seat.col === col})){
  return true;
} else{
      return false;
    }
  }

  selectSeat(row, col, classType){
    this.paid=false;
    console.log('calling selectseat function');
    this.paidmovies=_.where(this.payments, {name: this.movieDetails.name, date:this.movieDetails.date,time:this.movieDetails.time});
    for(let pay of this.paidmovies)
    {
      console.log(pay.bookedSeats);
      for(let seat of pay.bookedSeats)
      {
        //seats after payment
        console.log('paid seats are '+seat.row+' '+seat.col);
        //if the already booked seat is selected
        if(row==seat.row&&col==seat.col)
        {
          alert('Seat is already booked Plz select any other seat')
          document.getElementById('bookingbtn').disabled=true;
this.paid=true;
        }

      }
    }

      if(this.paid==false)
      {
          //if the booked seat is not selected
     if(!this.isSelected(row, col) && !this.isBooked(row, col)){
document.getElementById('bookingbtn').disabled=false;
      console.log("selected")
      this.selectedSeats.push({
        row: row,
        col: col,
        classType: classType
      });
     }

    else{
       this.selectedSeats = _.reject(this.selectedSeats, function(seat){ return seat.row === row && seat.col===col })
    }
  }

    this.bookingForm.gold = _.filter(this.selectedSeats, function(seat){ return seat.classType === "gold" });
    this.bookingForm.silver = _.filter(this.selectedSeats, function(seat){ return seat.classType === "silver"})
    this.bookingForm.grandTotal = ( (this.bookingForm.gold.length * 200) + (this.bookingForm.silver.length * 100) + 30)
    console.log(this.bookingForm);
    console.log(this.selectedSeats);

}

  bookSeats(){
    this.bookingService.addSelected(this.selectedSeats, this.bookingForm.grandTotal);
    if (typeof(Storage) !== "undefined") {
    // Store
    sessionStorage.setItem("MovieName", this.bookingService.getDetails().name);
    sessionStorage.setItem("date", this.bookingService.getDetails().date);
    sessionStorage.setItem("time", this.bookingService.getDetails().time);
    sessionStorage.setItem("selectedSeats", JSON.stringify(this.bookingService.getDetails().selectedSeats));
    sessionStorage.setItem("grandTotal", this.bookingService.getDetails().grandTotal);
    // Retrieve
    console.log(sessionStorage.getItem("MovieName"));
    console.log(this.bookingService.getDetails().selectedSeats);
    console.log(JSON.parse(sessionStorage.getItem("selectedSeats")));
} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
}

    this.$location.path('/payment');
  }
}

angular.module('yoTemplateApp')
  .component('bookingseats', {
    templateUrl: 'app/bookingseats/bookingseats.html',
    controller: BookingseatsComponent,
    controllerAs: 'bookingseatsCtrl'
  });

})();
