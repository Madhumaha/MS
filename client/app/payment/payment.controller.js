'use strict';

(function(){

class PaymentComponent {
  constructor($scope, $http, socket, booking, $location) {
    this.message = 'Hello';
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket,
    this.bookingService = booking;
    this.$location = $location;
    this.bankname ='';
    this.selectedSeats = [];
    this.bookedSeats = [];
    this.bookingForm = {};


  }
 $onInit(){

   this.movieDetails = this.bookingService.getDetails();
    console.log(this.movieDetails);

 }
  netbanking(bn){

    console.log('bank name is '+bn);
      if(bn=="icici")
      {
      location.href="https://infinity.icicibank.com/corp/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=ICI&_ga=2.52378025.1218156100.1495105311-425073507.1495008926";
      bookSeats();
    }  //location.href="https://shopping.icicibank.com/corp/BANKAWAY?IWQRYTASKOBJNAME=bay_mc_login&BAY_BANKID=ICI";
       if(bn=="sbi")
        location.href="https://retail.onlinesbi.com/retail/login.htm";
         if(bn=="axis")
        location.href="https://retail.axisbank.co.in/wps/portal/rBanking/axisebanking/AxisRetailLogin/!ut/p/a1/04_Sj9CPykssy0xPLMnMz0vMAfGjzOKNAzxMjIwNjLwsQp0MDBw9PUOd3HwdDQwMjIEKIoEKDHAARwNC-sP1o_ArMYIqwGNFQW6EQaajoiIAVNL82A!!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/";
        else if(bn=="hdfc")
        location.href="https://netbanking.hdfcbank.com/netbanking/";
        if(bn=="citi")
        location.href="https://www.citibank.co.in/ibank/login/IQPin1.jsp";
        if(bn=="Kotak")
        location.href="https://www.kotak.com/j1001mp/netapp/MainPage.jsp";

    }

    bookSeats(){

      console.log(this.movieDetails);
    this.$http.post('/api/paymentendpoints',{
      name: this.movieDetails.name,
      theatre: this.movieDetails.theatre,
      bookedSeats: this.movieDetails.selectedSeats,
      grandTotal: this.movieDetails.grandTotal,
      date: this.movieDetails.date,
      time: this.movieDetails.time
    })
    .then(response =>{
      console.log(response);
      this.$location.path('/receipt');
    });
      console.log('seats r booked');
    }

}



angular.module('yoTemplateApp')
  .component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent,
    controllerAs: 'paymentCtrl'
  });

})();
