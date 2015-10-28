(function() {
  "use strict";

  angular.module("app")
  	
	.factory('Ingredients', ['$http', function IngredientsFactory($http) {
		return {
			all: function() {
				return $http({method: 'GET', url: '/api/v1/api_ingredients/search_all.json'});
			},
			find: function() {
				return $http({method: 'GET', url: '/api/v1/api_ingredients/active.json'});
			}
		};
	}]);

}());
