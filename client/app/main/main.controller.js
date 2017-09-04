'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, booking, $location) {
      this.$http = $http;
      this.socket = socket;
      // this.awesomeThings = [];
      this.bookingService = booking;
      this.$location = $location;
      this.filteredMovies = [];
      this.query = {};
      this.showMovies = false;
      this.canRate = true;
      this.cnt = 0;
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

          this.movieNames = [];

          // for(var mapping of this.mappings){
          //   // console.log(mapping);
          //   movieNames.push(mapping.movie);
          // }
          // movieNames =_.uniq(movieNames);
          // console.log(movieNames);
          //
          // console.log("dsfsd");
          // this.$http.get('/api/moviesendpoints').then( response =>{
          //   this.movies = response.data;
          //   console.log(this.movies)
          //   this.movies = _.filter(this.movies, function(movie){ return _.find(movieNames, function(title){ return title === movie.Title }) } )
          //   console.log(this.movies)
          // })


          this.cities = [];
        this.movieNames = _.uniq(_.pluck(this.mappings, 'movie'));
        this.cities = _.uniq(_.pluck(this.mappings, 'city'));
        this.cities =_.uniq(this.cities);
        console.log(this.cities);
        this.$http.get('/api/moviesendpoints').then( response =>{
          this.movies = response.data;
          console.log(this.movies)
          console.log(this.movies);
        })
      });
      }


      rate(movie) {
            if(this.cnt===0){
              this.cnt++;
              this.$rateYo = $("#rateYo").rateYo();
            }
            else{
              var movieData = _.findWhere(this.movieDetails, {title:movie});
              this.canRate = false;
              this.cnt = 0;
              this.rating += this.$rateYo.rateYo("rating");
              this.count++;
              this.avgR = this.rating/this.count;
              this.rateObj.push({
                userName: this.userName,
                hasRated: true
              });
              if(this.rateObj.length){
                this.$http.put('/api/moviesendpoints/' + movieData._id, {
                  avgRating: this.avgR,
                  rating: this.rateObj
                });
              }
            }
          }


          filterMovies(city){

      $('html, body').animate({
        scrollTop: $("#searchbar").offset().top
    }, 1000);

      console.log('this.movies');
      console.log(this.mappings)
      this.query.city = city;
      this.filteredMovies = _.filter(this.movies, (movie)=>{ return _.contains( _.pluck( _.filter(this.mappings, (mapping)=>{ return mapping.city === this.query.city } ), 'movie' ), movie.Title ) } );
      this.showMovies = true;
      console.log(this.filteredMovies);
    }

      selectMovie(name){
        console.log(this.bookingService.setName);
        this.bookingService.setName(name);
        this.$location.path('/timings');
        this.bookingService.backdrop = _.find(this.movies, (movie)=>{return movie.Title === name}).Backdrop;
      console.log(this.bookingService);
      }
  }

  angular.module('yoTemplateApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
