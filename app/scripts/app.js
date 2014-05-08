'use strict';

angular.module('revisionsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'revisionsApp.services.db'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
