'use strict';

/* Controllers */
function LoginCtrl($scope) {
	
}

function MainCtrl($scope) {
}

function MenuCtrl($scope) {

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

function LoginController ($scope, $http, authService) {
	$scope.something = ['something'];
	$scope.status = 'logout';
    $scope.login = function() {
      $http.post('auth/login').success(function() {
        authService.loginConfirmed();
      });
    }
	
	$scope.$on('event:auth-loginConfirmed', function() {
         $scope.status = ' logged in ';
    });
	
	$scope.logout = function() {
      $http.post('auth/logout').success(function() {
        $scope.status = ' logged out ';
      });
    }
	
	$scope.restrictedAction = function() {
      $http.post('data/protected', $scope.content).success(function(response) {
        // this piece of code will not be executed until user is authenticated
        $scope.something.push(response);
      });
    }
}

function ContentController ($scope, $http) {

    $scope.publicContent = [];
    $scope.restrictedContent = [];

    $scope.publicAction = function() {
      $http.post('data/public', $scope.publicData).success(function(response) {
        $scope.publicContent.push(response);
      });
    }

    $scope.restrictedAction = function() {
      $http.post('data/protected', $scope.restrictedData).success(function(response) {
        // this piece of code will not be executed until user is authenticated
        $scope.restrictedContent.push(response);
      });
    }

    $scope.logout = function() {
      $http.post('auth/logout').success(function() {
        $scope.restrictedContent = [];
      });
    }
}