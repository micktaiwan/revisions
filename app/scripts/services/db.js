'use strict';

angular.module('revisionsApp.services.db', []).factory('Db', function($rootScope, $location, CONFIG) {

  var user;

  //var shares = [];
  var questions_ref = new Firebase(CONFIG.firebaseUrl + '/questions');

  function safeApply(scope, fn) {
    (scope.$$phase || scope.$root.$$phase) ? fn() : scope.$apply(fn);
  }

  function toArray1(obj) {
    var rv = [];
    for (var id in obj) {
      var o = obj[id];
      rv.push(o);
    }
    return rv;
  }

  function doGetQuestions(questions_ref, limit, callbackSuccess, toArray) {
    var ref = questions_ref.startAt();
    if (limit > 0) {
      ref = ref.limit(limit);
    }
    ref.once('value', function(snapshot) {
      if (snapshot.val() !== null) {
        safeApply($rootScope, function() {
          callbackSuccess(toArray(snapshot.val()));
          return;
        });
      } else {
        console.log('no values in DB');
        safeApply($rootScope, function() {
          callbackSuccess([]);
          return;
        });
      }
    });
  }

  return {

    getQuestions: function(limit, callbackSuccess) {
      console.log('getQuestions');
      doGetQuestions(questions_ref, limit, callbackSuccess, toArray1);
    },

    addQuestion: function(question, answer) {
      var date = (new Date()).getTime();
      console.log('Db.addQuestion ' + question + ', ' + answer + ', ' + (-date));
      var id = questions_ref.push().name();
      questions_ref.child(id).set({
        creationDate: date,
        modificationDate: date,
        question: question,
        answer: answer,
      });
      questions_ref.child(id).setPriority(-date);
      return id;
    },

    deleteQuestion: function(id) {
      console.log('deleting ' + id);
      questions_ref.child(id).remove();
    },
  };

});
