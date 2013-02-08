'use strict';

/* Directives */

angular.module('csm.directives', []).
	directive('authDemoApplication', function() {
    return {
      restrict: 'C',
      link: function(scope, elem, attrs) {
        //once Angular is started, remove class:
        //elem.removeClass('waiting-for-angular');
        
        var login = elem.find('#login-container');
        var main = elem.find('#content');
        
        login.hide();
        
        scope.$on('event:auth-loginRequired', function() {
            login.slideDown('slow', function() {
            main.hide();
          });
        });
        scope.$on('event:auth-loginConfirmed', function() {
           main.show();
          login.slideUp();
        });
      }
    };
  }).
  directive('emailsHolder', function() {
    return {
      restrict: 'C',
      link: function(scope, elem, attrs) {
        var email = elem.find('#accordion');
        console.log("email: " + email.html());
        email.accordion({ active: 2, collapsible: true });
      }
    };
  });
