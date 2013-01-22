'use strict';

// practice to add module for route control as store
angular.module('csm', []).
	config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/login', {templateUrl: 'partials/login.html',   controller: LoginCtrl}).
		when('/main', {templateUrl: 'partials/menu.html',   controller: MenuCtrl}).
		when('/announcement', {templateUrl: 'partials/announcement.html',   controller: AnnoCtrl}).
		otherwise({redirectTo: '/main'});
}]);
