(function() {
  "use strict";

  angular.module("app").controller("recipesCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_groceries.json').then(function(response) {
        
        $scope.groceries = response.data;

        $scope.ingredients = {};
        for (var i = 0; i < $scope.groceries.length; i++) {
          for (var j = 0; j < $scope.groceries[i].ingredients.length; j++) {
            $scope.ingredients[$scope.groceries[i].ingredients[j].ingredient_description] = {
              grocery: $scope.groceries[i].description,
              currentUser: $scope.groceries[i].current_user,
              scoreFactor: $scope.groceries[i].score_factor                
            };
          };
        };
        $scope.showResults = false;
      });
    };

    $scope.recipeSearch = function(ingredientOne, ingredientTwo, ingredientThree, searchTerm) {

      if ($scope.showResults !== true) {
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
        $scope.attribution = $scope.searchResults.attribution.html;
        $scope.matches = $scope.searchResults.matches;

        // FILTERS START ******

        $scope.filterCuisineCourse = function(matches) {        
          $scope.cuisines = [];
          $scope.courses = [];          
          for (var l = 0; l < matches.length; l++) {
            if (matches[l].attributes !== undefined) {
              if (matches[l].attributes.cuisine !== undefined) {
                for (var m = 0; m < matches[l].attributes.cuisine.length; m++) {
                  if ($scope.cuisines.indexOf(matches[l].attributes.cuisine[m]) == -1) {
                    $scope.cuisines.push(matches[l].attributes.cuisine[m]);
                  };
                };
              };
              if (matches[l].attributes.course !== undefined) {
                for (var n = 0; n < matches[l].attributes.course.length; n++) {
                  if ($scope.courses.indexOf(matches[l].attributes.course[n]) == -1) {
                    $scope.courses.push(matches[l].attributes.course[n]);
                  };
                };
              };
            };
          };
        };
      
        $scope.filterCuisineCourse($scope.matches);

        $scope.filterTimeOption = {
          filterTimeValue: false
        };
        $scope.filterTime = function(entry) {
          if($scope.filterTimeOption.filterTimeValue) {
            return (entry.totalTimeInSeconds <= parseInt($scope.filterTimeOption.filterTimeValue)) ? true: false;
          };          
          return true;
        };
        
        $scope.filterScoreOption = {
          filterScoreValue: false
        };
        $scope.filterScore = function(entry) {
          if($scope.filterScoreOption.filterScoreValue) {
            return (entry.matchScore >= parseInt($scope.filterScoreOption.filterScoreValue)) ? true: false;
          };          
          return true;
        };
        
        $scope.filterUnIngOption = {
          filterUnIngValue: false
        };
        $scope.filterUnIng = function(entry) {
          if($scope.filterUnIngOption.filterUnIngValue) {
            return (entry.unMatchIngCount <= parseInt($scope.filterUnIngOption.filterUnIngValue)) ? true: false;
          };          
          return true;
        };
              
        $scope.filterRatingOption = {
          filterRatingValue: false
        };
        $scope.filterRating = function(entry) {
          if($scope.filterRatingOption.filterRatingValue) {
            return (entry.rating >= parseInt($scope.filterRatingOption.filterRatingValue)) ? true: false;
          };          
          return true;
        };

        // FILTERS END ******

        // MATCH ATTRIBUTES START******
        
        $scope.matchCount = function(match) {
          $scope.matchIngCount = 0;
          for (var k = 0; k < match.ingredients.length; k++) {
            if ($scope.ingredients[match.ingredients[k]]) {
              if ($scope.ingredients[match.ingredients[k]].currentUser) {
                $scope.matchIngCount++;
              };
            };
          };
          $scope.unMatchIngCount = match.ingredients.length - $scope.matchIngCount;
          return $scope.unMatchIngCount;
        };

        $scope.matchTime = function(match) {
          $scope.matchMinutes = match.totalTimeInSeconds / 60;
          return $scope.matchMinutes;
        };
      
        $scope.matchScoreCalc = function(match) {
          $scope.scoreArray = [];
          for (var o = 0; o < match.ingredients.length; o++) {
            if ($scope.ingredients[match.ingredients[o]]) {
              if ($scope.ingredients[match.ingredients[o]].currentUser === true) {
                $scope.scoreArray.push(1);  
              } else {
                $scope.scoreArray.push(parseFloat($scope.ingredients[match.ingredients[o]].scoreFactor));
              }
            } else {
              $scope.scoreArray.push(0.75);
            };
          };          
          $scope.multiply = function(array) {
            var sum = 1;
            for (var p = 0; p < array.length; p++) {
                sum = sum * array[p];
            } 
            return sum;
          };          
          $scope.matchScore = ($scope.multiply($scope.scoreArray) * 100).toFixed(0);
          return $scope.matchScore;
        };

        $scope.matchAttributes = function(matches) {
          for (var q = 0; q < matches.length; q++) {
            matches[q].unMatchIngCount = $scope.matchCount(matches[q]);
            matches[q].matchScore = parseInt($scope.matchScoreCalc(matches[q]));
          };
        };
        $scope.matchAttributes($scope.matches);
        // MATCH ATTRIBUTES END******
        // THEN ENDS******
      });
      // SEARCH BUTTON ENDS******      
    };

    // MODAL STARTS******
    $scope.modalInfo = function(match) {
      $scope.modalIngredients = match.ingredients;
    };
    $scope.groceryMatch = function(ingredient) {
      if ($scope.ingredients[ingredient]) {
        return $scope.ingredients[ingredient].grocery;
      };
    };
    $scope.modalFormat = function(item) {
      if ($scope.ingredients[item]) {
        if ($scope.ingredients[item].currentUser) {
          return true;
        };
      } else if ($scope.groceries[item]) {
        if ($scope.groceries[item].current_user) {
          return true;
        };
      } else {
        return false;
      };
    };
    // MODAL ENDS******

    window.scope = $scope;
  
  });

}());