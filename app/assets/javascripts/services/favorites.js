(function() {
  "use strict";

  angular.module("app")
  	
	.factory('Favorites', ['$http', function FavoritesFactory($http) {
		return {
			all: function() {
				return $http({method: 'GET', url: '/api/v1/api_searches/min_fav_recipes.json'});
			}
		};
	}]);

}());
