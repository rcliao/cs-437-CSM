'use strict';

/* Filters */
angular.module('csm.filters', []).
	filter('checkspot', function() {
		return function(input, parkingID) {
			if (input.lotNumber == parkingID)
				return input;
			else return null;
		};
	});
