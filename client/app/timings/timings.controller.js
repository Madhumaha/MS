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


      // this.theatreMappings =  _.filter(this.theatreMappings, function(mapping){ return mapping.movie = movieDetails.name})
    this.backdrop = this.bookingService.backdrop;
      // console.log(movieDetails);
      //
      // for( var mapping of this.theatreMappings){
      //   // console.log("ewfew");
      //   // console.log(mapping.dates.length);
      //   for( var i=0; i<mapping.dates.length; i++){
      //     this.dates.push(mapping.dates[i]);
      //   }
      // }
      // // console.log(this.dates);
      // this.dates = _.uniq(this.dates);
      // console.log(this.dates);
      // // console.log(this.theatreMappings);
      // this.dates = _.sortBy( this.dates, (date)=>{ return date } );
      this.socket.syncUpdates('runningmoviesendpoint', this.theatreMappings);
    });
  }



  // genDate(date){
  //     var day = new Date(date).getDate();
  //     var dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(date).getDay()];
  //     var year = new Date(date).getFullYear();
  //     return `${day}, ${dayName}`;
  //   }

    // genTiming(timing){
    //   var hours = new Date(timing).getHours();
    //   var minutes = new Date(timing).getMinutes();
    //   return `${hours}.${minutes}`;
    // }

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
  // selectDate(date){
  //   console.log(date);
  //   this.timings.date = date;
  //   this.filteredMappings = _.filter(this.theatreMappings, function(mapping){ return _.contains(mapping.dates, date)});
  //   console.log(this.filteredMappings);
  //    //this.$location.path('/timings');
  // }


  // selectTimings(theatre,time){
  //   console.log(theatre,this.timings.date, time);
  //   this.bookingService.setTimings(theatre,this.timings.date, time);
  //   console.log(this.bookingService.getDetails());
  //   this.$location.path('/bookingseats');
  // }

}

angular.module('yoTemplateApp')
  .component('timings', {
    templateUrl: 'app/timings/timings.html',
    controller: TimingsComponent,
    controllerAs: 'timingsCtrl'
  });

})();
