'use strict';

(function(){

class RunningmoviesComponent {
  constructor($http, socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.socket = socket;

    this.movies = [];
    this.theatres = [];
    this.cities = [];
    this.mappings = [];
    this.mapping = {};

    this.theatreForm = {};
    this.cityMappings = {};
  }

  $onInit(){

        this.$http.get('/api/theatresendpoints').then(response =>{
          this.theatres = response.data;
          this.cityMappings = _.groupBy(this.theatres, (theatre)=>{ return theatre.city; });
          console.log(this.theatres);

        });

        this.$http.get('/api/moviesendpoints').then(response =>{
        this.movies = response.data;

      });

      this.$http.get('/api/citiesendpoints').then(response =>{
        this.cities = response.data;

      });

      this.$http.get('/api/runningmoviesendpoints').then(response =>{
        this.mappings = response.data;
        console.log(this.mappings);

      });
    }

    addMapping(){
      if(this.searchMapping())
      {
        this.mapping = this.searchMapping()
        console.log(this.searchMapping());
        console.log("movie is running");
      }
      else {
        console.log("movie is not running, creating new")
        this.mapping = {}
        this.mapping.city = this.theatreForm.city;
        this.mapping.theatre = this.theatreForm.theatre;
        this.mapping.movie = this.theatreForm.movie;
        this.mapping.dates = [];
        this.mapping.timings = [];
      }
      console.log(this.mapping);
    }

    searchMapping(){
      return  _.find( this.mappings, (mapping)=>{ return mapping.city === this.theatreForm.city && mapping.theatre === this.theatreForm.theatre && mapping.movie === this.theatreForm.movie } );

  }

  addDate(){
      var day = new Date(this.theatreForm.date).getDate();
      var month = new Date(this.theatreForm.date).getMonth();
      var year = new Date(this.theatreForm.date).getFullYear();
      this.mapping.dates.push(`${day}/${month}/${year}`);
      console.log(this.mapping.dates);
      console.log(this.mapping);
    }

    removeDate(i){
    this.mapping.dates.splice(i,1);
  }

  addTiming(){
      var hours = new Date(this.theatreForm.timing).getHours();
      var minutes = new Date(this.theatreForm.timing).getMinutes();
      this.mapping.timings.push(`${hours}:${minutes}`);
      console.log(this.mapping);
    }

    removeTiming(i){
    this.mapping.timings.splice(i,1);
  }

  PostOrUpdateMapping(city, theatre, movie){
      console.log(this.searchMapping());
      var mapping = this.searchMapping();
      console.log(mapping);
      if(mapping)
      {
        console.log("movie is already running, updating changes...");
        this.$http.put('/api/runningmoviesendpoints/' + mapping._id, {
          dates: this.mapping.dates,
          timings: this.mapping.timings
        }).then(response =>{
          console.log(response);
          console.log(this.mappings);
          this.mappings = _.reject(this.mappings, (map)=>{ return map._id === mapping._id });
          this.mappings.push(response.data);

        })
      }
      else {
        console.log("Movie is not running, posting new...");
        this.$http.post('/api/runningmoviesendpoints', this.mapping).then( (response) =>
          {
              console.log(response);
              this.mappings = _.reject(this.mappings, (map)=>{ return map._id === mapping._id });
              this.mappings.push(response.data);

              console.log(this.mappings);
          }, (err) => console.log(err) );
      }
    }

    deleteMapping(){
      var mapping = this.searchMapping();
      if(mapping){
        this.$http.delete('/api/runningmoviesendpoints/' + mapping._id).then( response =>{
           console.log(response);
           this.mappings = _.reject(this.mappings, (map)=>{ return map._id === mapping._id });
          
         });
      }
      else {
        console.log("Movie is not running")
      }
    }

}

angular.module('yoTemplateApp')
  .component('runningmovies', {
    templateUrl: 'app/runningmovies/runningmovies.html',
    controller: RunningmoviesComponent,
    controllerAs: 'runningmoviesCtrl'
  });

})();
