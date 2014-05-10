'use strict';

angular.module('revisionsApp')
  .controller('QuestionsCtrl', function($scope, $rootScope, $filter, Db) {

    $scope.questions = [];
    $scope.show_form = true;

    function getQuestions() {
      Db.getQuestions(0, function(questions) {
        $scope.questions = questions;
      });
    }

    $scope.addQuestion = function(q, a) {
      $scope.form_show = false;
      var id = Db.addQuestion(q, a);
      $scope.questions.unshift({
        id: id,
        question: q,
        answer: a
      });
    }

    $scope.import = function(txt) {
      txt.split("\n").forEach(function(line) {
        var arr = line.split(':')
        Db.addQuestion(arr[1], arr[0]);
        //console.log(arr[0], arr[1]);
      });
      $scope.txt = 'imported';
    }



    $scope.deleteQuestion = function(id) {
      Db.deleteQuestion(id);
      getQuestions(); // faire mieux que ça....
    }

    getQuestions();
  });
