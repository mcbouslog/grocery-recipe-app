(function() {
  "use strict";

  angular.module("app").controller("shopListCtrl", function($scope, $http) {

    $scope.setup = function() {
      $http.get('/api/v1/api_groceries/minimal.json').then(function(response) {
        $scope.groceries = response.data;
      });
      $http.get('/api/v1/api_ingredients/active.json').then(function(response) {
        $scope.activeIngredients = response.data;
      });
    };

    $scope.shopToStock = function() {
      for (var i = 0; i < $scope.groceries.length; i++) {
        if ($scope.groceries[i].shop_list) {
          $scope.groceries[i].current_user = true;
        };
      };
    };

    $scope.shopClear = function () {
      for (var i = 0; i < $scope.groceries.length; i++) {
        if ($scope.groceries[i].shop_list) {
          $scope.groceries[i].shop_list = false;
        };
      };
    };

    $scope.saveList = function() {
      var userGroceries = {
        user_groceries: []
      };
      for (var i = 0; i < $scope.groceries.length; i++) {
        if ($scope.groceries[i].current_user === true) {
          userGroceries.user_groceries.push($scope.groceries[i].id);
        };
      };
      $http.post('/api/v1/api_groceries', userGroceries).then(function(response) {
      });

      var userSaveIngredients = {
        user_ingredients: []
      };
      for (var j = 0; j < $scope.activeIngredients.length; j++) {
        if ($scope.activeIngredients[j].current_user === true) {
          userSaveIngredients.user_ingredients.push($scope.activeIngredients[j].description);
        };
      };
      $http.post('/api/v1/api_ingredients', userSaveIngredients).then(function(response) {
      });
      var shopListIngredients = {
        shop_list_ingredients: []
      };
      for (var sling = 0; sling < $scope.activeIngredients.length; sling++) {
        if ($scope.activeIngredients[sling].shop_list === true) {
          shopListIngredients.shop_list_ingredients.push($scope.activeIngredients[sling].description);
        };
      };
      $http.post('/api/v1/api_ingredients/shop_list', shopListIngredients).then(function(response) {
      });
      var shopListGroceries = {
        shop_list_groceries: []
      };
      for (var slgroc = 0; slgroc < $scope.groceries.length; slgroc++) {
        if ($scope.groceries[slgroc].shop_list === true) {
          shopListGroceries.shop_list_groceries.push($scope.groceries[slgroc].id);
        };
      };
      $http.post('/api/v1/api_groceries/shop_list', shopListGroceries).then(function(response) {
      });
    };

    window.scope = $scope;
  
  });

}());