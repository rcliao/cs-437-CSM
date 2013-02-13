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
              title: 'Orientation with CS Senior Design Project',
              start: new Date(y, m, 1)
            },
            {
              title: 'CS 470',
              start: new Date(y, m, d-5),
              end: new Date(y, m, d-2)
            },
            {
              id: 999,
              title: 'CS 450',
              start: new Date(y, m, d-3, 16, 0),
              allDay: false
            },
            {
              id: 999,
              title: 'CS 320',
              start: new Date(y, m, d+4, 16, 0),
              allDay: false
            },
            {
              title: 'CS Senior Design Meeting',
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
              title: 'Meeting with CS Department',
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
  directive('mapHolder', function() {
    return {
      restrict: 'C',
      link: function(scope, elem, attrs) {
        var directionsDisplay = new google.maps.DirectionsRenderer({ draggable: true });
        var directionsService = new google.maps.DirectionsService();

        var routeClear = elem.find('#routeClear');
        var routeGo = elem.find('#routeGo');
        var routeMode = elem.find('#routeMode');
        var routeTo = elem.find('#routeTo');
        var routeFrom = elem.find('#routeFrom');

        var myOptions = {
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(35.270, -80.837)
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById("directions"));
        
        routeMode.on("change", function() { calcRoute(); });
        routeGo.on("click", function() { calcRoute(); });
        routeClear.on("click", function() { directionsDisplay.setDirections({ routes: [] }); });
        
        function calcRoute() {
            var request = {
                origin: routeTo.val(),
                destination: routeFrom.val(),
                travelMode: google.maps.TravelMode[routeMode.val()]
            };
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }
      }
    }
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
