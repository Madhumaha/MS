'use strict';

angular.module('yoTemplateApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/rating', {
        template: '<rating></rating>'
      });
  });
