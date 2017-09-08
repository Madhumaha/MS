'use strict';

(function(){

class RatingComponent {
  constructor($scope, $http, socket,booking,$location,Auth) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$http = $http;
    this.bookingService = booking;
    this.$location = $location;
var sum=0;
this.avgrating='';
this.movieratings=[];
this.ratedmovies=[];
this.userrates=[];
  this.getCurrentUser = Auth.getCurrentUser;
    this.movieDetails = {};
  }
   $onInit(){
    this.moviename = sessionStorage.getItem("MovieName");
    this.$http.get('/api/ratingendpoints').then( response =>{
    this.movieratings = response.data;
  })
}
  ratemovie(name,rating){
    console.log(name+' '+rating);
    for(let movierate of this.movieratings)
    {
  this.userrates=_.where(movierate,{Username:this.getCurrentUser().name,Moviename:name});
  console.log(this.userrates);
}
  if(this.userrates.Username==this.getCurrentUser().name&&this.userrates.Moviename==name)
  {
    this.$http.put('/api/ratingendpoints/' + this.userrates._id, {
          Rating:rating
        });
  this.$location.path('/main');
  }
  else {
          this.$http.post('/api/ratingendpoints',{
        Moviename: name,
        Username: this.getCurrentUser().name,
        Usermail:this.getCurrentUser().email,
        Rating:rating
      })
      .then(response =>{
        console.log(response);
        this.$location.path('/main');
      });
    }

    }


}

angular.module('yoTemplateApp')
  .component('rating', {
    templateUrl: 'app/rating/rating.html',
    controller: RatingComponent,
    controllerAs: 'ratingCtrl'
  });

})();
