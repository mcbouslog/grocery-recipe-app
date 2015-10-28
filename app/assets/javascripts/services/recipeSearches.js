function() {
  "use strict";

  angular.module("app")
  	
	.factory('RecipeSearches', ['$http', function RecipeSearchesFactory($http) {
		return {
			create: function(searchQuery) {
				return $http({method: 'POST', url: '/api/v1/api_searches.json', data: searchQuery});
			}
		};
	}]);

}());
