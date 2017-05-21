'use strict';

angular.module('yoTemplateApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bookingseats', {
        template: '<bookingseats></bookingseats>'
      });
  });
