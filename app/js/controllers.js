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
	$scope.announcements = [{"head":"LEAP 2013 Leadership In Action Program (6/17 -8/9)", " content" : "Application Deadline: 3/12"},
							 {" head" : "The AAAS Scholars Lecture Series Winter 2013 Lecture" , " content" : " 12-1:30pm, 3/13, USU LA RoomB)"},
							 {" head" : "SCREENING OF AUTUMN GEM" , " content" : "A Documentary on Modern China’s First Feminist April 21, 2013, 1:30-3:30 P.M. University-Student Union, Pasadena Room 307"},
							 {" head" : "CSU Employee Update:", " content": "Number of CSU Donors Increases in 2011-12"}]
}

function AnnoNewCtrl(Resources, $routeParams, $scope, $location) {
    $scope.announcement = new Resources();
    
    $scope.save = function () {
        Resources.save({collection: 'announcements'}, $scope.announcement, function (res) { if (res.ok === 1) { $location.path("/anno");}});
		$scope.announcement.head = '';
		$scope.announcement.content = '';
    };
}

function MainController ($scope, $route, $http, $location, $rootScope, $cookieStore, AuthService) {
    $scope.$route = $route;

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
					{'term': 'Spring / 2013', 'values':{'class': 'CS 320', 'description': 'Web and Internet Programming', 'grade': 'A'}}
					{'term': 'Fall / 2013', 'values':{'class': 'CS 470', 'description': 'Computer Networking Protocols', 'grade': 'A+'}},
					{'term': 'Winter / 2013', 'values':{'class': 'CS 312', 'description': 'Data Structures and Algorithms', 'grade': 'B'}}];
					{'term': 'Winter / 2013', 'values':{'class': 'CS 520', 'description': 'Advanced Web Programming', 'grade': 'B'}}];
          
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

function MailDetailCtrl($scope, $routeParams, Resources) {
	$scope.emailID = $routeParams.emailID;

	$scope.email = Resources.get({collection: 'inbox', _id: $scope.emailID});
}

function MailSendCtrl($scope, $routeParams, Resources) {
	
}

function GeneralSchCtrl($scope, $http) {
	$http.get('sampledata/courses.json').success(function(data) {
		$scope.courses = data;
	});
}

function ParkingMenuCtrl($scope, $http) {
	
}

function GMapCtrl($scope, $http) {
	$http.get('data/maps').success(function(data) {
		$scope.map = data;
	});
}