'use strict';

/* Controllers */

function MainCtrl($scope) {
}

function MenuCtrl($scope, Resources) {
	$scope.newMail = Resources.get({collection: 'emailcount', _id: 'inbox'});
}

function GETMenuCtrl($scope) {
}

function AnnoCtrl($scope, Resources, $routeParams) {
	$scope.announcements = [
	{"name":"annon1","head":"LEAP 2013 Leadership In Action Program (6/17 -8/9)", "content" : "Application Deadline: 3/12", "details":"International Leadership Foundation (ILF) L.A. Chapter will be hosting a half day of leadership workshop on March 16th at Almansor Court in Alhambra, located on 700 S. Almansor Street, Alhambra, CA 91801. This workshop is intended for the students from the age of 15-20, who are interested in becoming a 21st century leader"},
	{"name":"annon2","head": "The AAAS Scholars Lecture Series Winter 2013 Lecture" , "content" : " 12-1:30pm, 3/13, USU LA RoomB)", "details":"Chinese American Museum (Los Angeles) Executive Director Dr. Michael Duchemin, Curator Steven Y. Wong, and Education Programs Maneger Michael Truong will discuss the history of Chinese Americans in Los Angeles and their effort in preserve and present such an important past."},
	{"name":"annon3","head" : "SCREENING OF AUTUMN GEM" , "content" : "A Documentary on Modern China’s First Feminist April 21, 2013, 1:30-3:30 P.M. University-Student Union","details":"Free Admission, University-Student Union, Pasadena Room 307, Refreshments will be served."},
	{"name":"annon4","head" : "CSU Employee Update", "content": "Number of CSU Donors Increases in 2011-12","details":"The California State University Employee Update Thursday, January 24, 2013 From The Office of the President Number of CSU Donors Increases in 2011-12 A rise in individual donations from alumni, parents, faculty, staff, students and friends sustained level year-to-year giving to the CSU, according to the Philanthropic Annual Reportpresented to the CSU Board of Trustees this week."}
							]
						 
	$scope.announcementName = $routeParams.announcementName;
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

    $scope.parkingPopUp = function() {
		$rootScope.$broadcast('event:parkingUp');
	};
}

  function GradesCtrl($scope, Resources) {
  $scope.grades = [{'term': 'Spring / 2013', 'values':{'class': 'CS 437', 'description': 'Senior Software Design', 'grade': 'A+'}},
					{'term': 'Spring / 2013', 'values':{'class': 'CS 320', 'description': 'Web and Internet Programming', 'grade': 'A'}},
					{'term': 'Fall / 2013', 'values' :{'class': 'CS 470', 'description': 'Computer Networking Protocols', 'grade': 'A+'}},
					{'term': 'Winter / 2013', 'values':{'class': 'CS 312', 'description': 'Data Structures and Algorithms', 'grade': 'B'}},
					{'term': 'Winter / 2013', 'values':{'class': 'CS 520', 'description': 'Advanced Web Programming', 'grade': 'B'}}];
          
  $scope.terms = [{"key": "key1", "value": "Winter / 2013"},
          {"key": "key2", "value": "Spring / 2013"},
          {"key": "key3", "value": "Summer / 2013"},
          {"key": "key4", "value": "Fall / 2013"}];
  
  $scope.SelectedTerm = $scope.terms[0];
}

function financialAidController($scope, $http) {
	$http.get('sampledata/financialAid.json').success(function(data) {
		$scope.financialAids = data;
	});
	
	$scope.declineAid=function(){$scope.financialAids.splice(0,1)};
}

function MailCtrl($scope, Resources) {
}

function InboxMailCtrl($scope, $cookieStore, Resources) {
	$scope.title = 'Inbox';
	$scope.username = $cookieStore.get("user");
	$scope.emails = Resources.query({collection: 'inbox'});
}

function SentMailCtrl($scope, $cookieStore, Resources) {
	$scope.title = 'Sent';
	$scope.emails = Resources.query({collection: 'sent'});
}

function TrashMailCtrl($scope, $cookieStore, Resources) {
	$scope.title = 'Trash';
	$scope.emails = Resources.query({collection: 'trash'});
}

function MailDetailCtrl($scope, $routeParams, Resources) {
	$scope.emailID = $routeParams.emailID;

	$scope.email = Resources.get({collection: 'inbox', _id: $scope.emailID});
}

function MailSendCtrl($scope, $routeParams, Resources) {
	$scope.email = {'from':"cs437test@gmail.com"};
	
	$scope.sendEmail = function() {
		Resources.save({collection:'email', _id:'sendMail'}, $scope.email);
	};
}

function GeneralSchCtrl($scope, $http) {
	$http.get('sampledata/courses.json').success(function(data) {
		$scope.courses = data;
	});
}

function ParkingMenuCtrl($scope, $http, $routeParams) {
	$scope.parkings = [
	{'id': 'p1','name':'Lot 1', 'sign': '$ M P H', 'space':6,'capacity':20}, {'id': 'p2', 'name':'Lot 2', 'sign': '$ M P H', 'space': 9,'capacity':50}, {'id': 'p3', 'name':'Lot 3', 'sign': '$ M P H', 'space':20,'capacity':40}
	];

	$http.get('sampledata/parkingStructure.json').success(
		function(data) {
			$scope.spots = data;
		}
	);

	$scope.parkingID = $routeParams.parkingID;

	$scope.format = 'h:mm:ss a';

	$scope.Empty = 'Empty';
}

function GMapCtrl($scope, $http) {
}

function GETHoldsCtrl($scope, $http) {
	$http.get('sampledata/holds.json').success(function(data) {
		$scope.holds = data;
	});
}