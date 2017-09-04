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
    // this.rows = ['A','B','C','D','E','F'];
    // this.columns = [1,2,3,4,5,6,7,8,9,10];
    // this.selected = false;
    this.selectedSeats = [];
    this.bookedSeats = [];
    this.bookingForm = {};
    this.$location = $location;
    this.movieDetails = {};
    this.payments=[];
  }

  $onInit(){
    this.movieDetails = this.bookingService.getDetails();
  //   this.$http.get('/api/paymentendpoints').then(response => {
  //   this.bookedSeats = _.flatten( _.map( _.filter(response.data, (detail)=>{ return detail.name === this.movieDetails.name && detail.theatre === this.movieDetails.theatre } ), (seat)=>{ return seat.bookedSeats }) );
  //   console.log('Booked seats are '+JSON.stringify(this.bookedSeats));
  // } );
  this.$http.get('/api/paymentendpoints').then( response=>{
      this.payments = response.data;
    //  this.paying=JSON.stringify(this.payments);
    //  console.log(this.paying);
      for(let pay of this.payments)
      {
        console.log(pay.bookedSeats);
        for(let seat of pay.bookedSeats)
        {
          console.log('paid seats are '+seat.row+' '+seat.col);
          var images = $(".seats");

          // var seatpaid=document.getElementsByClassName('seatbook');
          // console.log(seatpaid);
          var seatno=(seat.row).toString()+(seat.col).toString();
           for(var i=0;i<images.length;i++)
           {
          console.log(images[i].id);
          if(divs[i].id===seatno)
          {
          images[i].style.backgroundColor='grey';
          images[i].disabled=true;
        }
           }
        }
      }
      //console.log('paid seats '+JSON.stringify(this.payments));

  })
    console.log(this.movieDetails);
    console.log(this.rows);
    console.log(this.columns);
    // this.bookedSeats = this.movieDetails.bookedSeats;
    console.log(this.bookedSeats);

  //   this.$http.get('/api/paymentendpoints').then(response =>{
  //   this.payments = response.data;
  //   console.log('payments '+JSON.stringify(this.payments));
  //   for(let payment of this.payments){
  //     console.log('Paid seats  '+JSON.stringify(payment.selectedSeats));
  //     for(let seatno of payment.selectedSeats)
  //     {
  //       console.log('paid seat no r '+seatno.row+' '+seatno.col);
  //
  //     }
  //   }
  // });
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
    if(!this.isSelected(row, col) && !this.isBooked(row, col)){
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
    console.log("shoop baby");
    // this.bookingService.addSelected(this.selectedSeats, this.bookingForm.grandTotal);
    // console.log(this.bookingService.getDetails());
    // console.log(this.bookingService.getDetails().selectedSeats);

    // this.movieDetails = this.bookingService.getDetails();
    // for( var mapping of this.movieDetails){
    //   // console.log("ewfew");
    //   // console.log(mapping.dates.length);
    //   for( var i=0; i<mapping.selectedSeats.length; i++){
    //     this.bookedSeats.push(mapping.selectedSeats[i]);
    //   }
    // }

    // console.log('booking seats '+this.bookingService.getDetails());
    // for(var i in this.bookingService.getDetails().selectedSeats)
    // this.bookedSeats.push(this.bookingService.getDetails().selectedSeats[i]);
    // console.log('booked seats '+this.bookedSeats);
    //this.selectedSeats = [];
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
