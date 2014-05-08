'use strict';

angular.module('revisionsApp')
  .controller('MainCtrl', function($scope, $rootScope, $filter, Db) {

    $scope.questions = null;
    $scope.show_form = true;

    function findByObjectId(list, id) {
      for (var i in list) {
        if (list[i].object_id === id) {
          return true;
        }
      }
      return false;
    }

    function getQuestions() {
      Db.getQuestions(0, function(questions) {
        $scope.questions = questions;
      });
    }

    $scope.addQuestion = function(q, a) {
      Db.addQuestion(q, a);
      getQuestions(); // faire mieux que ça....
    }
    getQuestions();
  });
