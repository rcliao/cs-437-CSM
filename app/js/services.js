/* http://docs.angularjs.org/#!angular.service */


/**
Rest API - Node/MongoDB/Angular

- Read a document (default in Angular)
    .get: param "_id"

- Insert/Update (default in Angular)
    .save postData $scope.doc
    =>  If the document don't have an "_id", the document is inserted and "_id" is create by ObjectId
        If the document have "_id" but this don't exist in database, the document is inserted and a custon "_id" is created
        Otherwise the document is updated

- Delete (default in Angular)
    .delete: param "_id"

- Simmple querys:  (default in Angular) http://www.mongodb.org/display/DOCS/Querying
    .query: param {}
    .query: param { name : "xxx", limit:10, skip:15, sort:"age", order:"asc" || "desc"} 
    => default in Angular

- Advanced querys: http://www.mongodb.org/display/DOCS/Advanced+Queries 
    .find:  postData = {'age': {'$lt":5, '$gt':3}}

- Aggregation querys: http://www.mongodb.org/display/DOCS/Aggregation
    .count:  no postData
    .distinct: postData = { key: "key" } Ex: {key: "carrier"}
    .group: postData Ex.{keys: {carrier:true },   cond: {}, 
                        initial: {sum: 0, count:0, max:0, avg:0}, 
                        reduce: "function(doc,out){out.sum += doc.age; out.count += 1; out.max = Math.max(out.max, doc.age); out.avg = out.sum/out.count;}"}

- MapReduce querys: http://www.mongodb.org/display/DOCS/MapReduce 
    .mapReduce': postData = {   map : <mapfunction string>, 
                                reduce : <reducefunction string>,  
                                options: { 
                                    [query : <query filter object>], 
                                    [sort : <sorts the input objects using this key>]
                                    [limit : <number of objects to return from collection>], 
                                    [finalize : <finalizefunction>]
                                    [scope : <object where fields go into javascript global scope >]
                            }}
                 Ex. { "map": "function(){emit(this.details.android.os, 1);}", 
                       "reduce": "function(key, values){return values.length;}"  }
                 
- Aggregate framework (MongoDB 2.1): http://www.mongodb.org/display/DOCS/Aggregation+Framework
    .aggregate: postData = { <query aggregate expresion> }

**/


