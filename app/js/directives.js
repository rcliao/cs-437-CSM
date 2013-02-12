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
  directive('calendarHolder', function() {
    return {
      restrict: 'C',
      link: function(scope, elem, attrs) {
        var calendar = elem.find('#calendar');

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        
        console.log("calendar: " + calendar.html());
        calendar.fullCalendar({
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
          },
          editable: true,
          events: [
            {
              title: 'All Day Event',
              start: new Date(y, m, 1)
            },
            {
              title: 'Long Event',
              start: new Date(y, m, d-5),
              end: new Date(y, m, d-2)
            },
            {
              id: 999,
              title: 'Repeating Event',
              start: new Date(y, m, d-3, 16, 0),
              allDay: false
            },
            {
              id: 999,
              title: 'Repeating Event',
              start: new Date(y, m, d+4, 16, 0),
              allDay: false
            },
            {
              title: 'Meeting',
              start: new Date(y, m, d, 10, 30),
              allDay: false
            },
            {
              title: 'Lunch',
              start: new Date(y, m, d, 12, 0),
              end: new Date(y, m, d, 14, 0),
              allDay: false
            },
            {
              title: 'Birthday Party',
              start: new Date(y, m, d+1, 19, 0),
              end: new Date(y, m, d+1, 22, 30),
              allDay: false
            },
            {
              title: 'Click for Google',
              start: new Date(y, m, 28),
              end: new Date(y, m, 29),
              url: 'http://google.com/'
            }
          ]
        });
      }
    };
  }).
  directive('emailsHolder', function() {
    return {
      restrict: 'C',
      link: function(scope, elem, attrs) {
        var email = elem.find('#accordion');
        email.accordion({ active: 2, collapsible: true });
      }
    };
  });
