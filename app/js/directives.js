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
        var parkingInstruction = elem.find('#parking-instruction');

        login.hide();
        parkingInstruction.hide();

        scope.$on('event:parkingUp', function() {
          parkingInstruction.dialog({
            width: 250,
            height: 300,
            modal: true
          });
        });
        
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
              start: new Date(y, m, d-1, 18, 0),
              end: new Date(y, m, d-1, 21, 40),
              allDay: false
            },
            {
              id: 999,
              title: 'CS 450 @ ET-310',
              start: new Date(y, m, d-3, 9, 50),
              end: new Date(y, m, d-3, 11, 30),
              allDay: false
            },
            {
              id: 999,
              title: 'CS 450 @ ET-310',
              start: new Date(y, m, d-1, 9, 50),
              end: new Date(y, m, d-1, 11, 30),
              allDay: false
            },
            {
              title: 'CS Senior Design Meeting @ ET-309',
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
              title: 'CS 437 @ ET-210',
              start: new Date(y, m, d, 18, 10),
              end: new Date(y, m, d, 20, 40),
              allDay: false
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
        var map;

        var routeClear = elem.find('#routeClear');
        var routeGo = elem.find('#routeGo');
        var routeMode = elem.find('#routeMode');
        var routeTo = elem.find('#routeTo');
        var routeFrom = elem.find('#routeFrom');

        var myOptions = {
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(34.06337000000001, -118.170510)
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById("directions"));

        routeMode.on("change", function() { calcRoute(); });
        routeGo.on("click", function() { calcRoute(); });
        routeClear.on("click", function() { directionsDisplay.setDirections({ routes: [] }); });

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(34.0653700000001, -118.165010),
          map: map
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, this);
        });

        var marker2 = new google.maps.Marker({
          position: new google.maps.LatLng(34.0699944005297, -118.16820734443665),
          map: map
        });

        google.maps.event.addListener(marker2, 'click', function() {
          infowindow2.open(map, this);
        });

        var marker3 = new google.maps.Marker({
          position: new google.maps.LatLng(34.0658195014605, -118.17142599525452),
          map: map
        });

        google.maps.event.addListener(marker3, 'click', function() {
          infowindow3.open(map, this);
        });

        var content = '<strong>Parking Lot 1</strong>';

        var infowindow = new google.maps.InfoWindow({
          content: content
        });

        var content2 = '<strong>Parking Lot 2</strong>';

        var infowindow2 = new google.maps.InfoWindow({
          content: content2
        });

        var content3 = '<strong>Parking Lot 3</strong>';

        var infowindow3 = new google.maps.InfoWindow({
          content: content3
        });

        // navigator.geolocation.getCurrentPosition(
        //   function( position ){

        //     // Check to see if there is already a location.
        //     // There is a bug in FireFox where this gets
        //     // invoked more than once with a cahced result.

        //     // Log that this is the initial position.
        //     console.log( "Initial Position Found" );

        //     // Add a marker to the map using the position.
        //     var myOptions = {
        //         zoom: 14,
        //         mapTypeId: google.maps.MapTypeId.ROADMAP,
        //         center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        //     };

        //     map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        //   },
        //   function( error ){
        //     console.log( "Something went wrong: ", error );
        //     },
        //     {
        //         timeout: (5 * 1000),
        //         maximumAge: (1000 * 60 * 15),
        //         enableHighAccuracy: true
        //     }
        // );

        function calcRoute() {
            var request = {
                origin: routeFrom.val(),
                destination: new google.maps.LatLng(34.0658195014605, -118.17142599525452),
                travelMode: google.maps.TravelMode[routeMode.val()]
            };
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        }
      }
    };
  }).
  // Register the 'myCurrentTime' directive factory method.
  // We inject $timeout and dateFilter service since the factory method is DI.
  directive('myCurrentTime', function($timeout, dateFilter) {
    // return the directive link function. (compile function not needed)
    return function(scope, element, attrs) {
      var format,  // date format
          timeoutId; // timeoutId, so that we can cancel the time updates
 
      // used to update the UI
      function updateTime() {
        element.text(dateFilter(new Date(), format));
      }
 
      // watch the expression, and update the UI on change.
      scope.$watch(attrs.myCurrentTime, function(value) {
        format = value;
        updateTime();
      });
 
      // schedule update in one second
      function updateLater() {
        // save the timeoutId for canceling
        timeoutId = $timeout(function() {
          updateTime(); // update DOM
          updateLater(); // schedule another update
        }, 1000);
      }
 
      // listen on DOM destroy (removal) event, and cancel the next UI update
      // to prevent updating time ofter the DOM element was removed.
      element.bind('$destroy', function() {
        $timeout.cancel(timeoutId);
      });
 
      updateLater(); // kick off the UI update process.
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
