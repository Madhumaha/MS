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
  }

  $onInit() {
    this.$http.get('/api/runningmoviesendpoints/')
    .then(response => {
      this.theatreMappings = response.data;

      var movieDetails = this.bookingService.getDetails()
      this.theatreMappings =  _.filter(this.theatreMappings, function(mapping){ return mapping.movie = movieDetails.name})
      console.log(this.theatreMappings);

      for( var mapping of this.theatreMappings){
        // console.log("ewfew");
        // console.log(mapping.dates.length);
        for( var i=0; i<mapping.dates.length; i++){
          this.dates.push(mapping.dates[i]);
        }
      }
      // console.log(this.dates);
      this.dates = _.uniq(this.dates);
      console.log(this.dates);
      // console.log(this.theatreMappings);
      this.socket.syncUpdates('runningmoviesendpoint', this.theatreMappings);
    });
  }


  selectDate(date){
    console.log(date);
    this.timings.date = date;
    this.filteredMappings = _.filter(this.theatreMappings, function(mapping){ return _.contains(mapping.dates, date)});
    console.log(this.filteredMappings);
     //this.$location.path('/timings');
  }


  selectTimings(time){
    console.log(this.timings.date, time);
    this.bookingService.setTimings(this.timings.date, time);
    console.log(this.bookingService.getDetails());
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
