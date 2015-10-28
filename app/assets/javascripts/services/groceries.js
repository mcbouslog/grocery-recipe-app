(function() {
  "use strict";

  angular.module("app")
  	
	.factory('Groceries', ['$http', function GroceriesFactory($http) {
		return {
			all: function() {
				return $http({method: 'GET', url: '/api/v1/api_groceries.json'});
			}
		};
	}]);

}());
