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
        templateUrl: 'views/quizz.html',
        controller: 'QuizzCtrl'
      })
      .when('/questions', {
        templateUrl: 'views/questions.html',
        controller: 'QuestionsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
