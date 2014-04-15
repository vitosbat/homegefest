'use strict';

angular
  .module('hgUserApp')
  .controller('userHousesCtrl',['$scope', '$rootScope', '$location', '$http', 'Houses', function ($scope, $rootScope, $location, $http, Houses) {

    $scope.getUserHouses = function () {
      $http.get('/user/houses').success(function (userHouses) {
        $scope.userHouses = userHouses;
      });
    };
    
    $scope.getHousePassport = function (id) {
      $rootScope.userHouse = id
      $location.path('/housePassport');
    };

    $scope.getUserHouses();

  }])