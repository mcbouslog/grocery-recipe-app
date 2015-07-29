(function() {
  "use strict";

  angular.module("app").controller("recipesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_groceries.json').then(function(response) {
        
        $scope.groceries = response.data;

        $scope.userIngredients = {};
        for (var i = 0; i < $scope.groceries.length; i++) {
          if ($scope.groceries[i].current_user === true) {
            for (var j = 0; j < $scope.groceries[i].ingredients.length; j++) {
              $scope.userIngredients[$scope.groceries[i].ingredients[j].ingredient_description] = $scope.groceries[i].description;
            };
          };
        };

        $scope.showResults = false;

      });
    };

    $scope.recipeSearch = function(ingredientOne, ingredientTwo, ingredientThree, searchTerm) {

      if ($scope.showResults != true) {
            $scope.showResults = true;
          };

      var searchStringVar = "";

      if (ingredientOne !== undefined && ingredientOne.length !== 0) {
        searchStringVar = searchStringVar.concat(ingredientOne);
      };
      if (ingredientTwo !== undefined && ingredientTwo.length !== 0) {
        searchStringVar = searchStringVar.concat("+",ingredientTwo);
      };
      if (ingredientThree !== undefined && ingredientThree.length !== 0) {
        searchStringVar = searchStringVar.concat("+",ingredientThree);
      };
      if (searchTerm !== undefined && searchTerm.length !== 0) {
        searchStringVar = searchStringVar.concat("+",searchTerm);
      };
      
      var searchStringHash = {
        searchString: searchStringVar.replace(/ /g,"+")
      };

      $http.post('/api/v1/api_searches.json', searchStringHash).then(function(response) {
          
        $scope.searchResults = response.data;
        $scope.attribution = $scope.searchResults["attribution"]["html"];
        $scope.matches = $scope.searchResults["matches"];
        
        $scope.filterCuisineCourse = function(matches) {
        
          $scope.cuisines = [];
          $scope.courses = [];
          
          for (var l = 0; l < matches.length; l++) {
            if (matches[l]["attributes"] !== undefined) {
              if (matches[l]["attributes"]["cuisine"] !== undefined) {
                for (var m = 0; m < matches[l]["attributes"]["cuisine"].length; m++) {
                  if ($scope.cuisines.indexOf(matches[l]["attributes"]["cuisine"][m]) == -1) {
                    $scope.cuisines.push(matches[l]["attributes"]["cuisine"][m]);
                  };
                };
              };
              if (matches[l]["attributes"]["course"] !== undefined) {
                for (var n = 0; n < matches[l]["attributes"]["course"].length; n++) {
                  if ($scope.courses.indexOf(matches[l]["attributes"]["course"][n]) == -1) {
                    $scope.courses.push(matches[l]["attributes"]["course"][n]);
                  };
                };
              };
            };
          };

        };
        
        $scope.filterCuisineCourse($scope.matches);

        console.log($scope.cuisines);
        console.log($scope.courses);

        $scope.matchCount = function(match) {
          $scope.matchIngCount = 0;
          for (var k = 0; k < match["ingredients"].length; k++) {
            if ($scope.userIngredients[match["ingredients"][k]]) {
              $scope.matchIngCount++;
            };
          };
          $scope.unMatchIngCount = match["ingredients"].length - $scope.matchIngCount;
          return $scope.unMatchIngCount;
        };

        $scope.matchTime = function(match) {
          $scope.matchMinutes = match["totalTimeInSeconds"] / 60;
          return $scope.matchMinutes;
        };

      });

    };

    window.scope = $scope;
  
  });

}());