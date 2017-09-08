'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, booking, $location,Auth) {
      this.$http = $http;
      this.socket = socket;
      this.isLoggedIn = Auth.isLoggedIn;
      this.getCurrentUser = Auth.getCurrentUser;
      this.bookingService = booking;
      this.$location = $location;
      this.filteredMovies = [];
      this.movies=[];
      this.movieratings=[];
      this.movieNames = [];
      this.query = {};
      this.showMovies = false;
      this.canRate = true;
      this.cnt = 0;
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('moviesendpoint');
      });
    }

    $onInit() {
        this.$http.get('/api/runningmoviesendpoints').then( response =>{
          this.mappings = response.data;
          console.log(this.mappings);

          this.cities = [];
        this.movieNames = _.uniq(_.pluck(this.mappings, 'movie'));
        this.cities = _.uniq(_.pluck(this.mappings, 'city'));
        this.cities =_.uniq(this.cities);
        console.log(this.cities);
        this.$http.get('/api/moviesendpoints').then( response =>{
          this.movies = response.data;
          console.log(this.movies)
        })

      this.$http.get('/api/ratingendpoints').then( response =>{

      this.movieratings = response.data;
      console.log(this.movieratings.length);
      this.socket.syncUpdates('ratingendpoint', this.movieratings);
      this.ratedmovies=[];
      this.rmovies=[];

      console.log('No of movies on home page '+this.movieNames.length);
      console.log('Movie names on home page '+this.movieNames);
      for(let movie of this.movieNames)
      {
        console.log('movie name on home '+movie);
          this.ratedmovies=_.where(this.movieratings,{Moviename:movie});
           console.log('ratedmovies '+this.ratedmovies.length);

               console.log('no of ratings '+this.ratedmovies.length)
             var sum=0;
             for(var i=0;i<this.ratedmovies.length;i++)
             {
              console.log(this.ratedmovies[i].Rating);
             }
               for(let rating of this.ratedmovies)
              {
                sum=sum+rating.Rating;
               }
               console.log("Total rating "+sum);
               this.avgrating=sum/this.ratedmovies.length;
              console.log('avg rating '+this.avgrating);
              console.log('all movies in db '+this.movies);
              this.rmovies=_.where(this.movies,{Title:movie});
              for(let rmovie of this.rmovies)
              {
              this.$http.put('/api/moviesendpoints/' + rmovie._id, {
                    avgRating: this.avgrating
                  });
            }
            }
      });
});
}


      rate(movie) {
        console.log('Rating movie :'+movie);
        if (typeof(Storage) !== "undefined") {
        // Store
        sessionStorage.setItem("MovieName", movie);

        // Retrieve
        console.log(sessionStorage.getItem("MovieName"));
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
    if(this.isLoggedIn())
    {
        this.$location.path('/rating');
      }
        else {
alert('Please login to rate the movie')
this.$location.path('/login');
        }
      }

    filterMovies(city){
      $('html, body').animate({
      scrollTop: $("#searchbar").offset().top}, 1000);
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
