'use strict';

angular.module('revisionsApp')
  .controller('QuizzCtrl', function($scope, $rootScope, $filter, Db) {

    $scope.question = null;
    $scope.show_form = true;
    var queue = [];
    var filtered = [];
    var index = -1;

    function findByObjectId(list, id) {
      for (var i in list) {
        if (list[i].object_id === id) {
          return true;
        }
      }
      return false;
    }

    function getNextQuestion() {
      index += 1;
      if (index >= filtered.length) index = 0;
      $scope.question = filtered[index];
    }

    function getPreviousQuestion() {
      index -= 1;
      if (index < 0) index = filtered.length - 1;
      $scope.question = filtered[index];
    }

    function shuffle(sourceArray) {
      for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));

        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
      }
    }

    $scope.$watch('filter', function() {
      if (queue.length == 0) return;
      if ($scope.filter == "") {
        filtered = queue;
      } else {
        filtered = queue.filter(function(i) {
          return i.question.toUpperCase().indexOf($scope.filter.toUpperCase()) != -1
        });
      }
      $scope.filtered_length = filtered.length;
      getNextQuestion();
    });

    function getQuestions() {
      Db.getQuestions(0, function(q) {
        queue = q;
        shuffle(queue);
        filtered = queue;
        $scope.filtered_length = filtered.length;
        getNextQuestion();
      });
    }

    $scope.getNextQuestion = function() {
      getNextQuestion();
    }
    $scope.getPreviousQuestion = function() {
      getPreviousQuestion();
    }

    getQuestions();
  });
