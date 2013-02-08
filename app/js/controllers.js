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
    }
}

function LoginController ($scope, $http, $location, $rootScope, $cookieStore, AuthService) {
	$scope.something = ['something'];
	$scope.status = 'guest';
    $scope.login = function() {
      $http.post('auth/login').success(function() {
        AuthService.loginConfirmed($scope.username);
     });
  };
	
	$scope.$on('event:auth-loginConfirmed', function() {
         $scope.status = $cookieStore.get("user") + ' logged in ';
  });
	
	$scope.$on('event:auth-loginRequired', function() {
         $scope.status = ' log in required ';
 });
	
	$scope.logout = function() {
      $http.post('auth/logout').success(function() {
      $cookieStore.remove("user");
        $scope.status = $cookieStore.get("user") + ' logged out ';
      });
  };
	
	$scope.restrictedAction = function() {
      $http.get('data/protected').success(function(response) {
        // this piece of code will not be executed until user is authenticated
        $scope.something.push(response);
      });
  };

  function GradesCtrl($scope, Resources) {
  $scope.grades = [{'term': 'Spring / 2013', 'values':{'class': 'CS 437', 'description': 'Senior Software Design', 'grade': 'A+'}},
          {'term': 'Winter / 2013', 'values':{'class': 'CS 520', 'description': 'Senior Web Design', 'grade': 'S'}}];
          
  $scope.terms = Resources.query({collection: 'terms'}, 
    function(res) {
      $scope.SelectedTerm = res[0];
    }
  );
  
  $scope.SelectedTerm;
}