'use strict';

angular.module('revisionsApp')
  .controller('QuizzCtrl', function($scope, $rootScope, $filter, Db) {

    $scope.question = null;
    $scope.show_form = true;
    var questions = null;

    function findByObjectId(list, id) {
      for (var i in list) {
        if (list[i].object_id === id) {
          return true;
        }
      }
      return false;
    }

    function getNextQuestion() {
      $scope.question = questions[Math.floor((Math.random() * questions.length))];
    }


    function getQuestions() {
      Db.getQuestions(0, function(q) {
        questions = q;
        getNextQuestion();
      });
    }

    $scope.getNextQuestion = function() {
      getNextQuestion();
    }

    getQuestions();
  });