angular.module('csm.services', ['ngResource']).
    factory('Resources', ['$resource', '$http',
        function($resource, $http) {
            return $resource('api/:collection/:_id', {}, {
                'count': {method:'PUT', params:{_id: 'count'}},                           
                'distinct': {method:'PUT', params:{_id: 'distinct'}},      
                'find': {method:'PUT', params:{_id: 'find'}, isArray:true},              
                'group': {method:'PUT', params:{_id: 'group'}, isArray:true},            
                'mapReduce': {method:'PUT', params:{_id: 'mapReduce'}, isArray:true} ,  
                'aggregate': {method:'PUT', params:{_id: 'aggregate'}, isArray:true}   
            });
        }
    ]).
  	factory('AuthService', function($rootScope, $cookieStore) {
  	var authServices = {};
  	
  	authServices.loginConfirmed = function(username) {
  		$cookieStore.put("user", username);
  		$rootScope.$broadcast('event:auth-loginConfirmed');
  	};

  	return authServices;
  	}).
  	config(function($httpProvider) {
      
      var interceptor = ['$rootScope', '$q', function($rootScope, $q) {
        function success(response) {
          return response;
        }
   
        function error(response) {
          if (response.status === 401) {
            var deferred = $q.defer();
            $rootScope.$broadcast('event:auth-loginRequired');
            return deferred.promise;
          }
          // otherwise
          return $q.reject(response);
        }
   
        return function(promise) {
          return promise.then(success, error);
        };
   
      }];
      $httpProvider.responseInterceptors.push(interceptor);
    }).
    factory('Staging', function () {
      
      var parkingLot1 = {
          "100":{
                "lotNumber" : "p1",
                "spaceNumber" : 0,
                "permitType" : "Student",
                "handicap" : 1,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "101":{
                "lotNumber" : "p1",
                "spaceNumber" : 1,
                "permitType" : "Student",
                "handicap" : 1,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "102":{
                "lotNumber" : "p1",
                "spaceNumber" : 2,
                "permitType" : "Faculty",
                "handicap" : 1,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "103":{
                "lotNumber" : "p1",
                "spaceNumber" : 3,
                "permitType" : "Faculty",
                "handicap" : 1,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "104":{
                "lotNumber" : "p1",
                "spaceNumber" : 4,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "105":{
                "lotNumber" : "p1",
                "spaceNumber" : 5,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "106":{
                "lotNumber" : "p1",
                "spaceNumber" : 6,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "107":{
                "lotNumber" : "p1",
                "spaceNumber" : 7,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "108":{
                "lotNumber" : "p1",
                "spaceNumber" : 8,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "109":{
                "lotNumber" : "p1",
                "spaceNumber" : 9,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "110":{
                "lotNumber" : "p1",
                "spaceNumber" : 10,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "111":{
                "lotNumber" : "p1",
                "spaceNumber" : 11,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "112":{
                "lotNumber" : "p1",
                "spaceNumber" : 12,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "113":{
                "lotNumber" : "p1",
                "spaceNumber" : 13,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "114":{
                "lotNumber" : "p1",
                "spaceNumber" : 14,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "115":{
                "lotNumber" : "p1",
                "spaceNumber" : 15,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "116":{
                "lotNumber" : "p1",
                "spaceNumber" : 16,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "117":{
                "lotNumber" : "p1",
                "spaceNumber" : 17,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "118":{
                "lotNumber" : "p1",
                "spaceNumber" : 18,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Taken"
          },
          "119":{
                "lotNumber" : "p1",
                "spaceNumber" : 19,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          }
      };

      var parkingLot2 = {
          "200":{
                "lotNumber" : "p2",
                "spaceNumber" : 0,
                "permitType" : "Student",
                "handicap" : 1,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "201":{
                "lotNumber" : "p2",
                "spaceNumber" : 1,
                "permitType" : "Student",
                "handicap" : 1,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "202":{
                "lotNumber" : "p2",
                "spaceNumber" : 2,
                "permitType" : "Faculty",
                "handicap" : 1,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "203":{
                "lotNumber" : "p2",
                "spaceNumber" : 3,
                "permitType" : "Faculty",
                "handicap" : 1,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "204":{
                "lotNumber" : "p2",
                "spaceNumber" : 4,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "205":{
                "lotNumber" : "p2",
                "spaceNumber" : 5,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "206":{
                "lotNumber" : "p2",
                "spaceNumber" : 6,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "207":{
                "lotNumber" : "p2",
                "spaceNumber" : 7,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "208":{
                "lotNumber" : "p2",
                "spaceNumber" : 8,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "209":{
                "lotNumber" : "p2",
                "spaceNumber" : 9,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "210":{
                "lotNumber" : "p2",
                "spaceNumber" : 10,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "211":{
                "lotNumber" : "p2",
                "spaceNumber" : 11,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "212":{
                "lotNumber" : "p2",
                "spaceNumber" : 12,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "213":{
                "lotNumber" : "p2",
                "spaceNumber" : 13,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "214":{
                "lotNumber" : "p2",
                "spaceNumber" : 14,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "215":{
                "lotNumber" : "p2",
                "spaceNumber" : 15,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "216":{
                "lotNumber" : "p2",
                "spaceNumber" : 16,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "217":{
                "lotNumber" : "p2",
                "spaceNumber" : 17,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "218":{
                "lotNumber" : "p2",
                "spaceNumber" : 18,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "219":{
                "lotNumber" : "p2",
                "spaceNumber" : 19,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          }
      };

      var parkingLot3 = {
          "300":{
                "lotNumber" : "p3",
                "spaceNumber" : 0,
                "permitType" : "Student",
                "handicap" : 1,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "301":{
                "lotNumber" : "p3",
                "spaceNumber" : 1,
                "permitType" : "Student",
                "handicap" : 1,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "302":{
                "lotNumber" : "p3",
                "spaceNumber" : 2,
                "permitType" : "Faculty",
                "handicap" : 1,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "303":{
                "lotNumber" : "p3",
                "spaceNumber" : 3,
                "permitType" : "Faculty",
                "handicap" : 1,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "304":{
                "lotNumber" : "p3",
                "spaceNumber" : 4,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "305":{
                "lotNumber" : "p3",
                "spaceNumber" : 5,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "306":{
                "lotNumber" : "p3",
                "spaceNumber" : 6,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "307":{
                "lotNumber" : "p3",
                "spaceNumber" : 7,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "308":{
                "lotNumber" : "p3",
                "spaceNumber" : 8,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "309":{
                "lotNumber" : "p3",
                "spaceNumber" : 9,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "310":{
                "lotNumber" : "p3",
                "spaceNumber" : 10,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "311":{
                "lotNumber" : "p3",
                "spaceNumber" : 11,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "312":{
                "lotNumber" : "p3",
                "spaceNumber" : 12,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "313":{
                "lotNumber" : "p3",
                "spaceNumber" : 13,
                "permitType" : "Student",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "314":{
                "lotNumber" : "p3",
                "spaceNumber" : 14,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "315":{
                "lotNumber" : "p3",
                "spaceNumber" : 15,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "316":{
                "lotNumber" : "p3",
                "spaceNumber" : 16,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "317":{
                "lotNumber" : "p3",
                "spaceNumber" : 17,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "318":{
                "lotNumber" : "p3",
                "spaceNumber" : 18,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          },
          "319":{
                "lotNumber" : "p3",
                "spaceNumber" : 19,
                "permitType" : "Faculty",
                "handicap" : 0,
                "meter" : 0,
                "beTaken" : "Empty"
          }
      };

      var parkingInfo = [
        {'id': 'p1','name':'Lot 1', 'sign': '$ M P H', 'space':7,'capacity':20},
        {'id': 'p2', 'name':'Lot 2', 'sign': '$ M P H', 'space':20,'capacity':20},
        {'id': 'p3', 'name':'Lot 3', 'sign': '$ M P H', 'space':20,'capacity':20}
      ];

      return {
        put: function(item, parkingID) {
          if (parkingID == 'p1')
            parkingLot1 = item;
          else if (parkingID == 'p2')
            parkingLot2 = item;
          else if (parkingID == 'p3')
            parkingLot3 = tiem;
        },
        get: function(parkingID) {
          if (parkingID == 'p1')
            return parkingLot1;
          else if (parkingID == 'p2')
            return parkingLot2;
          else if (parkingID == 'p3')
            return parkingLot3;
          else
            return [];
        },
        getInfo: function() {
          return parkingInfo;
        },
        putInfo: function(item) {
          parkingInfo = item;
        }
      };
    });

