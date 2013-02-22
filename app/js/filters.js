'use strict';

/* Filters */
angular.module('csm.filters', []).
	filter('checkSpot', function() {
		return function(input, scope) {
			var output = {};
			$.each( input, function(k,v)
			{
				if( 'Taken' != v.beTaken )
					output[k] = input[k];
			});
			return output;
		};
	});
