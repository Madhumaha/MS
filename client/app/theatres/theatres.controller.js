'use strict';

(function(){

class TheatresComponent {
  constructor($http, socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.socket = socket;
    this.theatres = [];
    this.enableUpdate = false
  }


  $onInit(){
    this.$http.get('/api/citiesendpoints').then(response =>{
      this.cities = response.data;
      console.log(this.cities);
      this.socket.syncUpdates('citiesendpoint', this.cities);
    });

    this.$http.get('/api/theatresendpoints').then(response =>{
      this.theatres = response.data;
      console.log(this.theatres);
      this.socket.syncUpdates('theatresendpoint', this.theatres);
    });
}

getTheatres(theatre){
    // console.log('sdfd');
    this.enableUpdate = false;
    this.$http.get('/api/theatresendpoints').then(response =>{
      this.theatres = response.data;
      console.log(this.theatres);
      // this.socket.syncUpdates('theatre', this.theatres);
    });
  }

  addTheatre(){
    this.$http.post('/api/theatresendpoints',{
      name: this.theatre.name,
      city: this.theatre.city,
      location: this.theatre.location,
      screenCount: this.theatre.screenCount,
      seatCount: this.theatre.seatCount
    });
    this.theatre = '';
  }

  deleteTheatre(theatre){
      console.log("dsfs");
          this.$http.delete('/api/theatresendpoints/' + theatre._id).then(response => {
            console.log(response);
          });
    }

    saveTheatre(theatre){
      this.$http.put('/api/theatresendpoints/' + theatre._id, {
        name: theatre.name,
        city: theatre.city,
        location: theatre.location,
        screenCount: theatre.screenCount,
        seatCount: theatre.seatCount
      }).then(response => {
        console.log(response);
      });
    }
  }

angular.module('yoTemplateApp')
  .component('theatres', {
    templateUrl: 'app/theatres/theatres.html',
    controller: TheatresComponent,
    controllerAs: 'theatresCtrl'
  });

})();
