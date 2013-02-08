'use strict';

// practice to add module for route control as store
angular.module('csm', ['csm.services', 'ngCookies', 'csm.directives']).
	config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/login', {templateUrl: 'partials/login.html',   controller: LoginController}).
		when('/main', {templateUrl: 'partials/menu.html',   controller: MenuCtrl}).
		when('/announcement', {templateUrl: 'partials/announcement.html',   controller: AnnoCtrl}).
		when('/announcementBack', {templateUrl: 'partials/announcementBack.html',   controller: AnnoNewCtrl}). 
		when('/GET-Menu', {templateUrl: 'partials/GET-Menu.html',   controller: GETMenuCtrl}).
		when('/GET-Holds', {templateUrl: 'partials/GET-Holds.html',   controller: GETHoldsCtrl}).
		otherwise({redirectTo: '/main'});
}]);
