'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, booking, $location) {
      this.$http = $http;
      this.socket = socket;
      // this.awesomeThings = [];
      this.bookingService = booking;
      this.$location = $location;
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('moviesendpoint');
      });
    }

    // $onInit() {
    //   this.$http.get('/api/things')
    //     .then(response => {
    //       this.awesomeThings = response.data;
    //       this.socket.syncUpdates('thing', this.awesomeThings);
    //     });
    // }

    $onInit() {
        this.$http.get('/api/runningmoviesendpoints').then( response =>{
          this.mappings = response.data;
          console.log(this.mappings);

          var movieNames = [];

          for(var mapping of this.mappings){
            // console.log(mapping);
            movieNames.push(mapping.movie);
          }
          movieNames =_.uniq(movieNames);
          console.log(movieNames);

          console.log("dsfsd");
          this.$http.get('/api/moviesendpoints').then( response =>{
            this.movies = response.data;
            console.log(this.movies)
            this.movies = _.filter(this.movies, function(movie){ return _.find(movieNames, function(title){ return title === movie.Title }) } )
            console.log(this.movies)
          })
        })
      }

      selectMovie(name){
        console.log(this.bookingService.setName);
        this.bookingService.setName(name);
        this.$location.path('/timings');
      }
  }

  angular.module('yoTemplateApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
