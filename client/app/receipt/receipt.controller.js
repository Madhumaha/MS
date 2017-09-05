'use strict';

(function(){

class ReceiptComponent {
  constructor($http, booking) {
    this.$http = $http;
    this.bookingService = booking;
  }
  $onInit(){
    console.log(this.bookingService);
    this.zip = _.flatten( this.bookingService.movieDetails.selectedSeats );
  }
}

angular.module('yoTemplateApp')
  .component('receipt', {
    templateUrl: 'app/receipt/receipt.html',
    controller: ReceiptComponent,
    controllerAs: 'receiptCtrl'
  });

})();
