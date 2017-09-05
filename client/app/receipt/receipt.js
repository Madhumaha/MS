'use strict';

angular.module('yoTemplateApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/receipt', {
        template: '<receipt></receipt>'
      });
  });
