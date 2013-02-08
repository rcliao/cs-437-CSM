'use strict';

/* Controllers */

function MainCtrl($scope) {
}

function MenuCtrl($scope) {

}

function GETMenuCtrl($scope) {
}

function GETHoldsCtrl($scope, Resources) {
	$scope.holds = [{"from": "Library Fee", "content": "$5.00"},
					{"from": "Writing Center", "content": "WPE"}];
}

function AnnoCtrl($scope, Resources) {
	$scope.announcements = Resources.query({collection: 'announcements'});
}

function AnnoNewCtrl(Resources, $routeParams, $scope) {
    $scope.announcement = new Resources();
    
    $scope.save = function () {
        Resources.save({collection: 'announcements'}, $scope.announcement, function (res) { if (res.ok === 1) { $location.path("/anno");}})
		$scope.announcement.head = ''
		$scope.announcement.content = ''
    };
}

function LoginController ($scope, $http, $location, $rootScope, $cookieStore, AuthService) {
    $scope.login = function() {
      $http.post('auth/login', {"username": $scope.username, "password": $scope.password}).success(function() {
        AuthService.loginConfirmed($scope.username);
      });
    };
	
	$scope.logout = function() {
      $http.post('auth/logout').success(function() {
        $scope.status ='guest';
		    $cookieStore.remove("user");
      });
    };
}

  function GradesCtrl($scope, Resources) {
  $scope.grades = [{'term': 'Spring / 2013', 'values':{'class': 'CS 437', 'description': 'Senior Software Design', 'grade': 'A+'}},
          {'term': 'Winter / 2013', 'values':{'class': 'CS 520', 'description': 'Senior Web Design', 'grade': 'S'}}];
          
  $scope.terms = [{"key": "key1", "value": "Winter / 2013"},
          {"key": "key2", "value": "Spring / 2013"},
          {"key": "key3", "value": "Summer / 2013"},
          {"key": "key4", "value": "Fall / 2013"}];
  
  $scope.SelectedTerm = $scope.terms[0];
}

function financialAidController($scope) {
	$scope.financialAids = [
	{
		"description": "PELL GRANT F/W/SP",
		"category": "Grant",
		"offered": "1234.56",
		"accepted": "1234.56"
	},
	{
		"description": "BOSS Award",
		"category": "Scholarship",
		"offered": "13.77",
		"accepted": "13.77"
	}
  ];
}

function MailCtrl($scope, Resources) {
}

function InboxMailCtrl($scope, $cookieStore, Resources) {
	$scope.username = $cookieStore.get("user");
	$scope.emails = Resources.query({collection: 'inbox'});
}

function SentMailCtrl($scope, $cookieStore, Resources) {
  $scope.emails = Resources.query({collection: 'sent'});
}