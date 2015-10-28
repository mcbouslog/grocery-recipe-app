(function() {
  "use strict";

  angular.module("app")
  	
	.factory('Groceries', ['$http', function GroceriesFactory($http) {
		return {
			all: function() {
				return $http({method: 'GET', url: '/api/v1/api_groceries.json'});
			},
			create: function(userGroceries) {
				return $http({method: 'POST', url: '/api/v1/api_groceries', data: userGroceries});
			}
		};
	}]);

}());
