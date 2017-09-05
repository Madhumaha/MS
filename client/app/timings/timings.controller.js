'use strict';

(function(){

class TimingsComponent {
  constructor($scope, $http, socket, booking, $location) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$http = $http;
    this.socket = socket;
    this.theatreMappings = [];
    this.filteredMappings = [];
    this.dates = [];
    this.bookingService = booking;
    this.$location = $location;
    this.timings = {};
    this.backdrop = "";
    this.theaterData = [];
    this.sortedDates = [];
    this.newDates = [];
    this.movieDetails = this.bookingService.getDetails().name;
  }

  $onInit() {
    var dates = [];
    this.$http.get('/api/runningmoviesendpoints/')
    .then(response => {
      this.theatreMappings = response.data;


console.log('selected movie '+this.movieDetails);
      for(let ele of this.theatreMappings){
              if(ele.movie===this.movieDetails){
                dates.push(...ele.dates);
              }
            }
            this.filteredDates = dates.filter(function(item, pos){
                    return dates.indexOf(item)== pos;
                  });

                  for(var i=0;i<this.filteredDates.length-1;i++){
                    if(this.filteredDates[i]>this.filteredDates[i+1]){
                      var temp = this.filteredDates[i];
                      this.filteredDates[i] = this.filteredDates[i+1];
                      this.filteredDates[i+1] = temp;
                    }
                  }

                  function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        } return i;
      }
      for(let dateEle of this.filteredDates){
        var date = addZero(new Date(dateEle).getDate());
        var month = addZero(new Date(dateEle).getMonth());
        var year = new Date(dateEle).getFullYear();
        var fullDate = date+"."+month+"."+year;
        this.newDates.push(fullDate);
      }



    this.backdrop = this.bookingService.backdrop;

      this.socket.syncUpdates('runningmoviesendpoint', this.theatreMappings);
    });
  }

    getTheaterDetails(date){
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      } return i;
    }
    this.bookingService.movieDetails.date = date;
    this.theatersData = [];
    for(let ele of this.theatreMappings){
      if(ele.movie===this.movieDetails){
        for(let dateEle of ele.dates){
          var d = addZero(new Date(dateEle).getDate());
          var m = addZero(new Date(dateEle).getMonth());
          var y = new Date(dateEle).getFullYear();
          var fullDate = d+"."+m+"."+y
          console.log(date);
          console.log(fullDate);
          if(date===fullDate){
            this.theatersData.push(ele);
          }
        }
      }
    }
    console.log(this.theatersData);
  }

  sel(theater, timing) {
      this.bookingService.movieDetails.theatre = theater;
      this.bookingService.movieDetails.time = timing;
      this.$location.path('/bookingseats');
    }
  
}

angular.module('yoTemplateApp')
  .component('timings', {
    templateUrl: 'app/timings/timings.html',
    controller: TimingsComponent,
    controllerAs: 'timingsCtrl'
  });

})();
