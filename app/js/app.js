'use strict';

// practice to add module for route control as store
angular.module('csm', ['csm.services', 'ngCookies', 'ngSanitize', 'csm.directives']).
	config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/login', {templateUrl: 'partials/login.html',   controller: MainController}).
		when('/main', {templateUrl: 'partials/menu.html',   controller: MenuCtrl}).
		when('/announcement', {templateUrl: 'partials/announcement.html',   controller: AnnoCtrl}).
		when('/announcementBack', {templateUrl: 'partials/announcementBack.html',   controller: AnnoNewCtrl}). 
		when('/GET-Menu', {templateUrl: 'partials/GET-Menu.html',   controller: GETMenuCtrl}).
		when('/GET-Holds', {templateUrl: 'partials/GET-Holds.html',   controller: GETHoldsCtrl}).
		when('/grades', {templateUrl: 'partials/grades.html',   controller: GradesCtrl}).
		when('/financialAid', {templateUrl: 'partials/financialAid.html',   controller: financialAidController}).
		when('/email', {templateUrl: 'partials/mail.html',   controller: MailCtrl}).
		when('/email/inbox', {templateUrl: 'partials/inbox.html', controller: InboxMailCtrl}).
		when('/email/inbox/:emailID', {templateUrl: 'partials/mail-detail.html', controller: MailDetailCtrl}).
		when('/email/sent', {templateUrl: 'partials/inbox.html', controller: SentMailCtrl}).
		otherwise({redirectTo: '/main'});
}]);
