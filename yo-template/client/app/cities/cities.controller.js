'use strict';

(function(){

class CitiesComponent {
  constructor($http,socket) {
    this.message = 'Hello';
    this.$http = $http
    this.newCity = [];
  }

  $onInit() {
    this.$http.get('/api/citiesendpoints').then(response => {
      this.cities = response.data;
      console.log(this.cities);
       this.socket.syncUpdates('citiesendpoint', this.cities);
    })
  }

  addCity() {
      console.log('hi');
      this.$http.post('/api/citiesendpoints', {
        name:this.name
      });
      location.reload();
    }

    deleteCity(city) {
    this.$http.delete('/api/citiesendpoints/' + city._id).then(response => {
      console.log(response);
    });
    location.reload();
  }

  updateCity(city) {
    console.log('sdfsd');
    var name = prompt("Enter new city name");

    this.$http.put('/api/citiesendpoints/' + city._id, {
      name: name
    }).then(response =>{
      this.socket.syncUpdates('citiesendpoint', this.cities);
      console.log(response);
    });
  }

}

angular.module('yoTemplateApp')
  .component('cities', {
    templateUrl: 'app/cities/cities.html',
    controller: CitiesComponent,
    controllerAs: 'citiesCtrl'
  });

})();
