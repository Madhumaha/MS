'use strict';

angular.module('yoTemplateApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/theatres', {
        template: '<theatres></theatres>'
      });
  });
