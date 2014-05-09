'use strict';

angular.module('revisionsApp')
  .controller('QuizzCtrl', function($scope, $rootScope, $filter, Db) {

    $scope.question = null;
    $scope.show_form = true;
    var queue = null;
    var index = 0;

    function findByObjectId(list, id) {
      for (var i in list) {
        if (list[i].object_id === id) {
          return true;
        }
      }
      return false;
    }

    function getNextQuestion() {
      $scope.question = queue[index];
      index += 1;
      if (index >= queue.length) index = 0;
    }

    function shuffle(sourceArray) {
      for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));

        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
      }
    }

    function getQuestions() {
      Db.getQuestions(0, function(q) {
        queue = q;
        shuffle(queue);
        getNextQuestion();
      });
    }

    $scope.getNextQuestion = function() {
      getNextQuestion();
    }

    getQuestions();
  });
