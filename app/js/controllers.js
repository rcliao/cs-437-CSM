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
