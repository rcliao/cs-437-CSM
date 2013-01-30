'use strict';

/* Directives */

angular.module('csm.directives', []).
	directive('authDemoApplication', function() {
    return {
      restrict: 'C',
      link: function(scope, elem, attrs) {
        //once Angular is started, remove class:
        //elem.removeClass('waiting-for-angular');
        
        var login = elem.find('.login-container');
        var main = elem.find('.content');
        
        login.hide();
        
        scope.$on('event:auth-loginRequired', function() {
			console.log("login-required");
            login.show();
			main.hide();
        });
        scope.$on('event:auth-loginConfirmed', function() {
          main.show();
          login.hide();
        });
      }
    }
  });
