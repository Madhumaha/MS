'use strict';

angular.module('yoTemplateApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/timings', {
        template: '<timings></timings>'
      });
  });
