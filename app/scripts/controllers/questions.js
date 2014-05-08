'use strict';

angular.module('revisionsApp')
  .controller('QuestionsCtrl', function($scope, $rootScope, $filter, Db) {

    $scope.questions = null;
    $scope.show_form = true;

    function getQuestions() {
      Db.getQuestions(0, function(questions) {
        $scope.questions = questions;
      });
    }

    $scope.addQuestion = function(q, a) {
      $scope.form_show = false;
      Db.addQuestion(q, a);
      getQuestions(); // faire mieux que ça....
    }

    $scope.deleteQuestion = function(id) {
      Db.deleteQuestion(id);
      getQuestions(); // faire mieux que ça....
    }

    getQuestions();
  });
