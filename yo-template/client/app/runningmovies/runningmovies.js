'use strict';

angular.module('yoTemplateApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/runningmovies', {
        template: '<runningmovies></runningmovies>'
      });
  });
